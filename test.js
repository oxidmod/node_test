const define = require('./src/eav/definition.js');
const Entity = require('./src/eav/entity.js');

//we can add custom rules here
const rules = require('./src/eav/rule/rule_registry.js');

define('attribute', 'firstName')
    .validation({ required: true })
    .build();
define('attribute', 'lastName')
    .validation({ required: true })
    .build();
define('attribute', 'age')
    .type('int')
    .validation({ min: 1, max: 120 })
    .build();
define('attribute', 'email')
    .validation({ email: true })
    .build();

define('entity', 'Person')
    .has('firstName')
    .has('lastName')
    .has('age')
    .hasMany('email') // може мати багато емейлів
    .build();

console.log('WITHOUT REQUIRED FIELD');
try {
    new Entity('Person', {
        firstName: 'John',
    });
} catch (e) {
    console.error(e.toString()+'\n');
}

console.log('WITH FIELD TYPE VIOLATION');
try {
    new Entity('Person', {
        firstName: 123,
    });
} catch (e) {
    console.error(e.toString()+'\n');
}

console.log('WITH VALIDATION ERROR');
try {
    new Entity('Person', {
        firstName: 'John',
        lastName: 'Doe',
        age: 130,
    });
} catch (e) {
    console.error(e.toString()+'\n');
}

console.log('WITH SINGLE VALUE AND hasMany RELATION');
try {
    new Entity('Person', {
        firstName: 'John',
        lastName: 'Doe',
        age: 10,
        email: 'john.doe@example.come',
    });
} catch (e) {
    console.error(e.toString()+'\n');
}

console.log('WITH VALIDATION ERROR IN hasMany RELATION');
try {
    new Entity('Person', {
        firstName: 'John',
        lastName: 'Doe',
        age: 10,
        email: [ // only unique emails
            'john.doe@example.come',
            'johnny@gmail.come',
            'not a valid mail',
        ]
    });
} catch (e) {
    console.error(e.toString()+'\n');
}

console.log('VALID ENTITY');

const person = new Entity('Person', {
    firstName: 'John',
    lastName: 'Doe',
    age: 10,
    email: [ // only unique emails
        'john.doe@example.come',
        'johnny@gmail.come',
    ]
});

person.validate();

console.log(person.firstName, person.lastName, person.age, person.email);
console.log('\n');

console.log('TRY TO SET INVALID VALUE AFTER CREATION');
try {
    person.age = 'test';
} catch (e) {
    console.error(e.toString()+'\n');
}