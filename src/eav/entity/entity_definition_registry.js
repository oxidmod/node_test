'use strict';

const EntityDefinition = require('./entity_definition.js');

let EntityDefinitionsRegistry = class {
    get (name) {
        if (this[name] instanceof EntityDefinition) {
            return this[name];
        }

        throw new Error(`Definition "${name}" is undefined.`);
    }

    set (name, definition) {
        if (this[name]) {
            throw new Error(`Definition "${name}" is already defined.`);
        }

        if (!definition instanceof EntityDefinition) {
            throw new TypeError(`AttributeDefinition is expected.`);
        }

        this[name] = definition;
    }
};

module.exports = new EntityDefinitionsRegistry();
