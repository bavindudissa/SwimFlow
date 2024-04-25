const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    swimmingDistance: {
        type: Number,
        required: [true, "Please Enter Your Swimming Distance Goal"],
        min: [0, "Distance cannot be negative"]
    },
    swimmingTime: {
        type: Number,
        required: [true, "Please Enter Your Swimming Time Goal"],
        min: [0, "Time cannot be negative"]
    },
    achiveTime: {
        type: Number,
        default: null,
        min: [0, "Time cannot be negative"]
    },
    status: {
        type: String,
        default: null,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referencing the Users collection
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create Goal
goalSchema.statics.createGoal = async function (goalData) {
    try {
        const goal = await this.create(goalData);
        return goal;
    } catch (error) {
        throw error;
    }
};

// Update Goal
goalSchema.statics.updateGoal = async function (goalId, updateData) {
    try {
        const goal = await this.findByIdAndUpdate(goalId, updateData, { new: true });
        return goal;
    } catch (error) {
        throw error;
    }
};

// Delete Goal
goalSchema.statics.deleteGoal = async function (goalId) {
    try {
        await this.findByIdAndDelete(goalId);
    } catch (error) {
        throw error;
    }
};

// Modify the static method to accept userId as a parameter
goalSchema.statics.getGoalList = async function (userId) {
    try {
        // Find goals that match the userId
        const goalList = await this.find({ userId });
        return goalList;
    } catch (error) {
        throw error;
    }
};

// Get Goal by ID
goalSchema.statics.getGoalById = async function (goalId) {
    try {
        const goal = await this.findById(goalId);
        return goal;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model("Goal", goalSchema);
