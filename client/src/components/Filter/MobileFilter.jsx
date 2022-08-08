import React, {useState} from 'react';
import Sort from './Sort';
import Search from './Search';
import PriceRange from './PriceRange';
import {useSelector, connect} from 'react-redux';
import {openMobileFilter} from '../Store/Action/page';

const MobileFilter = ({match, nameAsc, nameDesc, priceAsc, priceDesc, searchFilter, resetSort, openMobileFilter}) => {
    const {pageBoolean} = useSelector(state => state.page);
    return (
        <div className="c-mobile-filter">
            <input type="checkbox" id="filter-toggle" className="c-filter__check"/>
            <label htmlFor="filter-toggle" className="c-filter__toggle" onClick={openMobileFilter}>
                <div className="c-filter__toggle-title">
                    <i className="fas fa-filter"></i>
                    <span>Filter</span>
                    <i className={!pageBoolean.closeMobileMenu ? "fas fa-angle-down" : "fas fa-angle-up"} onClick={() => openMobileFilter}></i>
                </div>
            </label>
            <div className={!pageBoolean.closeMobileMenu ? "c-filter unchecked-filter" : "c-filter checked-filter"}>
                <div className={!pageBoolean.closeMobileMenu ? "c-filter__wrapper unchecked-wrapper" : "c-filter__wrapper checked-wrapper"}>
                    <h5>Sort By</h5>
                        <Sort nameAsc={nameAsc} nameDesc={nameDesc} priceAsc={priceAsc} priceDesc={priceDesc}/>
                        <Search searchFilter={searchFilter}/>
                        <PriceRange match={match}/>
                    <button type="button" className="e-clear btn" onClick={resetSort}>Clear All</button>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        openMobileFilter: () => dispatch(openMobileFilter())
    }
}

export default connect(null, mapDispatchToProps)(MobileFilter);