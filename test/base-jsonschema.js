var chai = require('chai')
var expect = chai.expect;
chai.use(require('chai-json-schema'));

  // types
  var type_of_string  = { type: 'string' };
  var type_of_number  = { type: 'number' };
  var type_of_null    = { type: 'null' };
  var type_of_boolean = { type: 'boolean' };
  var type_of_array   = { type: 'array' };
  var type_of_object  = { type: 'object' };

  //combined types
  var combined_type   = function(arr_of_type) {
    return { type: arr_of_type };
  };

  var general_type_with_enum = function( arr_enum ) {
    return {
      enum: arr_enum
    }
  }

  var type_of_string_with_enum = function( arr_enum ) {
    return {
      type: 'string',
      enum: arr_enum
    }
  };

  var type_of_number_with_enum = function( arr_enum ) {
    return {
      type: 'number',
      enum: arr_enum
    }
  };

  var type_of_boolean_with_enum = function( arr_enum ) {
    return {
      type: 'boolean',
      enum: arr_enum
    }
  };

module.exports = {
  type_of_string:type_of_string,
  type_of_number:type_of_number,
  type_of_null:type_of_null,
  type_of_boolean:type_of_boolean,
  type_of_array:type_of_array,
  type_of_object:type_of_object,
  combined_type:combined_type,
  general_type_with_enum:general_type_with_enum,
  type_of_string_with_enum:type_of_string_with_enum,
  type_of_number_with_enum:type_of_number_with_enum,
  type_of_boolean_with_enum:type_of_boolean_with_enum
};
