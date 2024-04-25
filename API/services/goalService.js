const Goal = require("../models/goalModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Goal
exports.createGoal = catchAsyncErrors(async (req, res, next) => {
    const { swimmingDistance, swimmingTime, userId } = req.body;

    const goalData = {
        swimmingDistance,
        swimmingTime,
        userId
    };

    const goal = await Goal.createGoal(goalData);
    res.status(201).json({
        success: true,
        data: goal
    });
});

// Update Goal
exports.updateGoal = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const goal = await Goal.updateGoal(id, updateData);
        res.status(200).json({
            success: true,
            data: goal
        });
    } catch (error) {
        return next(new ErrorHander("Unable to update goal", 400));
    }
});

// Delete Goal
exports.deleteGoal = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
        await Goal.deleteGoal(id);
        res.status(200).json({
            success: true,
            message: "Goal deleted successfully"
        });
    } catch (error) {
        return next(new ErrorHander("Unable to delete goal", 400));
    }
});

// Get Goal List
exports.getGoalList = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
        const goalList = await Goal.getGoalList(id);
        res.status(200).json({
            success: true,
            data: goalList
        });
    } catch (error) {
        return next(new ErrorHander("Unable to fetch goal list", 400));
    }
});

// Get Goal by ID
exports.getGoalById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
        const goal = await Goal.getGoalById(id);
        if (!goal) {
            return next(new ErrorHander("Goal not found", 404));
        }
        res.status(200).json({
            success: true,
            data: goal
        });
    } catch (error) {
        return next(new ErrorHander("Unable to fetch goal", 400));
    }
});
