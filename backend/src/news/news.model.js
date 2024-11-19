import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    // date: {
    //     type: Date,
    //     required: true,
    // },
    // author: {
    //     type: String,
    //     required: true,
    // },
    // category: {
    //     type: String,
    //     required: true,
    // },
    tags: {
        type: [String],
        required: true,
    },
}, {
    timestamps: true,
});

const News = mongoose.model('News', newsSchema);
export default News;