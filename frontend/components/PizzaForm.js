import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  setFormField,
  setTopping,
  setStatus,
  setError,
  resetForm,

 } from '../state/formSLice'
 import { usePostPizzaOrderMutation } from '../state/pizzaOrderApi'


// const initialFormState = { // suggested
//   fullName: '',
//   size: '',
//   '1': false,
//   '2': false,
//   '3': false,
//   '4': false,
//   '5': false,
// }
// const [formState, setFormState] = useState(initialFormState)


export default function PizzaForm() {
  const dispatch = useDispatch()
  const formState = useSelector((state) => state.form)
  const [postPizzaOrder] = usePostPizzaOrderMutation()

const handleInputChange = (event) =>{
  const {name, value} = event.target
  dispatch(setFormField({field: name, value}))
}

const handleCheckBoxesChange = (evt) => {
  const {name, checked} = evt.target;
 dispatch(setTopping({topping: name, checked}))
}

const handleSubmit = async (evt) => {
  evt.preventDefault(),
  dispatch(setStatus('pending'))

  try{
    await postPizzaOrder(formState).unwrap()
    dispatch(setStatus('succeeded'))
    dispatch(resetForm())
  } catch (error) {
    dispatch(setStatus('failed'))
    dispatch(setError(error.data.message))
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {formState.status === 'pending' && <div className='pending'>Order in progress...</div>}
      {formState.status === 'failed' && <div className='failure'>Order failed: {formState.error}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" 
          id="size" 
          name="size"
          value={formState.size}
          onChange={handleInputChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" 
          name="1" 
          type="checkbox"
          checked={formState['1']}
          onChange={handleCheckBoxesChange}
          />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" 
          name="2" 
          type="checkbox"
          checked={formState['2']}
          onChange={handleCheckBoxesChange}
          />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" 
          name="3" 
          type="checkbox"
          checked={formState['3']}
          onChange={handleCheckBoxesChange} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" 
          name="4" 
          type="checkbox"
          checked={formState['4']}
          onChange={handleCheckBoxesChange} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" 
          name="5" 
          type="checkbox"
          checked={formState['5']}
          onChange={handleCheckBoxesChange} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
