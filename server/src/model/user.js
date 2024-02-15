import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, requird:true, },
    password: {type: String, requird:true},
    savedRecipes:[{type:mongoose.Schema.Types.ObjectId, ref: "recipes"}]

});

export const Usermodel = mongoose.model("users", UserSchema);