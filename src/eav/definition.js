'use strict';

const AttributeDefinitionBuilder = require('./attribute/attribute_definition_builder.js');
const attributeDefinitionRegistry = require('./attribute/attribute_definition_registry.js');

const EntityDefinitionBuilder = require('./entity/entity_definition_builder.js');
const entityDefinitionRegistry = require('./entity/entity_definition_registry.js');

const buildAttribute = function (name) {
    return new AttributeDefinitionBuilder(attributeDefinitionRegistry, name);
};

const buildEntity = function (name) {
    return new EntityDefinitionBuilder(entityDefinitionRegistry, name);
};

// I would rather use buildAttribute / buildEntity instead of using single facade
module.exports = function (type, name) {
    switch (type) {
        case 'attribute':
            return buildAttribute(name);
        case 'entity':
            return buildEntity(name);
        default:
            throw new Error(`${type} is unexpected definition type.`);
    }
};
