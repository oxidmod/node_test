'use strict';

module.exports = class AttributeDefinitionMap extends Map {
    constructor(items) {
        super();

        (items || []).forEach(item => set(item[0], item[1]));
    }

    set(attributeName, isMultiple) {
        super.set(attributeName, !!isMultiple);
    }
};
