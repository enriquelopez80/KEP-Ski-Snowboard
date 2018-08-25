var db = require("../models");

module.exports = function (app) {

  app.get("/", function (req, res) {

    const responseObj = {}

    const mens = db.Merch.findOne({
      where: {
        id: 1500,
      }
    })
    const womens = db.Merch.findOne({
      where: {
        id: 2000,
      }
    })
    Promise
      .all([mens, womens])
      .then(data => {
        responseObj.mens = data[0];
        responseObj.womens = data[1];
        // res.json(responseObj);
        res.render("index", responseObj);
        // UNCOMMENT ABOVE LINE WHEN INDEX IS SET UP WITH HANDLEBARS TO RECEIVE AND RENDER DATA //
      })
      .catch(err => {
        console.log('**********ERROR****************');
        console.log(err);
      });

  });

  // below get request called via click listener of images links for particular item
  app.get("/inventory/:name", function (req, res) {

    let name = req.params.name.toUpperCase()

    db.Merch.findAll({
      where: {
        name: name
      },
      limit: 9
    })
      .then(function (responseObj) {
        res.json(responseObj)
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
