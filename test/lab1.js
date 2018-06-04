var chai = require('chai')
var expect = chai.expect;
chai.use(require('chai-json-schema'));


describe('Deal with array jsonsche', function() {

  it('one key with value string assertions', function() {

    var person = {
      name: 'Buddy'
    };

    var personSchema = {
      title: 'person schema with one key as string',
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' }
      }
    };

    expect(person).to.be.jsonSchema(personSchema);

  });

  it('should fail, one key with value number assertions but found string', function() {

    var person = {
      name: 'Buddy'
    };

    var personSchema = {
      title: 'person schema with one key as string',
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'number' }
      }
    };

    expect(person).not.to.be.jsonSchema(personSchema);

  });

  it('Understand items/array on jsonschema', function() {

    var arr = [ 1, 2, 3, 4 ];
    var uniqueArr = [ 1, 'b', 3, 'a' ];

    var arrJsonSchema = {
      description: 'asserting items on the array',
      type: 'array',
      items: {
        type: 'number'
      }
    }

    var arrUniqueSchema = {
      description: 'asserting items on the array with unique value',
      type: 'array',
      items: [
        { type: 'number' },
        { type: 'string' },
        { type: 'number' },
        { type: 'string' }
      ]
    }

    //passed
    expect(arr).to.be.jsonSchema(arrJsonSchema);
    expect(uniqueArr).to.be.jsonSchema(arrUniqueSchema);
  });

  it('Understand additional item on array schema', function() {

    var arr = [1, 2, 'b', 4];

    var arrSchema = {
      description: 'using additional item on schema',
      type: 'array',
      items: [
        { type: 'number' },
        { type: 'number' },
        { type: 'string' },
        { type: 'number' },
      ],
      additionalItems: false
    }

    arr.push('jancuk');

    // will return false because we have additional item on the array
    expect(arr).not.to.be.jsonSchema(arrSchema)
  });

  it('Asserting array with multiple object inside', function() {

    var person = [
      {
        name: 'Buddy',
        age: 29
      },
      {
        name: 'Jancuk',
        age: 22
      }
    ];

    var personSchema = {
      title: 'Asserting array with two objects as member',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' }
        }
      }
    };

    expect(person).to.be.jsonSchema(personSchema);

  });

  it('Doing some assertion for schema', function() {

      var goodApple = {
        skin: 'thin',
        colors: ['red', 'green', 'yellow'],
        taste: 10
      };
      var badApple = {
        colors: ['brown'],
        taste: 0,
        worms: 2
      };
      var fruitSchema = {
        title: 'fresh fruit schema v1',
        type: 'object',
        required: ['skin', 'colors', 'taste'],
        properties: {
          colors: {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            items: {
              type: 'string'
            }
          },
          skin: {
            type: 'string'
          },
          taste: {
            type: 'number',
            minimum: 5
          }
        }
      };
    //bdd style
    expect(goodApple).to.be.jsonSchema(fruitSchema);
    expect(badApple).to.not.be.jsonSchema(fruitSchema);
  });

  it('minItems maxItems on json-schema', function() {

    var arrHoho = [1, 2];
    var arrXixi = [1, 2, 3, 4];
    var arrNini = [1];
    var arrNono = [1, 2, 3, 4, 5];

    var jsonSchemaPositive = {
      description: 'Checking length on the array - min 2 and max 4',
      type: 'array',
      minItems: 2,
      maxItems: 4
    }

    //will return true
    expect(arrHoho).to.be.jsonSchema(jsonSchemaPositive);
    expect(arrXixi).to.be.jsonSchema(jsonSchemaPositive);

    //will return false
    expect(arrNini).not.to.be.jsonSchema(jsonSchemaPositive);
    expect(arrNono).not.to.be.jsonSchema(jsonSchemaPositive);
  });

  it('Each item in array should be unique', function() {

    var arr = [1, 2, 3, 4];
    var arrB = [1, 1, 3, 3];

    var jsonSchema = {
      description: 'Array should unique each of item',
      type: 'array',
      uniqueItems: true
    }

    // return true
    expect(arr).to.be.jsonSchema(jsonSchema);

    // return false
    expect(arrB).not.to.be.jsonSchema(jsonSchema);
  });
});

