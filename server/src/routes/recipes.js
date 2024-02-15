import express from 'express';
import { RecipesModel } from '../model/Recipe.js';
import { Usermodel } from '../model/user.js';
import { verifyToken } from './User.js';


const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        const response = await RecipesModel.find({});
        res.json(response);

        
    } catch (error) {
        res.json(error);
    }
});
router.post("/", verifyToken,  async(req,res)=>{
    const recipe = new RecipesModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);

        
    } catch (error) {
        res.json(error);
    }
});

//router.put("/", verifyToken, async(req,res)=>{
router.put("/", async(req,res)=>{


    try {

        const recipe = await RecipesModel.findById(req.body.recipeID);
        const user = await Usermodel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes });


        
    } catch (error) {
        res.json(error);
    }
});

router.get("/savedRecipes/ids/:userID", async(req,res) => {
    try {
        const user = await Usermodel.findById(req.params.userID);
        console.log("user:",user)
        res.json({savedRecipes:user?.savedRecipes});
    } catch (error) {
        res.json(error);
        
    }
});
router.get("/savedRecipes/:userID", async(req,res) => {
    try {
        const user = await Usermodel.findById(req.params.userID);
        console.log("user1:",user)
        const savedRecipes = await RecipesModel.find({
            _id:{$in: user.savedRecipes},
        });
        console.log("savedRecipes:",savedRecipes)
        res.json({savedRecipes});
    } catch (error) {
        res.json(error);
        
    }
});

//create api  to store the recipe use post same like register
// router.param("userID",async(req,res,next,id)=>{
//     console.log("id:"+ id);
//     next();
// })
router.post("/createreceipe/:userID",async(req,res)=>{

    const recipe = new RecipesModel(req.body);
    try {
        const response = await recipe.save();
        console.log('res:'+response)
        res.json(response);

        
    } catch (error) {
        console.log('err:'+error)
        res.json(error);
    }
})


export{router as recipesRouter};