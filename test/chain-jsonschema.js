var SchemaBuildder = function () {
    this.obj = {};
  };

  SchemaBuildder.prototype.withType = function(type_data) {
    this.obj.type = type_data;
    return this;
  };

  SchemaBuildder.prototype.withProperties = function(obj_prop) {
    this.obj.properties = obj_prop;
    return this;
  };

  SchemaBuildder.prototype.withDescription = function(desc) {
    this.obj.description = desc;
    return this;
  };

  SchemaBuildder.prototype.withTitle = function(title) {
    this.obj.title = title;
    return this;
  };

  SchemaBuildder.prototype.withItems = function(obj_items) {
    this.obj.items = obj_items;
    return this;
  };

  SchemaBuildder.prototype.withMinimumNumber = function(amountOfNumber) {
    this.obj.minimum = amountOfNumber;
    return this;
  };

  SchemaBuildder.prototype.withMaximalNumber = function(amountOfNumber) {
    this.obj.maximal = amountOfNumber;
    return this;
  };

  SchemaBuildder.prototype.withAdditionalProperties = function(bool) {
    this.obj.additionalProperties = bool;
    return this;
  };

  SchemaBuildder.prototype.withMinProperties = function(amoutOfProperties) {
    this.obj.minProperties = amoutOfProperties;
    return this;
  };

  SchemaBuildder.prototype.withMaxProperties = function(amoutOfProperties) {
    this.obj.maxProperties = amoutOfProperties;
    return this;
  };

  SchemaBuildder.prototype.withRequired = function(keys_arr) {
    this.obj.required = keys_arr;
    return this;
  };

  SchemaBuildder.prototype.withAdditionalPropertiesSpesificType = function(type_of_data) {
    this.obj.additionalProperties = type_of_data;
    return this;
  };

  SchemaBuildder.prototype.withAdditionalItems = function(bool) {
    this.obj.additionalItems = bool;
    return this;
  };

  SchemaBuildder.prototype.withMinItems = function(amountOfItems) {
    this.obj.minItems = amountOfItems;
    return this;
  };

  SchemaBuildder.prototype.withMaxItems = function(amoutOfItems) {
    this.obj.maxItems = amoutOfItems;
    return this;
  };

  SchemaBuildder.prototype.withUniqueItems = function(bool) {
    this.obj.uniqueItems = bool;
    return this;
  };

  SchemaBuildder.prototype.build = function() {
    return this.obj;
  };

module.exports = SchemaBuildder;
