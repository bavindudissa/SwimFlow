const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password, user_type, experience, gender, name, age, height, weight } = req.body;

    const user = await User.create({
        email,
        password,
        user_type,
        experience,
        gender,
        name,
        age,
        height,
        weight
    });

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Update User
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const user = await User.updateUser(id, updateData);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        return next(new ErrorHander("Unable to update user", 400));
    }
});

// Get User List
exports.getUserList = catchAsyncErrors(async (req, res, next) => {
    try {
        const userList = await User.getUserList();
        res.status(200).json({
            success: true,
            data: userList,
        });
    } catch (error) {
        return next(new ErrorHander("Unable to fetch user list", 400));
    }
});

// Get User by ID
exports.getUserById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.getUserById(id);
        if (!user) {
            return next(new ErrorHander("User not found", 404));
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        return next(new ErrorHander("Unable to fetch user", 400));
    }
});

// Compare Password
exports.checkPassword = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

   // try {
        const user = await User.checkPassword(email, password);
        if (!user) {
            return next(new ErrorHander("Password not match", 404));
        }
        res.status(200).json({
            success: true,
            data: user,
        });
  //  } catch (error) {
  //      return next(new ErrorHander("Unable to fetch user", 400));
  //  }
});
