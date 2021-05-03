const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const seedDB = require("./seed");
const postRoutes = require("./routes/post");
const methodOverride = require("method-override");

// ===== DATABASE =====
const server = "localhost:27017";
const db = "avinash-blog-app";
mongoose
  .connect(`mongodb://${server}/${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Connected to ${db} db successfully!`))
  .catch(err => console.log(err.message));

// seed the database
seedDB();

// ===== Config =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ===== Routes =====
// Homepage
app.get("/", (req, res) => {
  res.render("index", { titleTag: "Homepage" });
});

// Post Routes
app.use(postRoutes);

// server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running at port : ", port);
});
