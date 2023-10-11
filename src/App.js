import React from 'react';
import './App.css';

const arr = [
  
  { recipe: 'rice', ingredients: 'fish for rice', directions: 'cook well', id: 0},
  { recipe: 'beans', ingredients: 'meat for beans', directions: 'add beans', id: 1},
  { recipe: 'yam', ingredients: 'oil for yam stew', directions: 'fry yam stew', id: 2},
  { recipe: 'soup', ingredients: 'meat for soup', directions: 'cook soup', id: 3}
]

function App() {
  // localStorage.setItem("info", JSON.stringify([]));
  const info = JSON.parse(localStorage.getItem("info"))
  const myInfo = info ? info : [];
  const [data, setData] = React.useState([]);
  const [localData, setLocalData] = React.useState(myInfo);
  const [show, setShow] = React.useState(localData[0]);
  const [recipe, setRecipe] = React.useState('');
  const [ingredients, setIngredients] = React.useState('');
  const [directions, setDirections] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    const id = Math.ceil((Date.now() * Math.random()) + 1);
    // setData([...localData, {recipe, ingredients, directions, id}])
    // there will be a temporary state tha will render in the UI immediately before local storage is updated. 
    // This temp state should also be used to update the local storage, because if someone add stuff multiple times 
    // without refreshing page the localData wont be updated
    setLocalData([...localData,  {recipe, ingredients, directions, id}])
    
    // localStorage.setItem("info", JSON.stringify([...localData, {recipe, ingredients, directions, id}]));
    // arr.push({recipe, ingredients, directions, id});
  }

  React.useEffect(() =>{
    localStorage.setItem("info", JSON.stringify(localData));
  }, [localData])
  const handleRecipe = (e) =>{
   setRecipe(e.target.value);
  }
  const handleIng = (e) =>{
   setIngredients(e.target.value);
  }
  const handleDir = (e) =>{
   setDirections(e.target.value)
  }
  
  const handleDelete = (e) =>{
    const _id = e.target.id;
    const updated = localData.filter((item) => item.id != _id)
    setLocalData(updated);
    setShow(localData[0]);
  }

  const handleEdit = (e) =>{
    setIsEdit(true);
    const _id = e.target.id;
    setEditId(_id);
    localData.map((item) =>{
      if (item.id == _id){
        setRecipe(item.recipe);
        setDirections(item.directions);
        setIngredients(item.ingredients);
      }
    })
  }

  const submitEdit = (e) =>{
    e.preventDefault()
    const toBeUpdated = localData.concat([]);

    toBeUpdated.map((item) =>{
      if(item.id == editId){
        item.recipe = recipe;
        item.ingredients = ingredients;
        item.directions = directions;
      }
    })
    console.log(toBeUpdated, 'tobe')
    setLocalData(toBeUpdated);
    setRecipe('');
    setIngredients('');
    setDirections('');
    setEditId('');
    setIsEdit(false);
  }

  return (
    <div className="container">
      {/* {console.log(recipe, ingredients, directions)} */}
      {/* {console.log(localData, 'myinfo')} */}
      <form onSubmit={handleSubmit}>
        <label id='recipe'>Recipe</label>
        <input onChange={handleRecipe} type='text' value={recipe} />
        <label id='ingredients'>Ingredients</label>
        <textarea onChange={handleIng} id='ingredients' value={ingredients} />
        <label id='directions'>Directions</label>
        <textarea onChange={handleDir} id='directions' value={directions} />
        {isEdit ? <button onClick={submitEdit} type='button'>Submit</button> : <button type='submit'>Add</button>}
      </form>
      {localData.map((item) =>{
        return (
          <p key={item.id} onClick={(e) => setShow(item)} id ={item.id}>{item.recipe}</p>
        )
      })}
      
      <div>
        <p>
          {show.recipe} <button onClick={handleDelete} id={show.id} type='button'>Del</button>
          <button type='button' onClick={handleEdit} id={show.id}>Edit</button>
        </p>
        {show.ingredients}, {show.directions}
      </div>
    </div>
  );
}

export default App;
