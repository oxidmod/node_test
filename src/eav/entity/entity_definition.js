'use strict';

const AttributeDefinitionMap = require('./attribute_definition_map.js');

const createAttribute = (entity, definition, isMultiple) => {
    let field = `_${definition.name}`,
        property = {
            get:function () {
                return entity[field];
            },
            set: function (newValue) {
                definition.check(newValue);

                entity[field] = newValue;
            },
        };

    if (isMultiple) {
        property.set = function (newValues) {
            if (newValues === null || typeof newValues[Symbol.iterator] !== 'function' ) {
                throw new Error(`Only iterable values are allowed for attribute "${definition.name}"`)
            }

            entity[field] = entity[field] instanceof Set ?
                (entity[field].clear(), entity[field]) :
                new Set();

            newValues.forEach((newValue) => {
                definition.check(newValue);
                entity[field].add(newValue);
            });
        }
    }

    Object.defineProperty(entity, definition.name, property);
};

module.exports = class EntityDefinition {
    constructor(name, attributeDefinitionMap) {
        this.name = name;

        if (!attributeDefinitionMap instanceof AttributeDefinitionMap) {
            throw new TypeError('Instance of AttributeDefinitionMap is expected.')
        }

        this.attributeDefinitionMap = attributeDefinitionMap;
    }

    registerAttributes(entity, registry) {
        for(let [attributeName, isMultiple] of this.attributeDefinitionMap) {
            createAttribute(this, registry.get(attributeName), isMultiple);
        }
    }

    validateEntity(entity, registry) {
        if (this.name !== entity.type) {
            throw new Error(`Entity type "${entity.type}" is unexpected.`)
        }

        for(let [attributeName, isMultiple] of this.attributeDefinitionMap) {
            if (isMultiple) {
                entity[attributeName].forEach((val) => {
                    registry.get(attributeName).check(val)
                })
            } else {
                registry.get(attributeName).check(entity[attributeName]);
            }
        }
    }
};
