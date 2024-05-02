const Storage = (cartItems) => {
    sessionStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems: []));
}

export const CartReducer = (state, action) => {

  let index = -1;
  if (action.payload)
    index = state.cartItems.findIndex(item => item.id === action.payload.id);
  
  let newItems = [...state.cartItems];

  switch (action.type) {
    case "ADD":
    case "INCQTY":
      if (index === -1) {
        //state.cartItems.push({ ...action.payload, quantity: 1 }); // BAD WAY
        newItems.push({ ...action.payload, quantity: 1 }); // GOOD WAY
      }
      else {
        //state.cartItems[index].quantity++;
        newItems[index].quantity++;
      }
      break;
  
    case "REMOVE":
      if (index > -1) {
        //state.cartItems.splice(index, 1); // BAD WAY
        newItems = state.cartItems.filter(x => x.id !== action.payload.id); // GOOD WAY
      }
      break;
       
    case "DECQTY":
      if (index > -1) {
        if (newItems[index].quantity > 1)
          //state.cartItems[index].quantity--;
          newItems[index].quantity--;
      }
      break;
    
    case "CLEAR":
      newItems = [];
      break;
      
    default:
  }

  state.cartItems = newItems;
  Storage(newItems);

  return state;
}