import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {useSelector, connect} from 'react-redux';
import {getProductImage, showProductImageModal, showProductHoverImageModal} from '../Store/Action/page';

const ProductImage = ({switchProductImage, showImage, closeImage, showHoverImage, closeHoverImage}) => {
    const {item, pageBoolean} = useSelector(state => state.page)

    return (
        <div className="c-product-image">
            <Modal
                show={pageBoolean.showProductImageModal}
                onHide={closeImage}
                contentClassName={pageBoolean.showProductImageModal ? "c-modal-dialogname in" : "c-modal-dialogname out"}
                backdropClassName={pageBoolean.showProductImageModal ? "c-modal-backdrop in" : "c-modal-backdrop out"}
                animation={false}
                centered
            >
                <img src={item[0].image} alt="" className="e-modal-image"/>   
            </Modal>
            <Modal
                show={pageBoolean.showProductHoverImageModal}
                onHide={closeHoverImage}
                contentClassName={pageBoolean.showProductHoverImageModal ? "c-modal-dialogname in" : "c-modal-dialogname out"}
                backdropClassName={pageBoolean.showProductHoverImageModal ? "c-modal-backdrop in" : "c-modal-backdrop out"}
                animation={false}
                centered
            >
                <img src={item[0].hoverImage} alt="" className="e-modal-image"/>   
            </Modal>
            <div className={!pageBoolean.showProductImage ? "c-product__images" : "c-product__images slide"}>
                <img src={item[0].image} alt="product" className="e-product__image" onClick={showImage}/>
                <img src={item[0].hoverImage} alt="product" className="e-product__image" onClick={showHoverImage}/>
            </div>
            <i className="fas fa-chevron-left e-product__arrow-left" onClick={switchProductImage}></i>
            <i className="fas fa-chevron-right e-product__arrow-right" onClick={switchProductImage}></i>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        switchProductImage: () => dispatch(getProductImage()),
        showImage: () => dispatch(showProductImageModal(true)),
        closeImage: () => dispatch(showProductImageModal(false)),
        showHoverImage: () => dispatch(showProductHoverImageModal(true)),
        closeHoverImage: () => dispatch(showProductHoverImageModal(false))
    }
}

export default connect(null, mapDispatchToProps)(ProductImage);