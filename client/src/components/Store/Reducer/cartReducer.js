const initStates = {
    // Cart -> localStorage
    cartTotal: 0,
    cart: [],
    totalPrice: 0,
    itemToCart: {
        id: "",
        image: "",
        hoverImage: "",
        name: "",
        size: "",
        length: "",
        waist: "",
        color: "",
        price: 0,
        discount: 0,
        quantity: 1
    },
    userInfo: {
        name: '',
        address: '',
        phone: '',
        email: ''
    },
    cartBoolean: {
        payModal: false,
        pageSwitch: false
    }
}

const cartReducer = (state = initStates, action) => {
    switch(action.type){
        case "SINGLE_PRODUCT":
            return{
                ...state,
                itemToCart: {
                    ...state.itemToCart,
                    id: action.payload._id,
                    image: action.payload.image,
                    hoverImage: action.payload.hoverImage,
                    name: action.payload.name,
                    price: action.payload.price,
                    discount: action.payload.discount,
                    size: "",
                    color: "",
                    waist: "",
                    length: "",
                    quantity: 1
                }
            };
        case "GET_OPTIONS":
            return{
                ...state,
                itemToCart: {
                    ...state.itemToCart,
                    [action.payload.name]: action.payload.value
                }
            };
        case "QUANTITY_PLUS":
            return{
                ...state,
                itemToCart: {
                    ...state.itemToCart,
                    quantity: state.itemToCart.quantity + 1
                }
            };
        case "QUANTITY_MINUS":
            return{
                ...state,
                itemToCart: {
                    ...state.itemToCart,
                    quantity: state.itemToCart.quantity - 1
                }
            };
        case "SET_TOTAL_PRICE":
            return{
                ...state,
                totalPrice: action.payload
            };
        case "SUM_CART":
            return{
                ...state,
                cartTotal: action.payload
            };
        case "SET_CART":
            return{
                ...state,
                cart: [...action.payload]
            };
        case "SET_CART_EMPTY":
            return{
                ...state,
                cart: []
            };
        case "CLEAR_CART":
            return{
                ...state,
                cart: [],
                cartTotal: 0
            };
        case "SET_USER_INFO":
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    [action.payload.name]: action.payload.value
                }
            };
        case "BACKTO_PREV_PAGE":
            return{
                ...state,
                cartBoolean: {
                    ...state.cartBoolean,
                    pageSwitch: action.payload
                }
            };
        case "SWITCH_PAYMENT_PAGE":
            return{
                ...state,
                cartBoolean: {
                    ...state.cartBoolean,
                    pageSwitch: action.payload
                }
            };
        case "SET_PAYMENT_MODAL":
            return{
                ...state,
                cartBoolean: {
                    ...state.cartBoolean,
                    payModal: action.payload
                }
            }
        case "REMOVER_USER_INFO":
            return{
                ...state,
                userInfo: {
                    name: '',
                    address: '',
                    phone: '',
                    email: ''
                },
            }
        default:
            return state;
    }
}

export default cartReducer;