import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <>
        <div className="l-home container-fluid">
            <div className="c-sale">
                <div className="c-home c-sale__background">
                    <Link to="/sale">
                        <button className="c-home__btn">
                            <p className="c-home__title">Sale</p>
                            <p className="c-home__content">Shop Now</p>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="c-new">
                <div className="c-home c-new__background">
                    <Link to="/new">
                        <button className="c-home__btn">
                            <p className="c-home__title">New</p>
                            <p className="c-home__content">Shop Now</p>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="c-accessory">
                <div className="c-home c-accessory__background">
                    <Link to="/accessory">
                        <button className="c-home__btn">
                            <p className="c-home__title">Accessories</p>
                            <p className="c-home__content">Shop Now</p>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="c-men">
                <div className="c-home c-men__background">
                    <Link to="/men">
                        <button className="c-home__btn">
                            <p className="c-home__title">Men</p>
                            <p className="c-home__content">Shop Now</p>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="c-women">
                <div className="c-home c-women__background">
                    <Link to="/women">
                        <button className="c-home__btn">
                            <p className="c-home__title">Women</p>
                            <p className="c-home__content">Shop Now</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;
