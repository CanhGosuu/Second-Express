var BookInstance = require("../models/bookinstance");

// Display list of all BookInstances.
exports.bookinstance_list = function(req, res) {
  // res.send("NOT IMPLEMENTED: BookInstance list");
  BookInstance.find()
    .populate("book")
    .exec(function(err, list_bookinstance) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("catalog/lists/bookinstance_list", {
        title: "Book Instance Lists",
        bookinstance_list: list_bookinstance
      });
    });
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function(req, res) {
  // res.send("NOT IMPLEMENTED: BookInstance detail: " + req.params.id);
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec(function(err, bookinstance) {
      if (err) {
        return next(err);
      }
      if (bookinstance == null) {
        // No results.
        var err = new Error("Book copy not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("catalog/details/bookinstance_detail", {
        title: "Book:",
        bookinstance: bookinstance
      });
    });
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = function(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
};

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};
