import React from 'react';

const footer = () => {
    return (
        <div className="l-footer">
            <div className="c-footer">
                <ul className="c-footer__list">
                    <li className="c-footer__item">Contact Us & FAQ</li>
                    <li className="c-footer__item">Terms & Conditions</li>
                    <li className="c-footer__item">Privacy Policy</li>
                    <li className="c-footer__item">Accessibility</li>
                    <li className="c-footer__item">About Us</li>
                    <li className="c-footer__item">Sustainability</li>
                </ul>
            </div>
            <div className="c-footer__mobile">
                <ul className="c-footer__mobile-list">
                    <li className="c-footer__mobile-item">Contact Us & FAQ</li>
                    <li className="c-footer__mobile-item">Terms & Conditions</li>
                    <li className="c-footer__mobile-item">Privacy Policy</li>
                </ul>
                <ul className="c-footer__mobile-list">
                    <li className="c-footer__mobile-item">Accessibility</li>
                    <li className="c-footer__mobile-item">About Us</li>
                    <li className="c-footer__mobile-item">Sustainability</li>
                </ul>
            </div>
                <p className="e-copyright">&copy; LUBINTAN Co., Ltd. All right reserved.</p>
                <p className="e-copyright">This website is for practice use only, any similarity is purely fictitious</p>
        </div>
    )
}

export default footer;
