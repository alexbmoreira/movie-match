import { JsonApiDataStore, JsonApiDataStoreModel } from 'jsonapi-datastore';
import { api } from 'api';
import _ from 'lodash';

function toModel(plainObject, type) {
  if (_.isString(plainObject) || _.isNumber(plainObject)) return plainObject;
  let model = new JsonApiDataStoreModel(type, plainObject.id || null);
  _.forOwn(plainObject, (value, key) => {
    if (key === 'id') return;
    if (_.isArray(value)) {
      model._relationships.push(key);
      model[key] = value.map(toModel);
    } else if (_.isObject(value) && value._type) {
      model._relationships.push(key);
      model[key] = toModel(value);
    } else {
      model._attributes.push(key);
      model[key] = value;
    }
  });

  return model;
}

function serialize(plainObject, type) {
  const model = toModel(plainObject, type);
  return model.serialize();
}

const getSingle = (response, type) => {
  const store = new JsonApiDataStore();
  store.sync(response.data);
  return _.head(store.findAll(type));
};

class DomainStore {
  _repository = new JsonApiDataStore();

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
}

export default DomainStore;
