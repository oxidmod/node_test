'use strict';

const attributeDefinitionRegistry = require('./attribute/attribute_definition_registry.js');
const entityDefinitionRegistry = require('./entity/entity_definition_registry.js');

module.exports = class Entity {
    constructor(type, data) {
        this.type = type;

        let entityDefinition = entityDefinitionRegistry.get(type);

        entityDefinition.registerAttributes(this, attributeDefinitionRegistry);
        for (let attributeName in data) {
            if (data.hasOwnProperty(attributeName)) {
                this[attributeName] = data[attributeName];
            }
        }

        this.validate();
    }

    validate() {
        let entityDefinition = entityDefinitionRegistry.get(this.type);

        entityDefinition.validateEntity(this, attributeDefinitionRegistry);
    }
};
