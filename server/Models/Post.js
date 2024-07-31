const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    userid: { type: String },
    name: { type: String, min: 3, max: 100 },
    title: { type: String },
    des: { type: String },
    image: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    goals: { type: String },
    disable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model("posts", postsSchema);
