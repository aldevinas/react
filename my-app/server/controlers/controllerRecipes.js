const recipeDb = require('../schemas/recipeSchema')

module.exports = {
    upload : async (req, res) => {

        let recipe = new recipeDb

        Object.keys(req.body).map(key => {
            recipe[key] = req.body[key]
        })
        await recipe.save()

        res.send({error: false})
    }
}