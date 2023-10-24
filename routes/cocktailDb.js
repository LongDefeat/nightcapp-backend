const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
  NotFoundError,
  BadRequestError
} = require("../expressError");

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

router.get("/search", async (req, res, next) => {
  const { recipe } = req.query;

  if (!recipe) {
    return next(new BadRequestError("You must provide a recipe name to search."));
  }

  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${recipe}`);
    return res.json(response.data);
  } catch (err) {
    return next(new NotFoundError("Recipe not found."));
  }
});

router.get("/random_recipe", async (req, res, next) => {
  try {
    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const recipe = response.data.drinks[0];
    return res.json({ recipe });
  } catch (err) {
    return next(err);
  }
});

router.get("/cocktail_by_letter", async (req, res, next) => {
  const { letter } = req.query;

  if (!letter || letter.length > 1) {
    return next(new BadRequestError("You must provide a single letter."));
  }

  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    const cocktails = response.data.drinks;
    return res.json({ cocktails });
  } catch (err) {
    return next(new NotFoundError("No cocktails found with the given letter."));
  }
});

router.get("/search/ingredient", async (req, res, next) => {
  const { ingredient } = req.query;

  if (!ingredient) {
    return next(new BadRequestError("You must provide an ingredient to search."));
  }

  try {
    const ingredientResponse = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const cocktails = ingredientResponse.data.drinks;
    return res.json({ cocktails });
  } catch (err) {
    return next(new NotFoundError("No cocktails found with the given ingredient."));
  }
});

router.get("/list/categories", async (req, res, next) => {
  console.log('categories route is running')
  try {
    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
    const categories = response.data.drinks;
    console.log(categories);
    return res.json({ categories });
  } catch (err) {
    return next(new NotFoundError("Categories not found."));
  }
});

router.get("/list/glasses", async (req, res, next) => {
  try {
    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list");
    const glasses = response.data.drinks;
    return res.json({ glasses });
  } catch (err) {
    return next(new NotFoundError("Glasses not found."));
  }
});

router.get("/list/ingredients", async (req, res, next) => {
  try {
    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list");
    const ingredients = response.data.drinks;
    return res.json({ ingredients });
  } catch (err) {
    return next(new NotFoundError("Ingredients not found."));
  }
});

router.get("/list/alcohol", async (req, res, next) => {
  try {
    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list");
    const alcoholTypes = response.data.drinks;
    return res.json({ alcoholTypes });
  } catch (err) {
    return next(new NotFoundError("Alcohol types not found."));
  }
});

// router.get("/all_filters", async (req, res, next) => {
//   try {
//     const [categories, glasses, ingredients] = await Promise.all([
//         axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"),
//         axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list"),
//         axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"),
//     ]);
    
//     return res.json({
//         categories: categories.data.drinks,
//         glasses: glasses.data.drinks,
//         ingredients: ingredients.data.drinks,
//     });
//   } catch (err) {
//     return next(err);
//   }
// });

router.get("/cocktails", async (req, res, next) => {
  const { category } = req.query;

  if (!category) {
    return next(new BadRequestError("You must provide a category."));
  }

  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const cocktails = response.data.drinks;
    return res.json({ cocktails });
  } catch (err) {
    return next(new NotFoundError("No cocktails found for the given category."));
  }
});

router.get("/glass", async (req, res, next) => {
  const { glass } = req.query;

  if (!glass) {
    return next(new BadRequestError("You must provide a glass type to search."));
  }

  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`);
    const cocktails = response.data.drinks;
    return res.json({ cocktails });
  } catch (err) {
    return next(new NotFoundError("No cocktails found for the given glass type."));
  }
});

router.get("/search/alcohol", async (req, res, next) => {
  const { alcohol } = req.query;

  if (!alcohol) {
    return next(new BadRequestError("You must provide an alcohol type to search."));
  }

  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcohol}`);
    const cocktails = response.data.drinks;
    return res.json({ cocktails });
  } catch (err) {
    return next(new NotFoundError("No cocktails found for the given alcohol type."));
  }
});




module.exports = router;
