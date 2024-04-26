const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    user_type: {
      type: String,
      enum: ["Admin", "User"],
      required: true
    },
    experience: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    name: {
      type: String,
      required: [true, "Please Enter Your Name"]
    },
    age: {
      type: Number,
      required: [true, "Please Enter Your Age"],
      min: [0, "Age cannot be negative"]
    },
    height: {
      type: Number,
      required: [true, "Please Enter Your Height"],
      min: [0, "Height cannot be negative"]
    },
    weight: {
      type: Number,
      required: [true, "Please Enter Your Weight"],
      min: [0, "Weight cannot be negative"]
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

// Add custom methods
userSchema.statics.updateUser = async function(userId, updateData) {
    try {
        const user = await this.findByIdAndUpdate(userId, updateData, { new: true });
        return user;
    } catch (error) {
        throw error;
    }
};


userSchema.statics.getUserList = async function() {
    try {
        const userList = await this.find();
        return userList;
    } catch (error) {
        throw error;
    }
};

userSchema.statics.getUserById = async function(userId) {
    try {
        const user = await this.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
};

// Add a custom method to check password
userSchema.statics.checkPassword = async function(email, password) {
    try {
        // Find the user by email
        const user = await this.findOne({ email }).select('+password');
        if (!user) {
            throw new Error('User not found');
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Incorrect password');
        }

        // Return the user if password is correct
        return user;
    } catch (error) {
        throw error;
    }
};


module.exports = mongoose.model("User", userSchema);
