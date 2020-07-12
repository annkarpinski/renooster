//VIEW ROUTES FOR SERVING UP PAGE TEMPLATES
//index or main page view route is associated with user login, found in authController.js
module.exports = function (app) {

    // @route:  GET /add
    // @desc:   Return add template
    app.get("/add", function (req, res) {
        res.render("add");
    });

    // @route:  GET /edit
    // @desc:   Return edit template  
    app.get("/edit/:id", function (req, res) {
        console.log('hey hey hey',req.params)
        res.render("edit", req.params);
    });
};
