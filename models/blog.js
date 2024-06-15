const { Schema,model } = require('mongoose');
const mongoose = require('mongoose');



const blogschema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverimageurl: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },    
}, {timestamps: true}
); 

const Blog = mongoose.model('blog', blogschema);
module.exports = Blog;