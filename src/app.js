const express = require ("express");
const path = require("path");
// to use partials we need to require hbs
const hbs = require("hbs");
const app = express();
const PORT = process.env.PORT || 8000;

// public static path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path)); 

app.set('view engine', 'hbs');
app.set('views', template_path);
// to use partials we need to register partials
hbs.registerPartials(partial_path);

// routing
app.get("", (req, res) => {
    // res.send("welcome to my this new Project")
    res.render('index')
})
app.get("/about", (req, res) => {
    res.render('about')
})

app.get("/weather", (req, res) => {
    res.render("weather")
})

app.get("*", (req, res) => {
    res.render("error404", {
        errMsg:'Oops! Page Not Found'
    })
})

app.listen(PORT, () => {
    console.log(`listening to the port at ${PORT}`)
})