const { Implementation } = require('../../Implementation');
const { MongooseFieldAdapter } = require('@voussoir/adapter-mongoose');
const { KnexFieldAdapter } = require('@voussoir/adapter-knex');

class Float extends Implementation {
  constructor() {
    super(...arguments);
  }

  get gqlOutputFields() {
    return [`${this.path}: Float`];
  }
  get gqlOutputFieldResolvers() {
    return { [`${this.path}`]: item => item[this.path] };
  }

  get gqlQueryInputFields() {
    return [
      ...this.equalityInputFields('Float'),
      ...this.orderingInputFields('Float'),
      ...this.inInputFields('Float'),
    ];
  }
  get gqlUpdateInputFields() {
    return [`${this.path}: Float`];
  }
  get gqlCreateInputFields() {
    return [`${this.path}: Float`];
  }
}

const CommonFloatInterface = superclass =>
  class extends superclass {
    getQueryConditions(dbPath) {
      return {
        ...this.equalityConditions(dbPath),
        ...this.orderingConditions(dbPath),
        ...this.inConditions(dbPath),
      };
    }
  };

class MongoFloatInterface extends CommonFloatInterface(MongooseFieldAdapter) {
  addToMongooseSchema(schema) {
    schema.add({ [this.path]: this.mergeSchemaOptions({ type: Number }, this.config) });
  }
}

class KnexFloatInterface extends CommonFloatInterface(KnexFieldAdapter) {
  createColumn(table) {
    table.float(this.path);
  }
}

module.exports = {
  Float,
  MongoFloatInterface,
  KnexFloatInterface,
};
