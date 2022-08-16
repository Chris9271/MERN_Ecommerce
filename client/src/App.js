import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Sale from './components/Pages/Sale';
import New from './components/Pages/New';
import Accessory from './components/Pages/Accessory';
import Men from './components/Pages/Men';
import Women from './components/Pages/Women';
import Home from './components/Pages/Home';
import Product from './components/Pages/Product';
import SignIn from './components/Pages/SignIn';
import Cart from './components/Pages/Cart';
import ResetPassword from './components/Pages/ResetPassword';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Order from './components/Pages/Order';
import {connect, useSelector} from 'react-redux';
import {getCartItem} from './components/Store/Action/cart';
import {getLoginUser} from './components/Store/Action/auth';
import { API_URL } from './utils/config';
import axios from 'axios';
import './App.scss';

const App = ({setUser, getLocalStorage}) => {

  const {authBoolean} = useSelector(state => state.auth);

  useEffect(() => {
    (async() => {
      try{
        const loginUser = await axios.get(`${API_URL}/auth`, {withCredentials: true})
        if(loginUser.data.message === "authenticated" && loginUser.data.code === 20000){
          setUser(loginUser.data.user)
        }
        const cartList = localStorage.getItem('cartList');
        if(cartList){
          getLocalStorage(cartList)
        }else{
          localStorage.setItem('cartList', JSON.stringify([]))
        }
      }catch(err){
        console.error(err);
      }
    })()
  }, [authBoolean.isLogin])

  // useEffect(() => {
  //   // 檢查localStorage是否已有商品，有的話將其加入state中，沒有則建立一個新的localStorage
  //   const cartList = localStorage.getItem('cartList');
  //   if(cartList){
  //     getLocalStorage(cartList)
  //   }else{
  //     localStorage.setItem('cartList', JSON.stringify([]))
  //   }
  // }, [])

  return (
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/sale" render={({match}) => 
              <>
                <Sale match={match}/>
              </>
            }/>
            <Route path="/new" render={({match}) => 
              <>
                <New match={match}/>
              </>
            }/>
            <Route path="/accessory" render={({match}) => 
              <>
                <Accessory match={match}/>
              </>
            }/>
            <Route path="/men"  render={({match}) => 
              <>
                <Men match={match}/>
              </>
            }/>
            <Route path="/women"  render={({match}) => 
              <>
                <Women match={match}/>
              </>
            }/>
            <Route path="/cart" component={Cart}/>
            <Route path="/order/:userId" render={({match}) => 
              <>
                <Order match={match}/>
              </>}
            />
            <Route path="/sign" component={SignIn}/>
            <Route path="/product/:id" render={({match}) => 
              <>
                <Product match={match}/>
              </>}
            />
            <Route path="/reset/:resetString" render={({match}) => 
              <>
                <ResetPassword match={match}/>
              </>}
            />
          </Switch>
        <Footer/>
      </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch) => {
  return{
    setUser: (id) => dispatch(getLoginUser(id)),
    getLocalStorage: (cartList) => dispatch(getCartItem(cartList))
  }
}

export default connect(null, mapDispatchToProps)(App);
