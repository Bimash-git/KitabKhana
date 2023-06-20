const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true,"please enter name"] },
        email: { type: String, required: [true,"please enter email"] },
        password: { type: String, required: [true,"Please enter "] },
        createdAt: { type: Date, default: new Date() }
    },
    {
        collection: "User"
    }
)

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
} )

const User = mongoose.model("User", userSchema);
module.exports = User;