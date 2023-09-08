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
    const response = await axios.get(`${BASE_URL}${recipe}`);
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

module.exports = router;
