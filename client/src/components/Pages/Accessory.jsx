// 使用 yarn add bootstrap 以安裝bootstrap
import 'bootstrap/dist/css/bootstrap.css';  //此行導入bootstrap的css
// 但bootstrap 需要popper.js作為依賴項，所以下 yarn add @popperjs/core 以安裝 popper.js
import 'bootstrap/dist/js/bootstrap.bundle'; //此行導入popper.js
import React, {useEffect} from 'react';
import Filter from './Filter';
import Products from './Products';
import Swal from 'sweetalert2';
import {useSelector, connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {getProducts, getSort, getSearch, clearSort} from '../Store/Action/page';
import MobileFilter from '../Filter/MobileFilter';


const Accessory = ({match, getAccessoryProducts, sortNameAsc, sortNameDesc, sortPriceAsc, sortPriceDesc, sortBySearch, sortClear}) => {
    const {products} = useSelector(state => state.page)
    const history = useHistory();
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    })

    const productList = async() => {
        history.push(`${match.path}`)
        getAccessoryProducts(match.path);
    }

    const nameAsc = async(id) => {
        history.push(`${match.path}?sortBy=${id}`)
        sortNameAsc(products, id);
    }

    const nameDesc = async(id) => {
        history.push(`${match.path}?sortBy=${id}`)
        sortNameDesc(products, id);
    }

    const priceAsc = async(id) => {
        history.push(`${match.path}?sortBy=${id}`)
        sortPriceAsc(products, id);
    }

    const priceDesc = async(id) => {
        history.push(`${match.path}?sortBy=${id}`)
        sortPriceDesc(products, id);
    }

    const searchFilter = async(value) => {
        if(value !== ""){
            history.push(`${match.path}?searchBy=${value}`);
            sortBySearch(value, match.path);
        }else{
            Toast.fire({
                icon: 'error',
                html: 'Not eligible content'
            })
        }
    }

    const resetSort = () => {
        productList();
        sortClear();
    }

    useEffect(()=>{
        productList();
    }, [])
    return (
        <>
            <div className="l-accessory container">
                <div className="row gx-lg-5">
                    <Filter 
                        match={match} 
                        nameAsc={nameAsc} 
                        nameDesc={nameDesc} 
                        priceAsc={priceAsc} 
                        priceDesc={priceDesc} 
                        searchFilter={searchFilter}  
                        resetSort={resetSort}
                    />
                    <Products/>
                </div>
            </div>
            <MobileFilter
                match={match} 
                nameAsc={nameAsc} 
                nameDesc={nameDesc} 
                priceAsc={priceAsc} 
                priceDesc={priceDesc} 
                searchFilter={searchFilter}  
                resetSort={resetSort}
            />
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAccessoryProducts: path => dispatch(getProducts(path)),
        sortNameAsc: (products, id) => dispatch(getSort(products, id)),
        sortNameDesc: (products, id) => dispatch(getSort(products, id)),
        sortPriceAsc: (products, id) => dispatch(getSort(products, id)),
        sortPriceDesc: (products, id) => dispatch(getSort(products, id)),
        sortBySearch: (value, path) => dispatch(getSearch(value, path)),
        sortClear: () => dispatch(clearSort())
    }
}

export default connect(null, mapDispatchToProps)(Accessory);
