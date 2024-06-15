const path = require('path');
const express = require('express');
const UserRoute = require('./routes/user');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const Blog = require('./models/blog');
const { checkforauthenticationcookie } = require('./middlewares/authentication');

const app = express();
const PORT = 5001;

mongoose.connect('mongodb://localhost:27017/devblogs').then(() => console.log("Mongodb connected"))
  .catch(err => console.error("Could not connect to MongoDB...", err));


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));
const blogroute = require('./routes/blog');
app.use(cookieparser());
app.use(checkforauthenticationcookie('token'));
app.use(express.static(path.resolve('./public')));
app.use(express.json()); 

app.get('/', async (req,res) => {
  const allBlogs = await Blog.find({});
    res.render("home",{
      user: req.user,
      blogs: allBlogs,
    });
});


app.use("/user",UserRoute);
app.use("/blog",blogroute);

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));