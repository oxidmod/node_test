'use strict';

const AttributeDefinitionMap = require('./attribute_definition_map.js');
const EntityDefinition = require('./entity_definition.js');

module.exports = class EntityDefinitionBuilder {
    constructor(registry, name) {
        this._registry = registry;
        this._name = name;
        this._attributeDefinitionMap = new AttributeDefinitionMap();
    }

    has(name) {
        //todo: throw error if same attribute is configured more than once
        this._attributeDefinitionMap.set(name, false);
        return this;
    }

    hasMany(name) {
        //todo: throw error if same attribute is configured more than once
        this._attributeDefinitionMap.set(name, true);
        return this;
    }

    build() {
        let definition = new EntityDefinition(this._name, this._attributeDefinitionMap);

        this._registry.set(definition.name, definition);

        return definition;
    }
};
