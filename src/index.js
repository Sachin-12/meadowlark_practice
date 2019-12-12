const express = require("express");
const fortune = require("./lib/fortune.js");
const path = require("path");
const app = express();

// set up handlebars view engine
const handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(__dirname + "/public"));

// set 'showTests' context property if the querystring contains test=1
app.use(function(req, res, next) {
  res.locals.showTests =
    app.get("env") !== "production" && req.query.test === "1";
  next();
});

app.get("/", function(req, res) {
  res.render("home");
});
app.get("/about", function(req, res) {
  res.render("about", {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js' 
  });
});

app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
