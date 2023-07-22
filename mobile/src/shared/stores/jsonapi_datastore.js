import { JsonApiDataStoreModel } from 'jsonapi-datastore';
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

function toPlainObject(model) {
  return toPlainObjectWithCache(model, {});
}

function toPlainObjectWithCache(model, objectCache) {
  if (_.isString(model) || _.isNumber(model)) return model;
  let obj = {};

  if (model._type) {
    const existingObject = objectCache[`${model._type}-${model.id}`];
    if (existingObject) return existingObject;
    objectCache[`${model._type}-${model.id}`] = obj;
  }

  _.forOwn(model, (value, key) => {
    if (_.startsWith(key, '_') && key !== '_type') return;

    if (value && value._type) {
      obj[key] = toPlainObjectWithCache(value, objectCache);
    } else if (_.isArray(value)) {
      obj[key] = value.map(v => toPlainObjectWithCache(v, objectCache));
    } else {
      obj[key] = _.clone(value);
    }
  });
  return obj;
}

class JsonApiDataStore {
  constructor() {
    this.reset();
  }

  destroy(model) {
    if (!this.graph[model._type]) return;

    delete this.graph[model._type][model.id];
  }

  find(type, id) {
    if (!this.graph[type] || !this.graph[type][id]) return null;
    return this.graph[type][id];
  }

  findAll(type) {
    var self = this;

    if (!this.graph[type]) return [];
    return Object.keys(self.graph[type]).map(function (v) {
      return self.graph[type][v];
    });
  }

  get(type, id) {
    const model = this.find(type, id);
    if (!model) return null;

    return toPlainObject(model);
  }

  getAll(type) {
    return this.findAll(type).map(toPlainObject);
  }

  reset() {
    this.graph = {};
  }

  invalidate(type, filters) {
    const items = _.filter(this.findAll(type), filters);
    for (const i of items) {
      this.destroy(i);
    }
  }

  initModel(type, id) {
    this.graph[type] = this.graph[type] || {};
    this.graph[type][id] = this.graph[type][id] || new JsonApiDataStoreModel(type, id);

    return this.graph[type][id];
  }

  syncRecord(rec) {
    var self = this,
      model = this.initModel(rec.type, rec.id),
      key;

    function findOrInit(resource) {
      if (!self.find(resource.type, resource.id)) {
        var placeHolderModel = self.initModel(resource.type, resource.id);
        placeHolderModel._placeHolder = true;
      }
      return self.graph[resource.type][resource.id];
    }

    delete model._placeHolder;

    for (key in rec.attributes) {
      model._attributes.push(key);
      model[key] = rec.attributes[key];
    }

    model.links = rec.links;
    model.meta = rec.meta;

    if (rec.relationships) {
      for (key in rec.relationships) {
        var rel = rec.relationships[key];
        if (rel.data !== undefined) {
          model._relationships.push(key);
          if (rel.data === null) {
            model[key] = null;
          } else if (rel.data.constructor === Array) {
            model[key] = rel.data.map(findOrInit);
          } else {
            model[key] = findOrInit(rel.data);
          }
        }
        if (rel.links) {
          model.links = model.links || {};
          model.links[key] = rel.links;
        }
      }
    }

    return model;
  }

  sync(payload) {
    return this.syncWithMeta(payload).data;
  }

  syncWithMeta(payload) {
    var primary = payload.data,
      syncRecord = this.syncRecord.bind(this);
    if (!primary) return [];
    if (payload.included) payload.included.map(syncRecord);
    if (payload.links) {
      this.graph.links = payload.links;
    }
    return {
      data: primary.constructor === Array ? primary.map(syncRecord) : syncRecord(primary),
      meta: 'meta' in payload ? payload.meta : null
    };
  }

  serialize(plainObject, type) {
    return serialize(plainObject, type);
  }

  toPlainObject(model) {
    return toPlainObject(model);
  }

  toModel(plainObject, type) {
    return toModel(plainObject, type);
  }
}

export {
  JsonApiDataStore,
  serialize
};
