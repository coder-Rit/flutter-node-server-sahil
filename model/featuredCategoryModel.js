const mongoose = require("mongoose");
 

const featuredCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  }
});

 

module.exports = mongoose.model("featuredCategory", featuredCategorySchema);
