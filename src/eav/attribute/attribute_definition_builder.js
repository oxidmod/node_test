'use strict';

const AttributeDefinition = require('./attribute_definition.js');

module.exports = class AttributeDefinitionBuilder {
    constructor(registry, name) {
        this._registry = registry;
        this._name = name;
        this._type = 'string';
        this._rules = {};
    }

    type(type) {
        this._type = type;
        return this;
    }

    validation(rules) {
        this._rules = rules;
        return this;
    }

    build() {
        let definition = new AttributeDefinition(this._name, this._type,this._rules);

        this._registry.set(definition.name, definition);

        return definition;
    }
};