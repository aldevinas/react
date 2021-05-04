module.exports = (req, res, next) => {
    const recipe = req.body

    if(recipe.title.length === 0 ||
        recipe.title.length <= 10 ||
        recipe.title.length > 100 ||
        recipe.image.length === 0 ||
        recipe.ingredients.length === 0 ||
        recipe.prep.length === 0)
    {
        res.send({error: true , msg: 'Please, fill all inputs fields. Title should have minimum 10 and maximum 100 characters. '})
    } else {
        next()
    }
}