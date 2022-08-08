const initStates = {
    // Products
    products: [],
    searchValue: "",
    price: {
        min: "",
        max: ""
    },
    // Product
    item: [],
    // Order
    orders: [],
    pageBoolean: {
        showProductImage: false,
        showProductImageModal: false,
        showProductHoverImageModal: false,
        isLoading: false,
        showProductComment: false,
        cancelSelect: false,
        showChartModal: false,
        closeMobileMenu: false,
        showMobileMenu: false
    }
}

const pageReducer = (state = initStates, action) => {
    switch(action.type){
        case "ALL_PRODUCTS":
            return {
                ...state,
                pageBoolean: {
                    ...state.pageBoolean,
                    isLoading: true,
                },
                products: [...action.payload],
                item: []
            };
        case "NAME_ASC": 
        case "NAME_DESC":
        case "PRICE_ASC":
        case "PRICE_DESC":
            return {
                ...state,
                pageBoolean: {
                    ...state.pageBoolean,
                    cancelSelect: true,
                    closeMobileMenu: false
                },
                products: [...action.payload]
            };
        case "SEARCH_SORT":
            return {
                ...state,
                price: {
                    min: "",
                    max: ""
                },
                pageBoolean: {
                    ...state.pageBoolean,
                    cancelSelect: false,
                    closeMobileMenu: false
                },
                products: [...action.payload]
            };
        case "MIN_INPUT_EMPTY":
        case "MAX_INPUT_EMPTY":
        case "BOTH_NOT_EMPTY":
            return{
                ...state,
                searchValue: "",
                pageBoolean: {
                    ...state.pageBoolean,
                    cancelSelect: false,
                    closeMobileMenu: false
                },
                products: [...action.payload]
            };
        case "CLEAR_SORTS":
            return{
                ...state,
                pageBoolean: {
                    ...state.pageBoolean,
                    cancelSelect: false,
                    closeMobileMenu: false
                },
                searchValue: "",
                price: {
                    min: "",
                    max: ""
                },
            };
        case "SET_SEARCH_VALUE":
            return{
                ...state,
                searchValue: action.payload
            };
        case "SET_PRICES":
            return{
                ...state,
                price: {
                    ...state.price,
                    [action.payload.name]: action.payload.value
                }
            };
            // 處理該如何將cart分拆出來
        case "SINGLE_PRODUCT":
            return{
                ...state,
                item: [action.payload],
            };
        case "SWITCH_CONTENT":
            return{
                ...state,
                pageBoolean: {
                    ...state.pageBoolean,
                    showProductComment: !state.pageBoolean.showProductComment
                }
            };
        case "SHOW_CHART_MODAL":
            return{
                ...state,
                pageBoolean: {
                    ...state.pageBoolean,
                    showChartModal: action.payload
                }
            }
        case "SWITCH_PRODUCT_IMAGE":
            return{
                ...state,
                pageBoolean: {
                    ...state.pageBoolean,
                    showProductImage: !state.pageBoolean.showProductImage
                }
            }
        case "PRODUCT_IMAGE_MODAL":
            return{
                ...state,
                pageBoolean: {
                    ...state.pageBoolean,
                    showProductImageModal: action.payload
                }
            }
        case "PRODUCT_HOVER_IMAGE_MODAL":
            return{
                ...state,
                pageBoolean: {
                    ...state.pageBoolean,
                    showProductHoverImageModal: action.payload
                }
            };
        case "OPEN_MOBILE_FILTER":
            return{
                ...state,
                pageBoolean: {
                    ...state.pageBoolean,
                    closeMobileMenu: !state.pageBoolean.closeMobileMenu
                }
            }
        case "OPEN_MOBILE_MENU":
            return{
                ...state,
                pageBoolean: {
                    ...state.pageBoolean,
                    showMobileMenu: !state.pageBoolean.showMobileMenu
                }
            }
        case "CLOSE_MOBILE_MENU":
            return{
                ...state,
                pageBoolean: {
                    ...state.pageBoolean,
                    showMobileMenu: false
                }
            }
        case "SET_ORDER":
            return {
                ...state,
                orders: [...action.payload]
            }
        default:
            return state
    }
}

export default pageReducer;