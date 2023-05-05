
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://akshat0008:Ri4zXRwhJthjL9Fh@cluster0.sxrjawp.mongodb.net/postsDB");

//mongoose.connect("mongoose://")

const homeStartingContent = "Track your daily activites here. Create you daily journal and access it anywhere and anytime and share with your friends.";
const aboutContent = "This web app is build so that one can track his daily life digitally. User can compose there posts and publish it by going to the '/compose' route. This is a basic app used for learning some techs and get a proper understanding of backend in web development. This project helped me a lot growing my skills and learn MERN technology in a good and efficient manner.";
const contactContent = "Akshat Pandey (akshatp454@gmail.com)";

const postSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Post = mongoose.model("Post",postSchema);

const defaultPosts= [];


app.get("/" , function(req,res){
  Post.find({},function(err,foundPosts){
    res.render("home" , {homeStartingContent: homeStartingContent, posts: foundPosts});
  })
  // res.render("land");
  
  
})

app.get("/about" , function(req,res){
  res.render("about" , {aboutContent: aboutContent});
})

app.get("/contact" , function(req,res){
  res.render("contact" , {contactContent: contactContent});
})

app.get("/compose" , function(req,res){
  res.render("compose");
})

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.title,
    content: req.body.newCompose
  });
  post.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.redirect("/");
    }
  });
})

app.get("/posts/:postId" , function(req,res){

  Post.findOne({_id: req.params.postId}, function(err, post){ 
      res.render("post" , {post: post});
  })

  // Post.find({},function(err,foundPosts){
  //   foundPosts.forEach(function(post){
  //     if(_.lowerCase(post.title)===_.lowerCase(req.params.postId)){
  //       res.render("post" , {post: post});
  //     }
  //   })
  // })
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
