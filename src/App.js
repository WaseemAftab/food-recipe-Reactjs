import React, { useEffect, useState } from 'react';
import Recipe from "./Recipe";
import './App.css';

const App = () => {

  const APP_ID = "5503a14c";
  const APP_KEY = "e4f7965e45e6a510d37f861b86687a95";


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


  useEffect(() => {
    getRecipes();
  },
    [query]);

  const getRecipes = async () => {
    const responce = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );

    const data = await responce.json();
    setRecipes(data.hits);


  };

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}></input>
        <button className="search-btn" type="submit">
          Search
          </button>
      </form>

      <p className="recipe-text">Search Recipes Like <strong>Banana</strong>
        <strong>, Chicken</strong>
        <strong>, Peanut</strong>
        <strong>, Rice</strong>
      </p>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
