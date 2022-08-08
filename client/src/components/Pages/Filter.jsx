import React from 'react';
import Sort from '../Filter/Sort';
import Search from '../Filter/Search';
import PriceRange from '../Filter/PriceRange';

const filter = ({nameAsc, nameDesc, priceAsc, priceDesc, searchFilter, match, resetSort}) => {
    return (
        <>
            <div className="l-filter col-xl-3 col-lg-4">
                <h5>Sort By</h5>
                <Sort nameAsc={nameAsc} nameDesc={nameDesc} priceAsc={priceAsc} priceDesc={priceDesc}/>
                <Search searchFilter={searchFilter}/>
                <PriceRange match={match}/>
                <button type="button" className="e-clear btn" onClick={resetSort}>Clear All</button>
            </div>
        </>
    )
}

export default filter;