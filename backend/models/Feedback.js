const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    name:String,
    subject:String,
    rating:Number,
    comments:String
});

module.exports = mongoose.model("Feedback", FeedbackSchema);