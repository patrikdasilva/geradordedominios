import mongoose from "mongoose";

const itemSchema  = new mongoose.Schema({
    type: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
})

const ItemModel = mongoose.model('item', itemSchema);

export default ItemModel;