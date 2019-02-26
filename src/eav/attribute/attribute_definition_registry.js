'use strict';

const AttributeDefinition = require('./attribute_definition.js');

let AttributeDefinitionsRegistry = class {
    get (name) {
        if (this[name] instanceof AttributeDefinition) {
            return this[name];
        }

        throw new Error(`Definition "${name}" is undefined.`);
    }

    set (name, definition) {
        if (this[name]) {
            throw new Error(`Definition "${name}" is already defined.`);
        }

        if (!definition instanceof AttributeDefinition) {
            throw new TypeError(`AttributeDefinition is expected.`);
        }

        this[name] = definition;
    }
};

module.exports = new AttributeDefinitionsRegistry();
