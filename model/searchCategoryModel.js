const mongoose = require("mongoose");
 

const searchCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  }
});

 

module.exports = mongoose.model("searchCategory", searchCategorySchema);
