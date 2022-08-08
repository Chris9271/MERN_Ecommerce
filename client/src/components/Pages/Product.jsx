import React, {useEffect} from 'react';
import ProductImage from '../Product/ProductImage';
import ProductDetail from '../Product/ProductDetail';
import {connect, useSelector} from 'react-redux';
import {getProduct, switchDisplay} from '../Store/Action/page';
// match is an object contain info about <Route> path (or can use - useParams())
// ex: This route is /:id, so match will record this, store in params property (record dynamic route)
const Product = ({match, product, show}) => {
    const {item, pageBoolean} = useSelector(state => state.page);

    useEffect(()=>{
        product(match.params.id);
    }, [match.params.id])

    return (
        <>
        {/* c - component, e - element, l - layout, e - element */}
            <div className="l-product container">
            {   
                item.length > 0 ?
                <>
                    <div className="c-product">
                        <ProductImage/>
                        <ProductDetail/>
                    </div>
                    <div className="c-statement">
                        <div className="c-statement-title">
                            <h5 className={!pageBoolean.showProductComment ? "e-statement__title e-statement__title-active" : "e-statement__title e-statement__title-not-active"} onClick={!pageBoolean.showProductComment ? null : show}>Details</h5>
                            <h5 className={!pageBoolean.showProductComment ? "e-statement__title e-statement__title-not-active" : "e-statement__title e-statement__title-active"} onClick={!pageBoolean.showProductComment ? show : null}>Comments</h5>
                        </div>
                        <div className="c-statement-details">
                            {
                                !pageBoolean.showProductComment ?
                                <>
                                    <div className="c-detail">
                                        <h5 className="c-detail__title">The Detail</h5>
                                        <ul className="c-detail__list">
                                            {item[0].detail.map((res => (
                                                <li key={res} className="c-detail__item">{res}</li>
                                            )))}
                                        </ul>
                                    </div>
                                    {
                                        item[0].material.length > 0 ?
                                        <div className="c-material">
                                            <h6 className="c-material__title">Material & Care</h6>
                                            <ul className="c-material__list">
                                                {item[0].material.map((res => (
                                                    <li key={res} className="c-material__item">{res}</li>
                                                )))}
                                            </ul>
                                        </div>
                                        :
                                        null
                                    }
                                    {
                                        item[0].fit.length > 0 ?
                                        <div className="c-fit">
                                            <h6 className="c-fit__title">Size & Fit</h6>
                                            <ul className="c-fit__list">
                                                {item[0].fit.map((res => (
                                                    <li key={res} className="c-fit__item">{res}</li>
                                                )))}
                                            </ul>
                                        </div>
                                        :
                                        null
                                    }
                                </>
                                :
                                <div className="c-statement-comments">
                                    <h3>No Comments...</h3>
                                </div>
                            }
                        </div>
                    </div>
                </>
                :
                <div className="c-loading__product">
                    <div className="c-loading__product-msg">Loading...</div>
                    <div className="c-loading__product-loader"></div>
                </div>
            }
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        product: (path) => dispatch(getProduct(path)), //取得單一產品
        show: () => dispatch(switchDisplay()) //切換顯示商品內容或評論
    }
}

export default connect(null, mapDispatchToProps)(Product);
