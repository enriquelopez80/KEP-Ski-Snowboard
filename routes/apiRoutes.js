const orm = require("./orm");


module.exports = function (app) {

  app.get("/", function (req, res) {
    orm.homePageData(1900, 3000, function (result) {
      res.render("index", result)
    })
  });

  app.get("/id/:id", function (req, res) {
    let id = Number(req.params.id);
    orm.findOneById(id, function (result) {
      res.json(result)
    })
  });

  app.put("/checkout", function (req, res) {
    let cartArray = req.body.data;
    orm.findCartItems(cartArray, function (result) {
      res.json(result)
    });
  });

  app.get("/manager", function (req, res) {
    res.render("managerDisplay");
  });

  app.get("/one/:name", function (req, res) {
    orm.findOneByProdName(req.params.name.toUpperCase(), function (result) {
      res.json(result)
    });
  })

  app.get("/all/:name", function (req, res) {
    orm.findAllByProdName(req.params.name.toUpperCase(), function (result) {
      res.json(result);
    });
  })

  app.get("/:department/:class", function (req, res) {
    let depName = req.params.department.toUpperCase();
    let className = req.params.class.toUpperCase();
    orm.findByDeptAndClass(depName, className, function (result) {
      res.render("merchDisplay", result);
    })
  })

  app.get("/:department/:class/:subclass", function (req, res) {
    let depName = req.params.department.toUpperCase();
    let className = req.params.class.toUpperCase();
    let subclass = req.params.subclass.toUpperCase();
    orm.findByDeptClassSubclass(depName, className, subclass, function (result) {
      res.render("merchDisplay", result);
    })
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
