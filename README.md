# KEP Ski & Snowboard Shop

Hosted on Heroku: [KEP Ski & Snowboard] (https://floating-woodland-41490.herokuapp.com/)

### About

* `KEP Ski & Snowboard Shop` is a fictitious but fully functioning online storefront. Posing as an online storefront for winter sports equipment and clothing items, visitors are able to shop for items by category or by gender, select from available colors and sizes while adding select items to their shopping cart. A final invoice page is generated dynamically upon checkout.


### Behind the Scenes

* The frontend team made use of custom `CSS`, the grid layout and other `UIKit` components in conjunction with `Handlebars.js` as templating engine to achieve a fluid, cohesive and responsive design.

* An `Express.js` server running on `Node.js` powers the backend. `Express.js` serves API routes which query the `MySQL` database via `Sequelize.js`, a promise-based `ORM` for `Node.js`. We leaned on `Sequelize.js` to define our data model, connect our app to and query the `MySQL` database. Unique queries unsupported by `Sequelize.js` are handled by custom methods written in `Javascript`. `jQuery` event listeners and AJAX requests support dynamic features such as color and size selection, the shopping cart as well as the invoice page.

### Technologies Listed

* [UIKit](https://getuikit.com/)
* [Handlebars.js](https://handlebarsjs.com/)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [jQuery](https://jquery.com/)
* [MySql](https://www.mysql.com/)
* [Sequelize.js](http://docs.sequelizejs.com/)