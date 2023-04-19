const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Blog', blogSchema);

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})
