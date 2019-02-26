'use strict';

let {required, min, max, email} = require('./default_rule');

let RuleRegistry = class {
    get (name) {
        if (typeof this[name] === 'function') {
            return this[name];
        }

        throw new Error(`Rule "${name}" is undefined.`);
    }

    set (name, rule) {
        if (this[name]) {
            throw new Error(`Rule "${name}" is already defined.`);
        }

        if (typeof rule !== 'function') {
            throw new TypeError(`Callback is expected.`);
        }

        this[name] = rule;
    }
};

let registry = new RuleRegistry();

registry.set('required', required);
registry.set('min', min);
registry.set('max', max);
registry.set('email', email);

module.exports = registry;
