import { useState } from "react";
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID";
import {useNavigate} from 'react-router-dom'

export const CreateRecipe = ()=> {
    const userID = useGetUserID();
    console.log("USERiD:",userID)
    const [recipe,setRecipe] = useState({
      name:"",
      description:"",
      ingredients:[],
      steps:"",
      imageUrl:"",
      cookingTime:0,
      userOwner:userID,

    });

    const navigate = useNavigate();
    const handleChange = (event) =>{
        const {name,value} = event.target;
        setRecipe({...recipe, [name]: value})

    };
    const handleIngredientChange = (event,index) =>{
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
        setRecipe({...recipe, ingredients});
        

    };
    const addIngredient = ()=>{
        setRecipe({...recipe, ingredients:[...recipe.ingredients, ""] });
    }
    const onSubmit = async (event)=>{
        event.preventDefault();
        try {
            
            await axios.post("http://localhost:3001/recipes/createreceipe/"+userID,recipe).then((res)=>{
                console.log(res)
            });
            alert("Recipe Created");
            navigate("/");
        } catch (error) {
            console.error(error);
            
        }

    }

    return(
    <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form onSubmit={onSubmit}>
            <label htmlFor="name">
                Name 
            </label>
            <input type="text" id="name" name="name" value={recipe.name} onChange={handleChange}/>

            <label htmlFor="description">Description</label>
            <textarea id="description" name="description"  value={recipe.description} onChange={handleChange}/>

            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient,index)=>(
                <input 
                key={index}
                type="text"
                name="ingredient"
                value={ingredient}
                onChange ={(event)=> handleIngredientChange(event, index)}
                />
            ))}
            <button onClick={addIngredient} type="button"> Add Ingredients</button>

            <label htmlFor="steps">steps</label>
            <textarea id="steps" name="steps"  value={recipe.steps} onChange={handleChange}/>

            <label htmlFor="imageUrl">ImageUrl</label>
            <input type="text" id="imageUrl" name="imageUrl"  onChange={handleChange}/>

            <label htmlFor="cookingTime">Cooking Time(minutes)</label>
            <input type="number" id="cookingTime" name="cookingTime" value={recipe.cookingTime} onChange={handleChange}/>

            <button type="submit"> Create Recipe</button>

            
            
        </form>
    
    </div>
    );
    
};