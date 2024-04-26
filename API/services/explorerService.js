const Explorer = require("../models/explorerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Explorer
exports.createExplorer = catchAsyncErrors(async (req, res, next) => {
    const { title, description, url, type } = req.body;

    const explorerData = {
        title,
        description,
        url,
        type
    };

    try {
        const explorer = await Explorer.createExplorer(explorerData);
        res.status(201).json({
            success: true,
            data: explorer
        });
    } catch (error) {
        return next(new ErrorHander("Unable to create explorer", 400));
    }
});

// Update Explorer
exports.updateExplorer = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const explorer = await Explorer.updateExplorer(id, updateData);
        res.status(200).json({
            success: true,
            data: explorer
        });
    } catch (error) {
        return next(new ErrorHander("Unable to update explorer", 400));
    }
});

// Delete Explorer
exports.deleteExplorer = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
        await Explorer.deleteExplorer(id);
        res.status(200).json({
            success: true,
            message: "Explorer deleted successfully"
        });
    } catch (error) {
        return next(new ErrorHander("Unable to delete explorer", 400));
    }
});

// Get Explorer List
exports.getExplorerList = catchAsyncErrors(async (req, res, next) => {
    try {
        const explorerList = await Explorer.getExplorerList();
        res.status(200).json({
            success: true,
            data: explorerList
        });
    } catch (error) {
        return next(new ErrorHander("Unable to fetch explorer list", 400));
    }
});

// Get Explorer by ID
exports.getExplorerById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
        const explorer = await Explorer.getExplorerById(id);
        if (!explorer) {
            return next(new ErrorHander("Explorer not found", 404));
        }
        res.status(200).json({
            success: true,
            data: explorer
        });
    } catch (error) {
        return next(new ErrorHander("Unable to fetch explorer", 400));
    }
});
