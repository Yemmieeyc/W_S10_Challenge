import React, { useReducer, useState } from "react";
import { useCreatePizzaOrderMutation } from "../state/orderListApi";
const initialFormState = {
  fullName: "",
  size: "",
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT": {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case "TOGGLE_TOPPING": {
      const { toppingId, checked } = action.payload;
      return { ...state, [toppingId]: checked };
    }
    case "RESET_FORM":
      return initialFormState;
    default:
      return state;
  }
};
export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const [errorMessages, setErrorMessages] = useState({});
  const [createPizzaOrder, { error, isLoading }] = useCreatePizzaOrderMutation();
  const onChange = ({ target: { name, value } }) => {
    dispatch({ type: "CHANGE_INPUT", payload: { name, value } });
  };
  const toggleTopping = ({ target: { name, checked } }) => {
    dispatch({ type: "TOGGLE_TOPPING", payload: { toppingId: name, checked } });
  };
  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
    setErrorMessages({});
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { fullName, size } = state;
    if (!fullName.trim() || !size.trim()) {
      // Handle form validation error
      // return;
    }
    const toppings = Object.keys(state)
      .filter((key) => ["1", "2", "3", "4", "5"].includes(key) && state[key])
      .map((key) => parseInt(key));
    createPizzaOrder({ fullName, size, toppings })
      .unwrap()
      .then((data) => {
        console.log("Order created:", data);
        resetForm();
      })
      .catch((err) => {
        console.error("Error creating order:", err);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress...</div>}
      {error && <div className="failure">Order failed: {error.data.message}</div>}
      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input data-testid="fullNameInput" id="fullName" name="fullName" placeholder="Type full name" type="text" value={state.fullName} onChange={onChange} />
        </div>
      </div>
      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select data-testid="sizeSelect" id="size" name="size" value={state.size} onChange={onChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>
      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={state["1"]} onChange={toggleTopping} />
          Pepperoni
          <br />
        </label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={state["2"]} onChange={toggleTopping} />
          Green Peppers
          <br />
        </label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={state["3"]} onChange={toggleTopping} />
          Pineapple
          <br />
        </label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={state["4"]} onChange={toggleTopping} />
          Mushrooms
          <br />
        </label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={state["5"]} onChange={toggleTopping} />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}



// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { 
//   setFormField,
//   setTopping,
//   setStatus,
//   setError,
//   resetForm,

//  } from '../state/orderListSlice'
//  import { usePostPizzaOrderMutation } from '../state/OrderListApi'


// // const initialFormState = { // suggested
// //   fullName: '',
// //   size: '',
// //   '1': false,
// //   '2': false,
// //   '3': false,
// //   '4': false,
// //   '5': false,
// // }
// // const [formState, setFormState] = useState(initialFormState)


// export default function PizzaForm() {
//   const dispatch = useDispatch()
//   const formState = useSelector((state) => state.form)
//   const [postPizzaOrder] = usePostPizzaOrderMutation()

// const handleInputChange = (event) =>{
//   const {name, value} = event.target
//   dispatch(setFormField({field: name, value}))
// }

// const handleCheckBoxesChange = (evt) => {
//   const {name, checked} = evt.target;
//  dispatch(setTopping({topping: name, checked}))
// }

// const handleSubmit = async (evt) => {
//   evt.preventDefault(),
//   dispatch(setStatus('pending'))

//   try{
//     await postPizzaOrder(formState).unwrap()
//     dispatch(setStatus('succeeded'))
//     dispatch(resetForm())
//   } catch (error) {
//     dispatch(setStatus('failed'))
//     dispatch(setError(error.data.message))
//   }
// }

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Pizza Form</h2>
//       {formState.status === 'pending' && <div className='pending'>Order in progress...</div>}
//       {formState.status === 'failed' && <div className='failure'>Order failed: {formState.error}</div>}

//       <div className="input-group">
//         <div>
//           <label htmlFor="fullName">Full Name</label><br />
//           <input
//             data-testid="fullNameInput"
//             id="fullName"
//             name="fullName"
//             placeholder="Type full name"
//             type="text"
//             value={formState.fullName}
//             onChange={handleInputChange}
//           />
//         </div>
//       </div>

//       <div className="input-group">
//         <div>
//           <label htmlFor="size">Size</label><br />
//           <select data-testid="sizeSelect" 
//           id="size" 
//           name="size"
//           value={formState.size}
//           onChange={handleInputChange}
//           >
//             <option value="">----Choose size----</option>
//             <option value="S">Small</option>
//             <option value="M">Medium</option>
//             <option value="L">Large</option>
//           </select>
//         </div>
//       </div>

//       <div className="input-group">
//         <label>
//           <input data-testid="checkPepperoni" 
//           name="1" 
//           type="checkbox"
//           checked={formState['1']}
//           onChange={handleCheckBoxesChange}
//           />
//           Pepperoni<br /></label>
//         <label>
//           <input data-testid="checkGreenpeppers" 
//           name="2" 
//           type="checkbox"
//           checked={formState['2']}
//           onChange={handleCheckBoxesChange}
//           />
//           Green Peppers<br /></label>
//         <label>
//           <input data-testid="checkPineapple" 
//           name="3" 
//           type="checkbox"
//           checked={formState['3']}
//           onChange={handleCheckBoxesChange} />
//           Pineapple<br /></label>
//         <label>
//           <input data-testid="checkMushrooms" 
//           name="4" 
//           type="checkbox"
//           checked={formState['4']}
//           onChange={handleCheckBoxesChange} />
//           Mushrooms<br /></label>
//         <label>
//           <input data-testid="checkHam" 
//           name="5" 
//           type="checkbox"
//           checked={formState['5']}
//           onChange={handleCheckBoxesChange} />
//           Ham<br /></label>
//       </div>
//       <input data-testid="submit" type="submit" />
//     </form>
//   )
// }
