var chai = require('chai')
var expect = chai.expect;
chai.use(require('chai-json-schema'));
const base = require('./base-jsonschema');
const SchemaBuilder = require('./chain-jsonSchema');

describe('create a schema using chain js', function() {

  it('using schema builder', () => {

    var data = {
      merk: 'toyota',
      transmisi: 'manual',
      vechiles: [
        {
          tipe: 'Fortuner',
          outdoor: true,
          interior: {
            padlle_shift: true,
            abs: true
          }
        },
        {
          tipe: 'Corolla',
          outdoor: false,
          interior: {
            padlle_shift: true,
            abs: true
          }
        }
      ]
    };

    var interiorSchema = new SchemaBuilder()
        .withType('object')
        .withProperties({
          padlle_shift: base.type_of_boolean,
          abs: base.type_of_boolean
        }).build();

    var vechileObjectItem = new SchemaBuilder()
        .withType('object')
        .withProperties({
          tipe: base.type_of_string,
          outdoor: base.type_of_boolean,
          interior: interiorSchema
        }).build();

    var vechilesSchema = new SchemaBuilder()
        .withType('array')
        .withItems(vechileObjectItem)
        .build();

    var jsonSchema = new SchemaBuilder()
        .withDescription('Mobil Data Asserting Schema')
        .withType('object')
        .withProperties({
          merk: base.type_of_string,
          transmisi: base.type_of_string,
          vechiles: vechilesSchema
        }).build();

    expect(data).to.be.jsonSchema(jsonSchema);
    
  });
});
