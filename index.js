const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const port = 3000;

const items = ["Buy Food" , "Cook Food" , "Eat Food"];
const workItem = ["Go to work" , "Pretend to like it"];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {

  const day = date.getDate();
  res.render("list", { listTitle: day , newListItem: items});
});

app.post("/" , (req , res) => {
  const item = req.body.newItem;

  if(req.body.list === "Work"){
    workItem.push(item);
    res.redirect("/work")
  }else{
    items.push(item);
    res.redirect("/");
  }

})

app.get("/work" , (req , res) => {
  res.render("list", { listTitle: "Work List" , newListItem: workItem});
})

app.get("/about" , (req , res) => {
  res.render("about");
})

// app.post("/work" ,(req , res) => {
//   const item = req.body.list;
//   workItem.push(item);
//   res.redirect("/work")
// })

app.listen(port, () => {
  console.log("Server is running at port " + port);
});
