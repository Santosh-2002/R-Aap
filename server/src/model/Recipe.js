import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        
    },
    ingredients: [{
        type: String, 
        required: true}],
    steps: { 
        type:String,
        required: true,
        
      },
    imageUrl: { 
        type: String, 
        required:true},
    cookingTime: {
        type: Number,
        
        },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    
    });

    

export const RecipesModel = mongoose.model("recipes",RecipeSchema);
