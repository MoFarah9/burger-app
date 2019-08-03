import * as actionTypes from "./actionTypes";
import axios from "axios";

const URL = process.env.REACT_APP_DATA_URL;

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: name
});

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: name
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ingredients
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => dispatch => {
  axios
    .get(`${URL}/ingredients.json`)
    .then(response => dispatch(setIngredients(response.data)))
    .catch(error => dispatch(fetchIngredientsFailed()));
};
