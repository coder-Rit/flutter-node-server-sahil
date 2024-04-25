const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model("banner", bannerSchema);
