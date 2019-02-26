'use strict';

const typeChecks = {
    'int': (value) => typeof value === 'number' && Number.isInteger(value),
    'string': (value) => typeof value === 'string',
};

const failedCheck = () => false;

const checkType = (definition, value) => {
    let checker = typeChecks[definition.type] || failedCheck;

    if (!checker(value)) {
        throw new Error(`Value "${typeof value}: ${value}" is not compatible with required type "${definition.type}"`);
    }
};

const ruleRegistry = require('./../rule/rule_registry.js');

const checkRules = (definition, value) => {
    for(let ruleName in definition.rules) {
        if (definition.rules.hasOwnProperty(ruleName)) {
            if (!ruleRegistry.get(ruleName)(definition.rules[ruleName], value)) {
                throw new Error(`"${value}" is invalid value for attribute "${definition.name}"`)
            }
        }
    }
};

module.exports = class AttributeDefinition {
    constructor(name, type, rules) {
        this.name = name;
        this.type = type;
        this.rules = rules;
    }

    set type(value) {
        switch (value) {
            case 'int':
            case 'string':
                this._type = value;
                break;
            default:
                throw new Error(`Type "${value}" is invalid.`)
        }
    }

    get type() {
        return this._type;
    }

    check(value) {
        checkType(this, value);
        checkRules(this, value);
    }
};
