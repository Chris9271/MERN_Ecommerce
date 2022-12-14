import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {useSelector, connect} from 'react-redux';
import {setModalForm, getEmail} from '../Store/Action/auth';

const SignModal = ({userRequest, closeModalForm, handleSubmit}) => {
    const {authBoolean} = useSelector(state => state.auth)

return (
    <Modal
        show={authBoolean.modal}
        onHide={closeModalForm}
        contentClassName={authBoolean.modal ? "c-modal-dialogname in" : "c-modal-dialogname out"}
        backdropClassName={authBoolean.modal ? "c-modal-backdrop in" : "c-modal-backdrop out"}
        animation={false}
        centered
    >
        <div className="c-modal">
            <button
                type="button"
                className="c-modal__btn"
                onClick={closeModalForm}
            >
                <i className="fas fa-arrow-left"></i>
            </button>
            <h1 className="c-modal__title">
                {!authBoolean.isLoginMode ? 'Resend Verify Email' : 'Forget Password'}
            </h1>
            <p className="c-modal__description">
                Please type in your email address, and we will send 
                {!authBoolean.isLoginMode ? ' new verify ' : ' password reset '}mail to your mailbox immediately。
            </p>
            <div className="c-modal-wrapper__form">
                <label htmlFor="remail" className="c-form__label">
                    Email
                </label>
                <input
                    type="email"
                    id="remail"
                    name="remail"
                    placeholder="Please type your email address"
                    className="form-control c-form__input"
                    onChange={userRequest}
                />
                <button
                    type="submit"
                    className="c-modal__submit"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    </Modal>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        closeModalForm: () => dispatch(setModalForm(false)),
        userRequest: (e) => dispatch(getEmail(e)),
    }
}

export default connect(null, mapDispatchToProps)(SignModal)