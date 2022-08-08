import React from 'react';
import {useSelector, connect} from 'react-redux';
import {setSearchValue} from '../Store/Action/page';

const Search = ({searchFilter, setSearchField}) => {
    const {searchValue} = useSelector(state => state.page);
    
    const handleChange = (e) => {
        setSearchField(e.target.value)
    }

    const handleKeyUp = (e) => {
        if(e.key === 'Enter'){
            searchFilter(searchValue)
        }
    }

    return (
        <div className="c-search">
            <h6 className="c-search__title">Search</h6>
            <div className="c-search__wrapper">
                <input className="c-search__input" type="text" placeholder="search" value={searchValue} onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp}/>
                <i className="fas fa-search" onClick={() => searchFilter(searchValue)}></i>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchField: (value) => dispatch(setSearchValue(value)) // 設置輸入值
    }
}

export default connect(null, mapDispatchToProps)(Search);