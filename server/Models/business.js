const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the business promotion form
const BusinessPromotionSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
        type: String,
        trim: true
    },
    productsOrServices: {
        type: String,
        trim: true
    },
    logoOrProductImages: {
        type: String, // Array of URLs or file paths
        // r 
    },
    userid: {
        type: String,// Array of URLs or file paths
        // r 
    },
    disable: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

// Create the model from the schema
const BusinessPromotion = mongoose.model('BusinessPromotion', BusinessPromotionSchema);
module.exports = BusinessPromotion;
