const categoryModel = require("../models/categoryModel");

const creareCategoryController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        if (!title) {
            return res.status(500).send({
                success: false,
                message: "Please provide category title or image",
            });
        }

        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();

        res.status(201).send({
            success: true,
            message: "Category created",
            newCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create category API",
            error,
        });
    }
};

const getAllCategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "Not categories available",
            });
        }

        res.status(200).send({
            success: true,
            totalCount: categories.length,
            categories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all category API",
            error,
        });
    }
};

const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;

        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { title, imageUrl },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: "Not found category",
            });
        }

        res.status(200).send({
            success: true,
            message: "Category updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update category API",
            error,
        });
    }
};

const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(500).send({
                success: false,
                messge: "Please provide category ID",
            });
        }

        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Not found category",
            });
        }

        await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete category API",
            error,
        });
    }
};

module.exports = {
    creareCategoryController,
    getAllCategoryController,
    updateCategoryController,
    deleteCategoryController,
};
