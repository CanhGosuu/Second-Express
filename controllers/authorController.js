var Author = require("../models/author");
//Display list of all Authors
module.exports = {
  author_list: (req, res) => {
    res.send("NOT IMPLEMENTED: Author list");
  },
  author_detail: (req, res) => {
    res.send("NOT IMPLEMENTED: Author details");
  },
  //display create form on GET
  author_create_get: (req, res) => {
    res.send("NOT INPLEMENTED: Author create GET");
  },
  // Handle Author create on POST
  author_create_post: (req, res) => {
    res.send("NOT INPLEMENTED: Author create POST");
  },
  //display delete form on GET
  author_delete_get: (req, res) => {
    res.send("NOT INPLEMENTED: Author delete GET");
  },
  // Handle Author delete on POST
  author_delete_post: (req, res) => {
    res.send("NOT INPLEMENTED: Author delete POST");
  },
  //display update form on GET
  author_update_get: (req, res) => {
    res.send("NOT INPLEMENTED: Author update GET");
  },
  // Handle Author update on POST
  author_update_post: (req, res) => {
    res.send("NOT INPLEMENTED: Author update POST");
  }
};
