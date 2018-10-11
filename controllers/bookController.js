var Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");
var BookInstance = require("../models/bookinstance");
var async = require("async");
exports.index = function(req, res) {
  // res.send("NOT IMPLEMENTED: Site Home Page");
  async.parallel(
    {
      book_count: callback => {
        Book.countDocuments({}, callback);
        // Pass an empty object as match condition to find all documents of this collection
      },
      book_instance_count: callback => {
        BookInstance.countDocuments({}, callback);
      },
      book_instance_available_count: callback => {
        BookInstance.countDocuments({ status: "Available" }, callback);
      },
      author_count: callback => {
        Author.countDocuments({}, callback);
      },
      genre_count: callback => {
        Genre.countDocuments({}, callback);
      }
    },
    (err, results) => {
      res.render("index", { title: "Local Home", error: err, data: results });
    }
  );
};

// Display list of all books.
exports.book_list = function(req, res, next) {
  // res.send("NOT IMPLEMENTED: Book list");
  Book.find({}, "title author")
    .populate("author")
    .exec((err, list_book) => {
      if (err) {
        return next(err);
      }
      // successful, so render
      res.render("catalog/lists/book_list", {
        title: "Book List",
        book_list: list_book
      });
    });
};

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {
  // res.send("NOT IMPLEMENTED: Book detail: " + req.params.id);
  async.parallel(
    {
      book: function(callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      book_instance: function(callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.book == null) {
        var err = new Error("Book is not Found.");
        err.status = 404;
        return next(err);
      }
      res.render("catalog/details/book_detail", {
        title: "Book Detail",
        book: results.book,
        book_instances: results.book_instance
      });
    }
  );
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Book create GET");
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Book create POST");
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Book update POST");
};
