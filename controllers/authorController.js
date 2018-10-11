const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
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
        res.render("catalog/lists/author_list", {
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
        res.render("catalog/details/author_detail", {
          title: "Author Detail",
          author: results.author,
          author_books: results.authors_books
        });
      }
    );
  },
  //display create form on GET
  author_create_get: (req, res) => {
    // res.send("NOT INPLEMENTED: Author create GET");
    res.render("catalog/forms/author_form", { title: "Create Author" });
  },
  // Handle Author create on POST
  author_create_post: [
    // Validate fields
    body("first_name")
      .isLength({ min: 1 })
      .trim()
      .withMessage("First name must be specified."),
    // .isAlphanumeric()
    // .withMessage("First name has non-alphanumeric characters."),
    body("family_name")
      .isLength({ min: 1 })
      .trim()
      .withMessage("Family name must be specified.")
      .isAlphanumeric()
      .withMessage("Family name has non-alphanumeric characters."),
    body("date_of_birth", "Invalid date of birth")
      .optional({ checkFalsy: true })
      .isISO8601(),
    body("date_of_death", "Invalid date of death")
      .optional({ checkFalsy: true })
      .isISO8601(),
    // Sanitize fields.
    sanitizeBody("first_name")
      .trim()
      .escape(),
    sanitizeBody("family_name")
      .trim()
      .escape(),
    sanitizeBody("date_of_birth").toDate(),
    sanitizeBody("date_of_death").toDate(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.render("catalog/forms/author_form", {
          title: "Create Author",
          author: req.body,
          errors: errors.array()
        });
        return;
      } else {
        //Data from form is valid
        //Create an Author
        var author = new Author({
          first_name: req.body.first_name,
          family_name: req.body.family_name,
          date_of_birth: req.body.date_of_birth,
          date_of_death: req.body.date_of_death
        });
        author.save(function(err) {
          if (err) {
            return next(err);
          }
          res.redirect(author.url);
        });
      }
    }
  ],
  //display delete form on GET
  author_delete_get: (req, res, next) => {
    // res.send("NOT INPLEMENTED: Author delete GET");
    async.parallel(
      {
        author: function(callback) {
          Author.findById(req.params.id).exec(callback);
        },
        authors_books: function(callback) {
          Book.find({ author: req.params.id }).exec(callback);
        }
      },
      function(err, results) {
        if (err) {
          return next(err);
        }
        if (results.author == null) {
          // No results.
          res.redirect("/catalog/authors");
        }
        // Successful, so render.
        res.render("catalog/deletes/author_delete", {
          title: "Delete Author",
          author: results.author,
          author_books: results.authors_books
        });
      }
    );
  },
  // Handle Author delete on POST
  author_delete_post: (req, res, next) => {
    // res.send("NOT INPLEMENTED: Author delete POST");
    async.parallel(
      {
        author: function(callback) {
          Author.findById(req.body.authorid).exec(callback);
        },
        authors_books: function(callback) {
          Book.find({ author: req.body.authorid }).exec(callback);
        }
      },
      function(err, results) {
        if (err) {
          return next(err);
        }
        // Success
        if (results.authors_books.length > 0) {
          // Author has books. Render in same way as for GET route.
          res.render("catalog/deletes/author_delete", {
            title: "Delete Author",
            author: results.author,
            author_books: results.authors_books
          });
          return;
        } else {
          // Author has no books. Delete object and redirect to the list of authors.
          Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(
            err
          ) {
            if (err) {
              return next(err);
            }
            // Success - go to author list
            res.redirect("/catalog/authors");
          });
        }
      }
    );
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
