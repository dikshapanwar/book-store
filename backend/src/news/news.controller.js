import News from "./news.model.js";

const createNews=async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const news = new News( req.body);
        await news.save();
        console.log(news)
        res.status(201).json({
            success: true,
            message: "News created successfully",
            news,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "News creation failed",
            error: error.message,
        });
    }
};
const getAllNews =async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "News fetched successfully",
            news,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "News fetching failed",
            error: error.message,
        });
    }
};
const getSingleNews =async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findById(id);
        if (!news) {
            return res.status(404).json({
                success: false,
                message: "News not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "News fetched successfully",
            news,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "News fetching failed",
            error: error.message,
        });
    }
};
const updateANews=async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!news) {
            return res.status(404).json({
                success: false,
                message: "News not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "News updated successfully",
            news,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "News updating failed",
            error: error.message,
        });
    }
};
const deleteANews =async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findByIdAndDelete(id);
        if (!news) {
            return res.status(404).json({
                success: false,
                message: "News not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "News deleted successfully",
            news,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "News deletion failed",
            error: error.message,
        });
    }
};
export { createNews,getAllNews, getSingleNews,updateANews, deleteANews };