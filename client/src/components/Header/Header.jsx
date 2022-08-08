import React from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector, connect} from 'react-redux';
import LOGO from '../../images/logo1.png';
import {openMobileMenu, closeMobileMenu} from '../Store/Action/page';
import {getLogoutUser} from '../Store/Action/auth';

const Header = ({displayMobileMenu, changeMobilePage, userLogout}) => {
    const {pageBoolean} = useSelector(state => state.page);
    const {authBoolean, userId} = useSelector(state => state.auth);
    const {cartTotal} = useSelector(state => state.cart);
    
    return (
        <>
        <div className="l-header container-fluid">
            <div className="c-logo">
                <NavLink to="/">
                    <img src={LOGO} alt="logo" className="c-logo__img"/>
                </NavLink>
                <div className="c-links">
                    <ul className="c-links__list">
                        <li className="c-links__link"> 
                            <NavLink to="/men">
                                Men
                            </NavLink>
                        </li>
                        <li className="c-links__link"> 
                            <NavLink to="/women">
                                Women
                            </NavLink>
                        </li>
                        <li className="c-links__link"> 
                            <NavLink to="/accessory">
                                Accessory
                            </NavLink>
                        </li>
                        <li className="c-links__link"> 
                            <NavLink to="/sale">
                                Sale
                            </NavLink>
                        </li>
                        {authBoolean.isLogin &&
                            <li className="c-links__link"> 
                                <NavLink to={`/order/user?id=${userId}`}>
                                    Order
                                </NavLink>
                            </li>
                        }
                    </ul>
                </div>
            </div>
            <div className="c-icons">
                <ul className="c-icons__list">
                    {!authBoolean.isLogin ? 
                        <li className="c-icons__link"> 
                            <NavLink to="/sign">
                                <i className="fas fa-user-circle"></i>
                            </NavLink>
                        </li>
                    :
                        <li className="c-icons__link" onClick={userLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                        </li>
                    }
                    <li className="c-icons__link">
                        <NavLink to="/cart">
                            <i className="fas fa-shopping-cart"></i>
                            <div className="e-showtotal">{cartTotal}</div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
        <div className="l-mobile-header container-fluid">
            <div className="c-logo">
                <NavLink to="/">
                    <img src={LOGO} alt="logo" className="c-logo__img"/>
                </NavLink>
                <div className={!pageBoolean.showMobileMenu ? "c-links" : "c-links showMobileMenu"}>
                    <ul className={!pageBoolean.showMobileMenu ? "c-links__list" : "c-links__list showMobileMenu-list"}>
                        <li className="c-links__link" onClick={changeMobilePage}> 
                            <NavLink to="/men">
                                Men
                            </NavLink>
                        </li>
                        <li className="c-links__link" onClick={changeMobilePage}> 
                            <NavLink to="/women">
                                Women
                            </NavLink>
                        </li>
                        <li className="c-links__link" onClick={changeMobilePage}> 
                            <NavLink to="/accessory">
                                Accessory
                            </NavLink>
                        </li>
                        <li className="c-links__link" onClick={changeMobilePage}> 
                            <NavLink to="/sale">
                                Sale
                            </NavLink>
                        </li>
                        {authBoolean.isLogin &&
                            <li className="c-links__link" onClick={changeMobilePage}> 
                                <NavLink to={`/order/user?id=${userId}`}>
                                    Order
                                </NavLink>
                            </li>
                        }
                        <>
                            {!authBoolean.isLogin ? 
                                <li className="c-links__link" onClick={changeMobilePage}> 
                                    <NavLink to="/sign">
                                        SignIn
                                    </NavLink>
                                </li>
                            :
                            <li className="c-links__link" onClick={userLogout}>
                                Logout<i className="fas fa-sign-out-alt ms-2"></i>
                            </li>
                            }
                        </>
                        <li className="c-links__link" onClick={changeMobilePage}>
                            <NavLink to="/cart">
                                Cart
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <i className={!pageBoolean.showMobileMenu ? "fas fa-bars" : "fas fa-times"} onClick={displayMobileMenu}></i>
            </div>
        </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        displayMobileMenu: () => dispatch(openMobileMenu()),
        changeMobilePage: () => dispatch(closeMobileMenu()),
        userLogout: () => dispatch(getLogoutUser())
    }   
}

export default connect(null, mapDispatchToProps)(Header);
