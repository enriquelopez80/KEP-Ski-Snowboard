const orm = require("./orm");

module.exports = function (app) {

  app.get("/", function (req, res) {
    orm.homePageData(1900, 3000, function(result) {
      res.render("index", result)
    })
  });

  app.get("/:name", function (req, res) {
    orm.findByProdName(req.params.name.toUpperCase(), function(result) {
    res.json(result)
    });
  })

  app.get("/:department/:class/", function (req, res) {

    let depName = req.params.department.toUpperCase();
    let className = req.params.class.toUpperCase();
    orm.findByDeptAndClass(depName, className, function(result) {
      res.json(result)
    })

  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
