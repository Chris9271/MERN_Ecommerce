import axios from 'axios';
import { API_URL } from '../../../utils/config';
// 取得所有商品
export const getProducts = (path) => {
    return async(dispatch) => {
        const list = await axios.get(`${API_URL}/page${path}`);
        dispatch({type: "ALL_PRODUCTS", payload: list.data});
    }
}

// 取得排序結果
export const getSort = (products, id) => {
    return (dispatch) => {
        try{
            if(id === "nameAsc"){
                const nameSort = products.sort((prev, next) => {
                    if(prev.name < next.name){
                        return -1;
                    }else{
                        return 1;
                    }
                })
                dispatch({type: "NAME_ASC", payload: nameSort});
            }else if(id === "nameDesc"){
                const nameSort = products.sort((prev, next) => {
                    if(prev.name > next.name){
                        return -1;
                    }else{
                        return 1;
                    }
                })
                dispatch({type: "NAME_DESC", payload: nameSort});
            }else if(id === "priceAsc"){
                const priceSort = products.sort((prev, next) => {
                    if(Number(prev.price) < Number(next.price)){
                        return -1;
                    }else{
                        return 1;
                    }
                })
                dispatch({type: "PRICE_ASC", payload: priceSort});
            }else if(id === "priceDesc"){
                const priceSort = products.sort((prev, next) => {
                    if(Number(prev.price) > Number(next.price)){
                        return -1;
                    }else{
                        return 1;
                    }
                })
                dispatch({type: "PRICE_DESC", payload: priceSort});
            }
        }catch(err){
            console.error(err);
        }
    }   
}

// 取得搜尋結果
export const getSearch = (value, path) => {
    return async(dispatch) => {
        const products = await axios.get(`${API_URL}/page/${path}`);
        if(products.data.filter((product) => product.name.toLowerCase().includes(value)).length > 0){
            const searchSort = products.data.filter((product) => product.name.toLowerCase().includes(value));
            dispatch({type: "SEARCH_SORT", payload: searchSort});
        }else{
            const searchSort = [];
            dispatch({type: "SEARCH_SORT", payload: searchSort});
        }
    }
}

// 過濾要搜尋的商品其價格區間
export const getPriceFilter = (prices, path) => {
    return async(dispatch) => {
        const products = await axios.get(`${API_URL}/page/${path}`);
        if(prices.min === "" && prices.max !== ""){
            const priceSort = products.data.filter((list) => Math.round(list.price * list.discount) * 30 <= Math.round(prices.max))
            dispatch({type: "MIN_INPUT_EMPTY", payload: priceSort});
        }else if(prices.max === "" && prices.min !== ""){
            const priceSort = products.data.filter((list) => Math.round(list.price * list.discount) * 30 >= Math.round(prices.min))
            dispatch({type: "MAX_INPUT_EMPTY", payload: priceSort});
        }else if(prices.min !== "" && prices.max !== ""){
            const priceSort = products.data.filter((list) => Math.round(list.price * list.discount) * 30 >= Math.round(prices.min) && Math.round(list.price * list.discount) * 30 <= Math.round(prices.max))
            dispatch({type: "BOTH_NOT_EMPTY", payload: priceSort});
        }
    }
}

// 清除排序...等
export const clearSort = () => {
    return (dispatch) => {
        dispatch({type: "CLEAR_SORTS", payload: ""})
    }
}

// 設置搜索值
export const setSearchValue = (value) => {
    return (dispatch) => {
        dispatch({type: "SET_SEARCH_VALUE", payload: value})
    }
}

// 設置最高最低價
export const getPrice = (name, value) => {
    return (dispatch) => {
        dispatch({type: "SET_PRICES", payload: {name, value}})
    }
}

// 取得單一產品
export const getProduct = (path) => {
    return async(dispatch) => {
        const product = await axios.get(`${API_URL}/page/product/${path}`);
        dispatch({type: "SINGLE_PRODUCT", payload: product.data})
    }
}

// 切換顯示商品內容或評論
export const switchDisplay = () => {
    return (dispatch) => {
        dispatch({type: "SWITCH_CONTENT"})
    }
}

// 顯示圖表的Modal
export const showChartModal = (status) => {
    return (dispatch) => {
        dispatch({type: "SHOW_CHART_MODAL", payload: status})
    }
}

// 取得使用者選擇之選項
export const getOptions = (name, value) => {
    return (dispatch) => {
        dispatch({type: "GET_OPTIONS", payload: {name, value}})
    }
}

// 切換產品頁顯示的圖片樣式
export const getProductImage = () => {
    return (dispatch) => {
        dispatch({type: "SWITCH_PRODUCT_IMAGE"})
    }
}

// 顯示商品圖片的Modal
export const showProductImageModal = (status) => {
    return (dispatch) => {
        dispatch({type: "PRODUCT_IMAGE_MODAL", payload: status})
    }
}

// 顯示另一張商品圖片的Modal
export const showProductHoverImageModal = (status) => {
    return (dispatch) => {
        dispatch({type: "PRODUCT_HOVER_IMAGE_MODAL", payload: status})
    }
}

// 調整商品頁內，需要的商品數量
export const updateQuantity = (name) => {
    return (dispatch) => {
        if(name === "add"){
            dispatch({type: "QUANTITY_PLUS"})
        }else if(name === "minus"){
            dispatch({type: "QUANTITY_MINUS"})
        }   
    }
}

// 開啟mobile版本的filter下拉選單
export const openMobileFilter = () => {
    return (dispatch) => {
        dispatch({type: "OPEN_MOBILE_FILTER"})
    }
}

// 開啟mobile版本的menu下拉選單
export const openMobileMenu = () => {
    return (dispatch) => {
        dispatch({type: "OPEN_MOBILE_MENU"})
    }
}

// 關閉mobile版本的menu下拉選單
export const closeMobileMenu = () => {
    return (dispatch) => {
        dispatch({type: "CLOSE_MOBILE_MENU"})
    }
}

// 取得用戶歷史訂單記錄
export const getOrder = (userId) => {
    return async(dispatch) => {
        const order = await axios.get(`${API_URL}/order/${userId}`, {withCredentials: true});
        dispatch({type: "SET_ORDER", payload: order.data.reverse()})
    }
}