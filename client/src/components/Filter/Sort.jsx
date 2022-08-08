import React from 'react';
import {useSelector} from 'react-redux';

const Sort = ({nameAsc, nameDesc, priceAsc, priceDesc}) => {
    const {pageBoolean} = useSelector(state => state.page);
    return (
        <div className="c-sort">
            <div className="form-check">
                <input className={!pageBoolean.cancelSelect ? "form-check-input cancel" : "form-check-input"} type="radio" id="nameAsc" name="sort" onClick={(e) => nameAsc(e.target.id)}/>
                <label className="form-check-label" htmlFor="atoz">Product Name: A -&gt; Z</label>
            </div>
            <div className="form-check">
                <input className={!pageBoolean.cancelSelect ? "form-check-input cancel" : "form-check-input"} type="radio" id="nameDesc" name="sort" onClick={(e) => nameDesc(e.target.id)} />
                <label className="form-check-label" htmlFor="ztoa">Product Name: Z -&gt; A</label>
            </div>
            <div className="form-check">
                <input className={!pageBoolean.cancelSelect ? "form-check-input cancel" : "form-check-input"} type="radio" id="priceAsc" name="sort" onClick={(e) => priceAsc(e.target.id)} />
                <label className="form-check-label" htmlFor="ltoh">Price: Low -&gt; High</label>
            </div>
            <div className="form-check">
                <input className={!pageBoolean.cancelSelect ? "form-check-input cancel" : "form-check-input"} type="radio" id="priceDesc" name="sort" onClick={(e) => priceDesc(e.target.id)} />
                <label className="form-check-label" htmlFor="htol">Price: High -&gt; Low</label>
            </div>
        </div>
        
    )
}

export default Sort;