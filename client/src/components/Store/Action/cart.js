// 取得LocalStorage購物車中所有商品
export const localStorageCart = (itemToCart) => {
    // 商品加進購物車沒有立即渲染商品跟數量
    return (dispatch) => {
        // total 需要另外計算
        const cart = JSON.parse(localStorage.getItem('cartList'));
        // const productIndex = cart.findIndex((product) => product.id);
        const sizeIndex = cart.findIndex(product => product.id === itemToCart.id && product.size === itemToCart.size);
        const colorIndex = cart.findIndex(product => product.id === itemToCart.id && product.color === itemToCart.color);
        const waistIndex = cart.findIndex(product => product.id === itemToCart.id && product.waist === itemToCart.waist);
        const lengthIndex = cart.findIndex(product => product.id === itemToCart.id && product.length === itemToCart.length);
        
        if(cart.length > 0){
            if(sizeIndex === -1 || colorIndex === -1 || waistIndex === -1 || lengthIndex === -1){
                const newCart = [...cart, itemToCart]
                localStorage.setItem('cartList', JSON.stringify(newCart))
                const sumTotal = newCart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                const sumQuantity = newCart.reduce((prev, next) => {
                    return {
                        quantity: prev.quantity + next.quantity
                    }
                }, {quantity: 0})
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
                dispatch({type: "SUM_CART", payload: sumQuantity.quantity})
            }else if(sizeIndex >= 0){
                cart[sizeIndex].quantity += 1;
                localStorage.setItem('cartList', JSON.stringify(cart));
                const sumTotal = cart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                const sumQuantity = cart.reduce((prev, next) => {
                    return {
                        quantity: prev.quantity + next.quantity
                    }
                }, {quantity: 0})
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
                dispatch({type: "SUM_CART", payload: sumQuantity.quantity})
            }else if(colorIndex >= 0){
                cart[colorIndex].quantity += 1;
                localStorage.setItem('cartList', JSON.stringify(cart));
                const sumTotal = cart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                const sumQuantity = cart.reduce((prev, next) => {
                    return {
                        quantity: prev.quantity + next.quantity
                    }
                }, {quantity: 0})
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
                dispatch({type: "SUM_CART", payload: sumQuantity.quantity})
            }else if(waistIndex >= 0){
                cart[waistIndex].quantity += 1;
                localStorage.setItem('cartList', JSON.stringify(cart));
                const sumTotal = cart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                const sumQuantity = cart.reduce((prev, next) => {
                    return {
                        quantity: prev.quantity + next.quantity
                    }
                }, {quantity: 0})
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
                dispatch({type: "SUM_CART", payload: sumQuantity.quantity})
            }else if(lengthIndex >= 0){
                cart[lengthIndex].quantity += 1;
                localStorage.setItem('cartList', JSON.stringify(cart));
                const sumTotal = cart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                const sumQuantity = cart.reduce((prev, next) => {
                    return {
                        quantity: prev.quantity + next.quantity
                    }
                }, {quantity: 0})
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
                dispatch({type: "SUM_CART", payload: sumQuantity.quantity})
            }
        }else{
            const newCart = [...cart, itemToCart]
            localStorage.setItem('cartList', JSON.stringify(newCart))
            const sumTotal = newCart.reduce((prev, next) => {
                return prev + Math.round(next.quantity * next.discount * next.price) * 30
            }, 0)
            const sumQuantity = newCart.reduce((prev, next) => {
                return {
                    quantity: prev.quantity + next.quantity
                }
            }, {quantity: 0})
            dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            dispatch({type: "SUM_CART", payload: sumQuantity.quantity})
        }
    }
}

// 取得LocalStorage中所有商品
export const getCartItem = () => {
    return async(dispatch) => {
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartList'));
        if(cartFromLocalStorage.length !== 0){
            const sumAmount = cartFromLocalStorage.reduce((prev, next) => {
                return{
                    quantity: prev.quantity + next.quantity
                }
            }, {quantity: 0})
            const sumTotal = cartFromLocalStorage.reduce((prev, next) => {
                return prev + Math.round(next.quantity * next.price * next.discount) * 30
            }, 0);
            dispatch({type: "SET_CART", payload: cartFromLocalStorage})
            dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            dispatch({type: "SUM_CART", payload: sumAmount.quantity})
        }
        else{
            dispatch({type: "SET_CART_EMPTY"})
        }
    }
}

