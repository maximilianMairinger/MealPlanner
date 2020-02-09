import html from '../layouts/util.js'
import _default from "../layouts/_default.html.js"
import { recipeTemplate } from './templates/recipe.html.js'
import { cancelledRecipeTemplate } from './templates/cancelled-recipe.html.js'

export interface Page {
   mealSelectionsId: "_meal-selections"
   mealPlannerDetails: {
      startDateFormId: "_start-date"
   }
}

var main = html`
   <form id="_start-date">
      <label for="start-date"> Start Date: </label>
      <input name="start-date" type="date" required />
   </form>
   <div id="_meal-selections"></div>`

var afterMain = html`
${recipeTemplate}
${cancelledRecipeTemplate}
<script src="/plan-meals/index.js" async type="module"></script>`

const page = _default({
   head: "",
   header: "Meal Planner",
   currentPage: "Plan Meals",
   main,
   afterMain,
})

console.log(page)
