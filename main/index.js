const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
const { name } = require("ejs");
const _=require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => console.log(err.message));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/TodoListDb');
}

const todoListSchema=new mongoose.Schema({
  name:String
});

const List=mongoose.model('list',todoListSchema);

app.get("/",async (req,res)=>{
  const listA=await List.find();
  res.render("index",{lists:listA});
});

app.post("/add",async (req,res)=>{
  await List.create({name:req.body.listtoadd})
  res.redirect("/"); 
})

app.post("/delete",async (req,res)=>{
  // console.log(req.body.check);  (to test)
  const toDelete=await List.deleteOne({name:req.body.check});
  res.redirect("/");
  // console.log(toDelete); (to test)
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});