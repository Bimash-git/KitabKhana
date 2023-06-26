const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: [true,"please enter name"] },
        email: { type: String, required: [true,"please enter email"], unique: true },
        password: { type: String, required: [true,"Please enter password"] },
        createdAt: { type: Date, default: new Date() }
    }
)

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12)
} )

const User = mongoose.model("User", userSchema);
module.exports = User;