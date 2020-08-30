import * as base from './base';
import { Fraction } from 'fractional';

const createIngredient = (current) => {
  const item = `
  <li class="recipe__item">
      <svg class="recipe__icon">
          <use href="img/icons.svg#icon-check"></use>
      </svg>
      <div class="recipe__count">${formatCount(current.count)}</div>
      <div class="recipe__ingredient">
          <span class="recipe__unit">${current.unit}</span>
          ${current.ingredient}
      </div>
  </li>
  `;
  return item;
};

export const clearRecipe = () => {
  base.DOMStrings.recipeContainer.innerHTML = "";
};

const formatCount = count => {
  //console.log(count);
  if(count){
    const newCount = Math.round(count * 10000) / 10000;
    let[num, dec] = newCount.toString().split('.');
    /*console.log(num);
    console.log(dec);
    console.log("----------");*/
    num = parseInt(num, 10);
    dec = parseInt(dec, 10);

    if(!dec) {
      return newCount;
    }

    if(num === 0) {
      const fraction = new Fraction(newCount);
      return `${fraction.numerator} / ${fraction.denominator}`;
    }
    else {
      const fraction = new Fraction(newCount - num);
      return `${num} ${fraction.numerator} / ${fraction.denominator}`;
    }
  }

  return 'Err';

};


export const displayRecipe = (recipe, isLiked) => {

  const recipeString = `
  <figure class="recipe__fig">
      <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
          <span>${recipe.title}</span>
      </h1>
  </figure>
  <div class="recipe__details">
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="img/icons.svg#icon-stopwatch"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
          <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="img/icons.svg#icon-man"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text"> servings</span>

          <div class="recipe__info-buttons">
              <button class="btn-tiny btn-decrease">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-minus"></use>
                  </svg>
              </button>
              <button class="btn-tiny btn-increase">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-plus"></use>
                  </svg>
              </button>
          </div>

      </div>
      <button class="recipe__love">
          <svg class="header__likes">
              <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
          </svg>
      </button>
  </div>



  <div class="recipe__ingredients">
      <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(cur => createIngredient(cur)).join('')}

      </ul>

      <button class="btn-small recipe__btn recipe__btn--add">
          <svg class="search__icon">
              <use href="img/icons.svg#icon-shopping-cart"></use>
          </svg>
          <span>Add to shopping list</span>
      </button>
  </div>

  <div class="recipe__directions">
      <h2 class="heading-2">How to cook it</h2>
      <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
      </p>
      <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-right"></use>
          </svg>

      </a>
  </div>
  `;

  base.DOMStrings.recipeContainer.insertAdjacentHTML('afterbegin', recipeString);
};

export const updateServings = (recipe) => {
  document.querySelector(".recipe__info-data--people").textContent = recipe.servings;

  const countElements = Array.from(document.querySelectorAll(".recipe__count"));
  for(let i = 0; i < countElements.length; i++) {
    countElements[i].textContent = formatCount(recipe.ingredients[i].count);
  }
};
