import {useState, useRef} from 'react'

function UploadRecipe() {

    const [recipe, setRecipe] = useState({
        title: '',
        image: [],
        ingredients: [],
        prep: []
    })
    const [errorMsg, setErrorMsg] = useState('')

    const title = useRef()
    const image = useRef()
    const ingredient = useRef()
    const amount = useRef()
    const prep = useRef()


    function setTitle() {
        const name = title.current.value
        setRecipe(recipe => ({
            ...recipe,
            title: name
        }))
    }

    function addImage() {
        let value = image.current.value

        const currentArr = recipe.image
        currentArr.push(value)

        setRecipe(recipe => ({
            ...recipe,
            image: currentArr
        }))
        image.current.value = null
    }

    function addIngredient() {
        let value = ingredient.current.value
        let value2 = amount.current.value

        const currentArr = recipe.ingredients
        currentArr.push({ingredient: value, amount: value2})

        setRecipe(recipe => ({
            ...recipe,
            ingredients: currentArr
        }))

        ingredient.current.value = null
        amount.current.value = null
    }

    function addPrep() {
        let value = prep.current.value

        const currentArr = recipe.prep
        currentArr.push(value)

        setRecipe(recipe => ({
            ...recipe,
            prep: currentArr
        }))

        prep.current.value = null
    }

    function submit() {
        console.log(recipe)
        fetch('http://localhost:4000/upload', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setErrorMsg(data.msg)
                }
                title.current.value = null
            })
    }

    return (
        <div className='d-flex-center bg'>
            <div className="NewRecipeCard d-flex-center">
                <h3>Make your recipe</h3>
                <input ref={title} type='text' placeholder='Recipe title' onChange={setTitle}/>
                <input ref={image} type='text' placeholder='Recipe image url'/>
                <div className='btn' onClick={addImage}>Add image</div>
                <input ref={ingredient} type='text' placeholder='Ingredient'/>
                <input ref={amount} type='text' placeholder='Quantity'/>
                <div className='btn' onClick={addIngredient}>+ Add ingredient</div>
                <input ref={prep} type='text' placeholder='Preparation step by step'/>
                <div className='btn' onClick={addPrep}>+ Add step</div>
                <small style={{color: 'darkred'}}>{errorMsg}</small>
                <div onClick={submit} className='submit'>POST RECIPE</div>
            </div>

            <div className="NewRecipeCard d-flex-center">
                <h3>{recipe.title}</h3>
                <img className='imageMain' src={recipe.image[0]} alt=""/>
                <div className='images'>
                    {recipe.image.map((item, i) => i !== 0 ? <img src={item} alt="" key={i}/> : null)}
                </div>
                <ul>
                    {recipe.ingredients.map((item, i) => <li key={i}>{item.ingredient}, {item.amount}</li>)}
                </ul>
                <ol>
                    {recipe.prep.map((item, i) => <li key={i}>{item}</li>)}
                </ol>
            </div>
        </div>
    );
}

export default UploadRecipe;