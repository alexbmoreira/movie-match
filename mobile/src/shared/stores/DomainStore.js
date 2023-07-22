import { JsonApiDataStore, serialize } from './jsonapi_datastore';
import { api } from 'api';
import _ from 'lodash';

const getSingle = (response, type) => {
  const store = new JsonApiDataStore();
  store.sync(response.data);
  return _.head(store.findAll(type));
};

function load(endpoint) {
  if (_.isString(endpoint)) {
    return api.get(endpoint);
  } else if (_.isObject(endpoint) && _.has(endpoint, 'url')) {
    return api.get(endpoint.url, { params: endpoint.params || {} });
  } else {
    throw new Error(`Endpoint must be a string or an object {url, params}. Instead received: ${endpoint}`);
  }
}

class DomainStore {
  _repository = new JsonApiDataStore();

  async _compose(endpoints) {
    const _endpoints = _.isArray(endpoints) ? endpoints : [endpoints];
    const requests = _endpoints.map(endpoint => {
      return load(endpoint);
    });
    const result = [];
    for (const response of await Promise.all(requests)) {
      if (response.data) {
        result.push(this._repository.syncWithMeta(response.data));
      } else {
        result.push(response);
      }
    }
    return result;
  }

  _getAll(type, filters, _class) {
    const __class = arguments.length === 2 ? filters : _class;
    const __filters = arguments.length === 3 ? filters : null;
    const models = _.filter(this._repository.findAll(type).map(i => __class ? new __class(i) : i), __filters);
    const activeModels = _.reject(models, 'deletedAt');
    return _.orderBy(activeModels, model => parseInt(model.id));
  }

  _getSingle(type, filters) {
    return _.head(_.filter(this._getAll(type), filters));
  }

  async __request(endpoint, type, model, func) {
    const modelToSend = _.isFunction(model.toJS) ? model.toJS() : model;
    const payload = serialize(modelToSend, type);

    try {
      const response = await func(endpoint, payload);
      if (response.data) {
        this._repository.sync(response.data);
      }
      return {
        response,
        model: type && response.data ? this._getSingle(type, { id: getSingle(response, type).id }) : null,
        errors: {}
      };
    } catch (e) {
      if (e.formErrors) {
        return { errors: e.formErrors };
      }

      throw e;
    }
  }

  async post(endpoint, type, model = {}) {
    return this.__request(endpoint, type, model, api.post);
  }

  async destroy(model) {
    await api.delete(_.get(model, 'links.self.href'));
    this._repository.destroy(model);
  }
}

export default DomainStore;
