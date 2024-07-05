document.addEventListener('DOMContentLoaded', () => {
    const searchNameInput = document.getElementById('search-name-input');
    const searchNameButton = document.getElementById('search-name-btn');
    const searchLetterInput = document.getElementById('search-letter-input');
    const searchLetterButton = document.getElementById('search-letter-btn');
    const searchIngredientInput = document.getElementById('search-ingredient-input');
    const searchIngredientButton = document.getElementById('search-ingredient-btn');
    const randomCocktailButton = document.getElementById('random-cocktail-btn');
    const resultsContainer = document.getElementById('results-container');

    const fetchCocktailsByName = () => {
        const name = searchNameInput.value.trim();
        if (name === '') return;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
            .then(response => response.json())
            .then(data => displayCocktails(data.drinks))
            .catch(error => console.error('Error:', error));
    };

    const fetchCocktailsByLetter = () => {
        const letter = searchLetterInput.value.trim();
        if (letter === '' || letter.length > 1) return;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
            .then(response => response.json())
            .then(data => displayCocktails(data.drinks))
            .catch(error => console.error('Error:', error));
    };

    const fetchIngredientByName = () => {
        const ingredient = searchIngredientInput.value.trim();
        if (ingredient === '') return;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`)
            .then(response => response.json())
            .then(data => displayIngredients(data.ingredients))
            .catch(error => console.error('Error:', error));
    };

    const fetchRandomCocktail = () => {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(response => response.json())
            .then(data => displayCocktails(data.drinks))
            .catch(error => console.error('Error:', error));
    };

    const displayCocktails = (cocktails) => {
        resultsContainer.innerHTML = '';
        if (!cocktails) {
            resultsContainer.innerHTML = '<p class="text-center">No results found</p>';
            return;
        }
        cocktails.forEach(cocktail => {
            const cocktailCard = document.createElement('div');
            cocktailCard.className = 'cocktail-card';
            cocktailCard.innerHTML = `
                <h4>${cocktail.strDrink}</h4>
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                <p>${cocktail.strInstructions}</p>
            `;
            resultsContainer.appendChild(cocktailCard);
        });
    };

    const displayIngredients = (ingredients) => {
        resultsContainer.innerHTML = '';
        if (!ingredients) {
            resultsContainer.innerHTML = '<p class="text-center">No results found</p>';
            return;
        }
        ingredients.forEach(ingredient => {
            const ingredientCard = document.createElement('div');
            ingredientCard.className = 'cocktail-card';
            ingredientCard.innerHTML = `
                <h4>${ingredient.strIngredient}</h4>
                <p>${ingredient.strDescription || 'No description available.'}</p>
            `;
            resultsContainer.appendChild(ingredientCard);
        });
    };

    searchNameButton.addEventListener('click', fetchCocktailsByName);
    searchLetterButton.addEventListener('click', fetchCocktailsByLetter);
    searchIngredientButton.addEventListener('click', fetchIngredientByName);
    randomCocktailButton.addEventListener('click', fetchRandomCocktail);
});
