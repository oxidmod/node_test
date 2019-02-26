'use strict';

const AttributeDefinitionMap = require('./attribute_definition_map.js');

module.exports = class EntityDefinition {
    constructor(name, attributeDefinitionMap) {
        this.name = name;

        if (!attributeDefinitionMap instanceof AttributeDefinitionMap) {
            throw new TypeError('Instance of AttributeDefinitionMap is expected.')
        }

        this.attributeDefinitionMap = attributeDefinitionMap;
    }

    registerAttributes(entity, registry) {
        let field, property, attributeDefinition;
        for(let [attributeName, isMultiple] of this.attributeDefinitionMap) {
            attributeDefinition = registry.get(attributeName);
            field = `_${attributeName}`;
            property = {
                get:function () {
                    return this[field];
                },
                set: function (newValue) {
                    attributeDefinition.check(newValue);

                    this[field] = newValue;
                },
            };

            if (isMultiple) {
                property.set = function (newValues) {
                    if (newValues === null || typeof newValues[Symbol.iterator] !== 'function' ) {
                        throw new Error(`Only iterable values are allowed for attribute "${attributeDefinition.name}"`)
                    }

                    this[field] = this[field] instanceof Set ?
                        (this[field].clear(), this[field]) :
                        new Set();

                    newValues.forEach((newValue) => {
                        attributeDefinition.check(newValue);
                        this[field].add(newValue);
                    });
                }
            }

            Object.defineProperty(entity, attributeDefinition.name, property);
        }
    }

    validateEntity(entity, registry) {
        if (this.name !== entity.type) {
            throw new Error(`Entity type "${entity.type}" is unexpected.`)
        }

        for(let [attributeName, isMultiple] of this.attributeDefinitionMap) {
            registry.get(attributeName).check(entity[attributeName]);
        }
    }
};
