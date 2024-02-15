import{useEffect,useState} from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import {useCookies} from 'react-cookie';

export const Home = ()=> {

    const[recipes,setRecipes] = useState([]);
    const [savedRecipes,setSavedRecipes] = useState([]);
    const[cookies] = useCookies(["access_token"]);
    
    const userID = useGetUserID ();
    console.log('userID:',userID)
    useEffect (()=> {
        const fetchRecipe = async () =>{
            
            try { 
               const response = await axios.get("http://localhost:3001/recipes");
               setRecipes(response.data);
               
            }

                catch (error) {
                console.error(error)
                
            }
        };
       

    const fetchSavedRecipe = async () =>{
            
        try { 
           const response = await axios.get(
            `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
            );
           setSavedRecipes(response.data.savedRecipes);
           
           
        }

        catch (error) {
            console.error(error)
            
        }
    };

    fetchRecipe();
    fetchSavedRecipe();
}, [userID]);

    const saveRecipe = async(recipeID) =>{
        try { 
            const response = await axios.put("http://localhost:3001/recipes",{
            //const response = await axios.get("http://localhost:3001/recipes/savedRecipes/"+userID,{
                recipeID,
                userID,
            },
            {head:{authorization: cookies.access_token }}
            
            );
            
            setSavedRecipes(response.data.savedRecipes)
         }

             catch (error) {
             console.error(error)
             
         }
     };

     const isRecipeSaved = (id) => savedRecipes && savedRecipes.includes(id); 
    console.log("recipes:",recipes)
    return(
        
    <div>
     <h1>Recipes</h1>
     <ul>
        {recipes?.map((recipe)=>(
            <li key={recipe._id}>
                {savedRecipes && savedRecipes.includes(recipe._id) && <h1>Already Saved</h1>}
                <div>
                    <h2>{recipe.name}</h2>
                    <button 
                    onClick={()=>saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}>
                        {isRecipeSaved(recipe._id) ? "Saved" : "save" }
                    </button>
                    
                </div>
                <div className ="steps">
                    <p>{recipe.steps}</p>
                </div>
                <img src ={recipe.imageUrl} alt ={recipe.name}/>
                <p>Cooking Time:{recipe.cookingTime} (minutes) </p>
            </li>
        ))} 
     </ul>
    </div>
    ); 
    
};