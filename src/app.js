const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

// define path for express config
const publicDirectory = path.join(__dirname, "../public");
console.log(publicDirectory);
const viewsPath = path.join(__dirname, "../templates/views");
console.log("view path is: " + viewsPath);
// set path for partials
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handle bars engine and view location
// set key and value after installing hbs
app.set("view engine", "hbs");
app.set("views", viewsPath);
// register partials
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));

// for rendering the index.hbs
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    builtBy: "Gopinath",
  });
});

// for rendering the about.hbs
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    builtBy: "Gopinath",
  });
});

// for rendering the help.hbs
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather App",
    contact: "111111111",
    builtBy: "Gopinath",
  });
});

// route for the weather page
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { lattitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(lattitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
        console.log(forecastData);
      });
    }
  );
  // res.send([
  //   {
  //     forecast: "snowing",
  //     location: req.query.address,
  //   },
  // ]);
});

// example set up to check query string
app.get("/products", (req, res) => {
  if (!req.query.item) {
    return res.send({
      error: "please provide item description",
    });
  }
  res.send({
    products: [],
  });
});

// specific 404 error using send()
// app.get("/help/*", (req, res) => {
//   res.send("help article not found");
// });

// specific 404 error using render()
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMsg: "No article found - sorry",
    builtBy: "Gopinath",
  });
});

// generally setting 404 error using send()
// app.get("*", (req, res) => {
//   res.send("page not found");
// });

// generally setting 404 error using render()
app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMsg: "No page Found - 404 Error",
    builtBy: "Gopinath",
  });
});

// to start the server
app.listen(3000, () => {
  console.log("server is up and running");
});
