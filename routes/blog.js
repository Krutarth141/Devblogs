const { express } = require("express");
const { Router } = require("express");
const multer = require('multer');
const path = require('path'); 

const Blog = require('../models/blog');
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
});

const upload = multer({ storage: storage });


router.get('/add-new',(req,res)=>{
    return res.render('addblog', {
        user: req.user,
    });
});

router.get("/:id", async (req, res) => {

    const blog = await Blog.find().populate("createdBy");
  
    return res.render("blog", {
      user: req.user,
      blog,
    });
  

});




router.post("/", upload.single("coverimage"), async (req, res) => {
  const { title, body } = req.body;
  const coverimageurl = req.file ? `/uploads/${req.file.filename}` : '';
  const blog = await Blog.create({
    body,
    title,
    CreatedBy: req.user._id,
    coverimageurl,
  });
  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;