const express = require("express");

const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.set("view engine", "ejs");

let items = ["Programiranje do 14:00", "Sisanje u 14:30"]

let workItems = []

app.get("/", function (req, res) {
    
let day = date.getDate();

    res.render("list", {
        listTitle: day,
        nextToDos: items
    });
});

app.post("/", function (req, res) {

    let item = req.body.nToDo;
    if (req.body.list === "work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        nextToDos: workItems
    });
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen("3000", function () {
    console.log("Server is running");
});