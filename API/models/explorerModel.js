const mongoose = require("mongoose");

const explorerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a title for explorer"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description for explorer"]
    },
    url: {
        type: String,
        required: [true, "Please enter a URL for explorer"]
    },
    type: {
        type: String,
        enum: ["video", "link", "blog"],
        required: [true, "Please enter a type for explorer"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create Explorer
explorerSchema.statics.createExplorer = async function (explorerData) {
    try {
        const explorer = await this.create(explorerData);
        return explorer;
    } catch (error) {
        throw error;
    }
};

// Update Explorer
explorerSchema.statics.updateExplorer = async function (explorerId, updateData) {
    try {
        const explorer = await this.findByIdAndUpdate(explorerId, updateData, { new: true });
        return explorer;
    } catch (error) {
        throw error;
    }
};

// Delete Explorer
explorerSchema.statics.deleteExplorer = async function (explorerId) {
    try {
        await this.findByIdAndDelete(explorerId);
    } catch (error) {
        throw error;
    }
};

explorerSchema.statics.getExplorerList = async function () {
    try {
        const explorerList = await this.find();
        return explorerList;
    } catch (error) {
        throw error;
    }
};

// Get Explorer by ID
explorerSchema.statics.getExplorerById = async function (explorerId) {
    try {
        const explorer = await this.findById(explorerId);
        return explorer;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model("Explorer", explorerSchema);
