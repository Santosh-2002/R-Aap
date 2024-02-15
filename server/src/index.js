import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/User.js';
import { recipesRouter } from './routes/recipes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);
app.use(express.urlencoded({ extended: true }));

//include link in .env 
mongoose.connect("mongodb+srv://santhoshnns:santhosh2323@cluster0.fa0pobn.mongodb.net/RecipeApp?retryWrites=true&w=majority",
{
    useNewUrlparser: true,
    useUnifiedTopology: true,
}

);
app.listen(3001, ()=> console.log("server started!"));
