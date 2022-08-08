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
import { getProducts, getSort, getSearch, clearSort } from '../Store/Action/page';
import MobileFilter from '../Filter/MobileFilter';

const Men = ({match, getMenProducts, sortNameAsc, sortNameDesc, sortPriceAsc, sortPriceDesc, sortBySearch, sortClear}) => {
    const {products} = useSelector(state => state.page);
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
        getMenProducts(match.path);
    }

    // 以下asc/desc搜尋僅做排序，不會再從資料庫抓全部資料在排序
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
        // 尋找資料庫中符合名稱的產品並顯示
        // 檢查輸入內容類型(防止惡意攻擊) -- 待研究
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
        // reset避免重新調用api(productList())?
        // history.push(`${match.path}`)
        productList();
        sortClear();
    }

    useEffect(()=>{
        productList();
    }, [])

    return (
        <>
            <div className="l-men container">
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
    return{
        // 取得指定商品
        getMenProducts: path => dispatch(getProducts(path)),
        // 依照xx排序/輸入做搜尋
        sortNameAsc: (products, id) => dispatch(getSort(products, id)),
        sortNameDesc: (products, id) => dispatch(getSort(products, id)),
        sortPriceAsc: (products, id) => dispatch(getSort(products, id)),
        sortPriceDesc: (products, id) => dispatch(getSort(products, id)),
        sortBySearch: (value, path) => dispatch(getSearch(value, path)),
        // 清除所有條件
        sortClear: () => dispatch(clearSort())
    }
}
export default connect(null, mapDispatchToProps)(Men);
