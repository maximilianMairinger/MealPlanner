import { getActiveRecipes, setRecipeDate } from "./store.js"
import { RecipeDateDomain } from "../Domain/DomainTypes.js";
import ISODate from "../../../utils/ISODate.js";

getActiveRecipes()
.then(recipes => {
   const $fuzzySearch = document.createElement("fuzzy-search")
   $fuzzySearch.dataset.limit = "10"
   $fuzzySearch.dataset.emptyMessage = "No meals available.";
   (<any>$fuzzySearch).searchList = recipes.map(x => ({ value: x.name, id: x.id.value }))
   $fuzzySearch.addEventListener("selected", selected as EventListener)

   const $main = <HTMLDivElement>document.getElementById("_main")
   if ($main) {
      $main.append($fuzzySearch)
   }
})

function selected(e: CustomEvent) {
   e.preventDefault()
   const id = +e.detail.id
   const params = new URLSearchParams(location.search);
   const recipeDate = params.get("recipeDate")
   const categoryId = params.get("categoryId")
   let catId: number | undefined
   if (categoryId && !isNaN(+categoryId)) {
      catId = +categoryId
   }
   if (!id || !recipeDate) {
      return
   }
   const data: RecipeDateDomain = {
      categoryId: { isCategoryId: true, value: catId || 1 },
      date: new ISODate(recipeDate),
      lastUpdated: Date.now(),
      quantity: 1,
      recipeId: { isRecipeId: true, value: id }
   }
   setRecipeDate([data])
}