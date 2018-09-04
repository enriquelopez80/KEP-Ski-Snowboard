const orm = require("./orm");


module.exports = function (app) {

  app.get("/", function (req, res) {
    orm.homePageData(1900, 3000, function (result) {
      res.render("index", result)
    })
  });

  app.get("/id/:id", function (req, res) {
    let id = Number(req.params.id);
    orm.findItemById(id, function (result) {
      res.render("merchDisplay", result);
    })
  });

  app.put("/checkout", function (req, res) {
    let idArray = req.body.data;
    console.log(JSON.stringify(idArray, undefined, 2));
    orm.findAllByIdArray(idArray, function (result) {
      res.json(result)
      // res.send('SUCCESS');
      // res.render("cart", result);
    });
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
