import getDB, { DatabaseType } from "../../utils/database.js"
import { Domain } from "../../utils/database-domain-types.js"
import { tryCatch } from "../../utils/fp.js"

async function createRecipe_(recipe: Domain.Recipe.Recipe) {
    const db = await getDB(["recipe"])
    let location: DatabaseType.Location
    switch (recipe.location._kind) {
        case "book":
            location = { _kind: "book", book: recipe.location.book.value, page: recipe.location.page.value }
            break
        case "url":
            location = { _kind: "url", url: recipe.location.url.value, title: recipe.location.title.value }
            break
        case "other":
            location = {_kind: "other", other: recipe.location.other.value } 
            break
    }
    const timestamp = Date.now()
    const id = await db.recipe.put({
        id: timestamp,
        name: recipe.name.value,
        location,
        categories: [1]
    })
    await db.done
    return id
}

const createRecipe = (recipe: Domain.Recipe.Recipe) => tryCatch(() => createRecipe_(recipe), String)

export {
    createRecipe
}