describe('Asserting Object with JsonSchema', function() {

  it('Object with Properties', function() {

    var firstObject = {
      tipe: 'Car',
      wheels: 6,
      transmisi: 'Automatic'
    };

    var jsonSchema = {
      description: 'asserting object with properties',
      type: 'object',
      properties: {
        tipe: { type: 'string' },
        wheels: { type: 'number' },
        transmisi: { type: 'string' }
      }
    };

    expect(firstObject).to.be.jsonSchema(jsonSchema);
  });

  it('Object with Properties and used additionalProperties', function() {

    var firstObject = {
      tipe: 'Car',
      wheels: 6,
      transmisi: 'Automatic'
    };

    var jsonSchema = {
      description: 'asserting will error when object has new key / property',
      type: 'object',
      properties: {
        tipe: { type: 'string' },
        wheels: { type: 'number' },
        transmisi: { type: 'string' }
      },
      additionalProperties: false
    };

    // return true
    expect(firstObject).to.be.jsonSchema(jsonSchema);

    // adding new property
    firstObject.newProperty = 'kmvreet';

    // return false after adding new property
    expect(firstObject).not.to.be.jsonSchema(jsonSchema);

  });

  it('Object with Required Properies', function() {

    var correctObject = {
      name: 'Osyi',
      age: 5,
      gender: 'Laki-Laki'
    };

    var inCorrectObject = {
      name: 'Jancuk',
      age: 29
    };

    var jsonSchema = {
      description: 'Asserting object should have key that already listed on jsonschema',
      type: 'object',
      required: [ 'name', 'age', 'gender'],
      properties: {
        name: { type: 'string'},
        age: { type: 'number' },
        gender: { type: 'string'}
      }
    };

    // return true
    expect(correctObject).to.be.jsonSchema(jsonSchema);

    // return false
    expect(inCorrectObject).not.to.be.jsonSchema(jsonSchema);
  });

  it('Object with additionalProperties spesific values', function() {

    var objectOne = {
      name: 'SDN Manggarai 01 Pagi',
      alamat: 'Manggarai Selatan',
      akreditasi: 'A negeri'
    };

    var jsonSchema = {
      description: 'Asserting object using jsonschema and allowed to adding new key or properies with spesific value',
      type: 'object',
      properties: {
        name: { type: 'string' },
        alamat: { type: 'string' },
        akreditasi: { type: 'string' }
      },
      additionalProperties: { type: 'string' }
    };

    // adding new property as string
    objectOne.newProperty = 'Sekolah Favorite'

    //return true
    expect(objectOne).to.be.jsonSchema(jsonSchema);

    //adding new property as number
    objectOne.newPropertyNum = 29

    //return false
    expect(objectOne).not.to.be.jsonSchema(jsonSchema);
  });

  it('Object with Size', function() {

    var objectOne = {
      name: 'SDN Manggarai 01 Pagi',
      alamat: 'Manggarai Selatan',
      akreditasi: 'A negeri'
    };

    var objectTwo = {
      name: 'two'
    };

    var jsonSchema = {
      description: 'Asserting object using size',
      type: 'object',
      properties: {
        name: { type: 'string' },
        alamat: { type: 'string' },
        akreditasi: { type: 'string' }
      },
      minProperties: 2,
      maxProperties: 3,
    };

    //return true
    expect(objectOne).to.be.jsonSchema(jsonSchema);

    //return false
    expect(objectTwo).not.to.be.jsonSchema(jsonSchema);

    //return false
    objectOne.newProperty = 'jancuk';
    expect(objectOne).not.to.be.jsonSchema(jsonSchema);
  });

  it('Object with Dependencies', function() {

    var object = {
      name: 'jancuk',
      alamat: 'manggarai',
      akreditasi: 'special A'
    };

    var objectXoxo = {
      name: 'xoxo',
      alamat: 'lolo'
    };

    var jsonSchema = {
      description: 'Assertion with Dependencies, with three property',
      type: 'object',
      properties: {
        name: { type: 'string' },
        alamat: { type: 'string' },
        akreditasi: { type: 'string' }
      },

      required: ['name'],

      dependencies: {
        alamat: ['akreditasi']
      }
    };

    // return true
    expect(object).to.be.jsonSchema(jsonSchema);

    // return false
    expect(objectXoxo).not.to.be.jsonSchema(jsonSchema);

  });

  it('Object with required and additionalProperties', function() {

    var trueObject = {
      name: 'jancuk',
      lastname: 'hoho',
      alamat: 'bekasi',
      gender: 'not decide'
    };

    var falseObject = {
      name: 'jancuk',
      alamat: 'bekasi'
    };

    var jsonSchema = {
      description: 'Using required and additionalProperties',
      type: 'object',
      required: ['name', 'lastname', 'alamat'],
      properties: {
        name: { type: 'string' },
        lastname: { type: 'string' },
        alamat: { type: 'string' },
        gender: { type: 'string' }
      },
      additionalProperties: false
    };

    //return true
    expect(trueObject).to.be.jsonSchema(jsonSchema);

    //return false
    trueObject.newKey = 'new values';
    expect(trueObject).not.to.be.jsonSchema(jsonSchema);

    //return false
    falseObject.newKey = 'new values';
    expect(falseObject).not.to.be.jsonSchema(jsonSchema);
  });
});

describe('Deal with boolean jsonSchema', function() {

  it('asserting boolean value', function() {

    var arr = [ true, false, true];

    var jsonSchema = {
      description: 'asserting boolean',
      type: 'array',
      items: {
        type: 'boolean'
      }
    };

    //teturn true
    expect(arr).to.be.jsonSchema(jsonSchema);
  });
});

describe('Deal with null jsonSchema', function() {

  it('Object with null value', function() {

    var data = {
      name: 'Jancuk',
      lastname: null
    };

    var jsonSchema = {
      description: 'Deal with null pointer',
      type: 'object',
      properties: {
        name: {type: 'string'},
        lastname: {type: 'null'}
      }
    };

    // return true
    expect(data).to.be.jsonSchema(jsonSchema);
  });

});
