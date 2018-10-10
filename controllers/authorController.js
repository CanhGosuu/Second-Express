var Author = require("../models/author");
var async = require("async");
var Book = require("../models/book");
//Display list of all Authors
module.exports = {
  author_list: (req, res, next) => {
    // res.send("NOT IMPLEMENTED: Author list");
    Author.find()
      .sort([["family_name", "ascending"]])
      .exec(function(err, list_author) {
        if (err) {
          return next(err);
        }
        res.render("catalog/author_list", {
          title: "Author List",
          author_list: list_author
        });
      });
  },
  author_detail: (req, res) => {
    // res.send("NOT IMPLEMENTED: Author details");
    async.parallel(
      {
        author: function(callback) {
          Author.findById(req.params.id).exec(callback);
        },
        authors_books: function(callback) {
          Book.find({ author: req.params.id }, "title summary").exec(callback);
        }
      },
      function(err, results) {
        if (err) {
          return next(err);
        } // Error in API usage.
        if (results.author == null) {
          // No results.
          var err = new Error("Author not found");
          err.status = 404;
          return next(err);
        }
        // Successful, so render.
        res.render("catalog/author_detail", {
          title: "Author Detail",
          author: results.author,
          author_books: results.authors_books
        });
      }
    );
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
