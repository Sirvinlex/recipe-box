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
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!recipe || !ingredients || !directions) alert('Please fill all fields');
    else{
      const id = Math.ceil((Date.now() * Math.random()) + 1);
      setLocalData([...localData,  {recipe, ingredients, directions, id}]);
      if(localData.length === 0) setShow({recipe, ingredients, directions, id});
      setRecipe('');
      setIngredients('');
      setDirections('');
    }
  }

  React.useEffect(() =>{
    localStorage.setItem("info", JSON.stringify(localData));
    // if(localData.length === 1) setShow(localData[0]);
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
    setShow({});
  }
  // const set = () => setShow(localData[0])
  const handleEdit = (e) =>{
    setShowForm(true);
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
    e.preventDefault();
    if (!recipe || !ingredients || !directions) alert('Please fill all fields');
    else{
      const toBeUpdated = localData.concat([]);

      toBeUpdated.map((item) =>{
        if(item.id == editId){
          item.recipe = recipe;
          item.ingredients = ingredients;
          item.directions = directions;
        }
      })
      setLocalData(toBeUpdated);
      setRecipe('');
      setIngredients('');
      setDirections('');
      setEditId('');
      setIsEdit(false);
      setShowForm(false);
    }
  }

  const displayedItem = show ? show : {};
  const ingr = Object.keys(displayedItem).length > 0 ? show?.ingredients.split('/') : [];
  const dir = Object.keys(displayedItem).length > 0 ? show?.directions.split('/') : [];
  const keys = Object.keys(displayedItem).length > 0 ? Object.keys(show) : [];
  return (
    <div className="container">
       {/* {console.log(show, 'show', displayedItem)} */}
      <div className={showForm ? 'form-container' : 'hide-form'}>
        <form className='form' onSubmit={handleSubmit}>
          <label id='recipe'>Recipe</label>
          <input className='input' placeholder='Recipe name' onChange={handleRecipe} type='text' value={recipe} />
          <label id='ingredients'>Ingredients</label>
          <textarea className='text-area1' placeholder='Separate each ingredient with a "/": Oil / pepper / tomatoes' onChange={handleIng} id='ingredients' value={ingredients} />
          <label id='directions'>Directions</label>
          <textarea className='text-area2' placeholder='Separate each step with a "/": Add two spoons of powdered pepper. / Add 10ml of oil. ' onChange={handleDir} id='directions' value={directions} />
          <div className='btn-container'>
            {isEdit ? <button onClick={submitEdit} type='button' className='submit-btn'>Submit</button> : <button type='submit' className='add-btn'>Add</button>}
            <button type='button' className='close-btn' onClick={() => setShowForm(false)}>Close</button>
          </div>
        </form>
      </div>

      {/* <div> */}
      <div className='recipe-names'>
        <table>
          <tbody>
            {localData.map((item) =>{
              return (
                // <p key={item.id} onClick={(e) => setShow(item)} id ={item.id}>{item.recipe}</p>
                <tr key={item.id}>
                  <td onClick={(e) => setShow(item)} id ={item.id}>{item.recipe}</td>
                </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      
      <div className='recipe-details'>
        <div className='recipe-details-header'>
          <span>{show?.recipe}</span> <button onClick={handleDelete} id={show?.id} type='button'>Del</button>
          <button type='button' onClick={handleEdit} id={show?.id}>Edit</button>
        </div>
        {/* {show?.ingredients}, {show?.directions}  */}
        <div className='details-container'>
          <p>{keys[1]}</p>
          <ul>
            {ingr.map((item) =>{
            return(
                <li key={item}>{item}</li>
            )
          })}
          </ul>
          
          <p>{keys[2]}</p>
          <ol>
            {dir.map((item) =>{
            return(
                <li key={item}>{item}</li>
            )
          })}
          </ol>
        </div>
        <div className='create-btn-container'>
          <button type='button' className='create-btn' onClick={() => setShowForm(true)}>Create</button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default App;
