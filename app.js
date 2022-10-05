//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-aadi:Test-1659@cluster0.l8yhchl.mongodb.net/blog-website");
// mongoose.connect('mongodb://localhost:27017/blog-website');
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Blog = mongoose.model("Blog",blogSchema);

app.get("/",function(req,res){
    
    Blog.find({},function(err,blogs){
      res.render("home",{
        homeStartingContent : homeStartingContent,
        posts:blogs,
           
      });
    })
    
})


// suppose we have a number of routes for out individual blogs like posts/day 1 posts/day 2 etc etc.
// for that what we can do is use the route parameters which takes the input in the route and uses that as a variable.

// app.get('/users/:userId/books/:bookId', (req, res) => {
//   // Access userId via: req.params.userId
//   // Access bookId via: req.params.bookId
//   res.send(req.params);
// })
app.get("/posts/:postName",function(req,res){
  const requestedId = req.params.postName;
  Blog.findOne({_id:requestedId},function(err,blog){
    if(!err){
      console.log("Rendering "+ requestedId);
      res.render("post",{
        requestedTitle:blog.title,
        blogContent:blog.content,
      })
    }
  
    else{
        console.log("Not found");
    }
  })
})

  


app.get("/about",function(req,res){
  res.render("about",{
    aboutContent : aboutContent,
  })
})

app.get("/contact",function(req,res){
  res.render("contact",{
    contactContent : contactContent,
  })
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){
  var post = {
    title : req.body.title,
    post : req.body.post,
  }
  const blog = new Blog({
    title:req.body.title,
    content:req.body.post,
  })
  blog.save(function(err){
    if(!err){
      posts.push(post);
      res.redirect("/");
    }

  });
})
  
let port = process.env.PORT;

app.listen(port, function() {
  console.log("Server started on port 3000");
});
 
  
    







