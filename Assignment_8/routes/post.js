const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const moment = require("moment");

// GET - /blog route
router.get("/blog", async (req, res) => {
  const posts = await Post.find({});
  res.render("posts/home", { posts, titleTag: "All Blog Posts" });
});

// GET - /blog/new
router.get("/blog/new", (req, res) => {
  res.render("posts/addnewPost", { titleTag: "Add New Post" });
});

// POST - /blog
router.post("/blog", async (req, res) => {
  // console.log(req.body);
  const newPost = {
    ...req.body,
    postedOn: moment().format("MMMM Do YYYY"),
  };

  // adding this new post to the posts collection
  await Post.create(newPost);

  res.redirect("/blog");
});

// GET - /blog/:id
router.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("comments");
  // console.log(post);
  res.render("posts/post", { post, titleTag: `${post.title}` });
});

// GET - /blog/:id/edit
router.get("/blog/:id/edit", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.render("posts/editPost", { post, titleTag: `Edit Post | ${post.title}` });
});

// PATCH - /blog/:id
router.patch("/blog/:id", async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndUpdate(id, req.body);
  res.redirect(`/blog/${id}`);
});

// DELETE - /blog/:id
router.delete("/blog/:id", async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.redirect("/blog");
});

// POST - /blog/:id/comment
router.post("/blog/:id/comment", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  const comment = new Comment(req.body);

  post.comments.push(comment);

  await comment.save();
  await post.save();

  res.redirect(`/blog/${id}`);
});

module.exports = router;