// 在Cart頁面調整數量(+1)
export const cartQuantityPlus = (item) => {
    return async(dispatch) => {
        // 根據id, size, color, waist, length...等來增加localStorage相應數量
        // total 需要另外計算
        const cart = JSON.parse(localStorage.getItem('cartList'));
        // const productIndex = cart.findIndex((product) => product.id);
        const sizeIndex = cart.findIndex(product => product.id === item.id && product.size === item.size);
        const colorIndex = cart.findIndex(product => product.id === item.id && product.color === item.color);
        const waistIndex = cart.findIndex(product => product.id === item.id && product.waist === item.waist);
        const lengthIndex = cart.findIndex(product => product.id === item.id && product.length === item.length);
        
        if(cart.length > 0){
            if(sizeIndex === -1 || colorIndex === -1 || waistIndex === -1 || lengthIndex === -1){
                const newCart = [...cart, item]
                localStorage.setItem('cartList', JSON.stringify(newCart))
                const sumTotal = newCart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            }else if(sizeIndex >= 0){
                cart[sizeIndex].quantity += 1;
                localStorage.setItem('cartList', JSON.stringify(cart));
                const sumTotal = cart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            }else if(colorIndex >= 0){
                cart[colorIndex].quantity += 1;
                localStorage.setItem('cartList', JSON.stringify(cart));
                const sumTotal = cart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            }else if(waistIndex >= 0){
                cart[waistIndex].quantity += 1;
                localStorage.setItem('cartList', JSON.stringify(cart));
                const sumTotal = cart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            }else if(lengthIndex >= 0){
                cart[lengthIndex].quantity += 1;
                localStorage.setItem('cartList', JSON.stringify(cart));
                const sumTotal = cart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            }
        }
    }
}

// 在Cart頁面調整數量(-1)
export const cartQuantityMinus = (item) => {
    return async(dispatch) => {
        // total 需要另外計算
        const cart = JSON.parse(localStorage.getItem('cartList'));
        // const productIndex = cart.findIndex((product) => product.id);
        const sizeIndex = cart.findIndex(product => product.id === item.id && product.size === item.size);
        const colorIndex = cart.findIndex(product => product.id === item.id && product.color === item.color);
        const waistIndex = cart.findIndex(product => product.id === item.id && product.waist === item.waist);
        const lengthIndex = cart.findIndex(product => product.id === item.id && product.length === item.length);
        
        if(cart.length > 0){
            if(sizeIndex === -1 || colorIndex === -1 || waistIndex === -1 || lengthIndex === -1){
                const newCart = [...cart, item]
                localStorage.setItem('cartList', JSON.stringify(newCart))
                const sumTotal = newCart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            }else if(sizeIndex >= 0){
                cart[sizeIndex].quantity -= 1;
                localStorage.setItem('cartList', JSON.stringify(cart));
                const sumTotal = cart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            }else if(colorIndex >= 0){
                cart[colorIndex].quantity -= 1;
                localStorage.setItem('cartList', JSON.stringify(cart));
                const sumTotal = cart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            }else if(waistIndex >= 0){
                cart[waistIndex].quantity -= 1;
                localStorage.setItem('cartList', JSON.stringify(cart));
                const sumTotal = cart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            }else if(lengthIndex >= 0){
                cart[lengthIndex].quantity -= 1;
                localStorage.setItem('cartList', JSON.stringify(cart));
                const sumTotal = cart.reduce((prev, next) => {
                    return prev + Math.round(next.quantity * next.discount * next.price) * 30
                }, 0)
                dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
            }
        }
    }
}

// 在Cart頁面移除指定商品，同時也從購物車中移除
export const removeItem = (item) => {
    return async(dispatch) => {
        const {size, color, waist, length, id} = item;
        const getCart = JSON.parse(localStorage.getItem('cartList'))
        // 新的cart只留下，商品id相同或不同且size,color,waist or length, size or color與要刪除的不同之商品
        const newCart = getCart.filter((item) => (item.id === id || item.id !== id) && (item.size !== size || item.color !== color || (item.waist !== waist || item.length !== length) || (item.size !== size || item.color !== color)))
        localStorage.setItem('cartList', JSON.stringify(newCart))
        const sumAmount = newCart.reduce((prev, next) => {
            return{
                quantity: prev.quantity + next.quantity
            }
        }, {quantity: 0})
        const sumTotal = newCart.reduce((prev, next) => {
            return prev + Math.round(next.quantity * next.price * next.discount) * 30
        }, 0);
        dispatch({type: "UPDATED_CART", payload: newCart})
        dispatch({type: "SET_TOTAL_PRICE", payload: sumTotal})
        dispatch({type: "SUM_CART", payload: sumAmount.quantity})
    }
}

// 清空localStorage的購物車以及清除用戶輸入訊息
export const removeAll = () => {
    return async(dispatch) => {
        localStorage.setItem('cartList', JSON.stringify([]))
        dispatch({type: "CLEAR_CART"});
        dispatch({type: "REMOVER_USER_INFO"})
    }
}

// 取得結帳時用戶訊息
export const userInfo = (name, value) => {
    return (dispatch) => {
        dispatch({type: "SET_USER_INFO", payload: {name, value}})
    }
}

// 回到輸入用戶資訊頁
export const backToPrevPage = (status) => {
    return (dispatch) => {
        dispatch({type: "BACKTO_PREV_PAGE", payload: status})
    }
}

// 輸入完用戶資訊後進到下一頁
export const switchPaymentPage = (status) => {
    return (dispatch) => {
        dispatch({type: "SWITCH_PAYMENT_PAGE", payload: status})
    }
}

// 設定付款資訊輸入的區塊(顯示/不顯示)
export const paymentModal = (status) => {
    return (dispatch) => {
        dispatch({type: "SET_PAYMENT_MODAL", payload: status})
    }
}