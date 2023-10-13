import React from 'react';
import './App.css';


function App() {
  const info = JSON.parse(localStorage.getItem("info"));
  const myInfo = info ? info : [];
  const display = JSON.parse(localStorage.getItem("display"));
  const myDisplay = display ? display : {};
  const [data, setData] = React.useState([]);
  const [localData, setLocalData] = React.useState(myInfo);
  const [show, setShow] = React.useState(myDisplay);
  const [recipe, setRecipe] = React.useState('');
  const [ingredients, setIngredients] = React.useState('');
  const [directions, setDirections] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!recipe || !ingredients || !directions) alert('Please fill in all fields');
    else{
      const id = Math.ceil((Date.now() * Math.random()) + 1);
      setLocalData([...localData,  {recipe, ingredients, directions, id}]);
      setShow({recipe, ingredients, directions, id});
      setRecipe('');
      setIngredients('');
      setDirections('');
      setShowForm(false);
    }
  }

  React.useEffect(() =>{
    localStorage.setItem("info", JSON.stringify(localData));
  }, [localData])
  React.useEffect(() =>{
    localStorage.setItem("display", JSON.stringify(show));
  }, [show]);
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
    if (!recipe || !ingredients || !directions) alert('Please fill in all fields');
    else{
      const toBeUpdated = localData.concat([]);

      toBeUpdated.map((item) =>{
        if(item.id == editId){
          item.recipe = recipe;
          item.ingredients = ingredients;
          item.directions = directions;
          setShow(item)
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

  const handleClose = () =>{
    setShowForm(false);
    setIsEdit(false);
    setRecipe('');
    setIngredients('');
    setDirections('');
    setEditId('');
  }

  const ingr = Object.keys(show).length > 0 ? show?.ingredients.split('/') : [];
  const dir = Object.keys(show).length > 0 ? show?.directions.split('/') : [];
  const keys = Object.keys(show).length > 0 ? Object.keys(show) : [];
  return (
    <div className="container">
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
            <button type='button' className='close-btn' onClick={handleClose}>Close</button>
          </div>
        </form>
      </div>

      <p className='recipe-box'>Recipe Box</p>
      <div className='recipe-names'>
        <table>
          <tbody>
            {localData.map((item, i) =>{
              return (
                <tr key={i}>
                  <td onClick={(e) => setShow(item)} id ={item.id}>{item.recipe}</td>
                </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      
      <div className='recipe-details'>
        <div className='recipe-details-header'>
          <span>{show?.recipe}</span> 
          <button className={Object.keys(show).length > 0 ? 'delete-btn' : 'hide-btn'} onClick={handleDelete} id={show?.id} type='button'>Delete</button>
          <button type='button' onClick={handleEdit} id={show?.id} className={Object.keys(show).length > 0 ? 'edit-btn' : 'hide-btn'}>Edit</button>
        </div>
        <div className='details-container'>
          <p>{keys[1]}</p>
          <ul>
            {ingr.map((item, i) =>{
            return(
                <li key={i}>{item}</li>
            )
          })}
          </ul>
          
          <p>{keys[2]}</p>
          <ol>
            {dir.map((item, i) =>{
            return(
                <li key={i}>{item}</li>
            )
          })}
          </ol>
        </div>
        <div className='create-btn-container'>
          <button type='button' className='create-btn' onClick={() => setShowForm(true)}>Create recipe</button>
        </div>
      </div>
    </div>
  );
}

export default App;
