var mongoose = require("mongoose");
var moment = require("moment");
var Schema = mongoose.Schema;
var AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    max: 100
  },
  family_name: {
    type: String,
    required: true,
    max: 100
  },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
});
AuthorSchema.virtual("name").get(function() {
  return this.first_name + " " + this.family_name;
});
AuthorSchema.virtual("date_of_birth_formatted").get(function() {
  return moment(this.date_of_birth).format("DD MMMM,YYYY");
});
AuthorSchema.virtual("date_of_death_formatted").get(function() {
  return moment(this.date_of_death).format("DD MMMM,YYYY");
});
AuthorSchema.virtual("lifespan").get(function() {
  return this.date_of_death.getYear() - this.date_of_birth.getYear();
});
AuthorSchema.virtual("url").get(function() {
  return "/catalog/author/" + this._id;
});
module.exports = mongoose.model("Author", AuthorSchema);
