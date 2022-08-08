import React from 'react';
import {connect, useSelector} from 'react-redux';
import Swal from 'sweetalert2';
import {getPriceFilter, getPrice} from '../Store/Action/page';
import {useHistory} from 'react-router-dom';

const PriceRange = ({match, setPrice, sortByPrice}) => {
  const {price} = useSelector(state => state.page)
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

  const handleChange = (e) => {
    setPrice(e.target.name, e.target.value)
  }

  const priceRange = async(prices) => {
    // 這邊的查詢是針對資料庫中符合(性別)所有資料來查詢
    if(prices.min === "" && prices.max !== ""){
      history.push(`${match.path}?pricerange=smallerthan${price.max}`)
      sortByPrice(prices, match.path);
    }else if(prices.max === "" && prices.min !== ""){
      history.push(`${match.path}?pricerange=greaterthan${price.min}`)
      sortByPrice(prices, match.path);
    }else if(prices.min === "" && prices.max === ""){
      Toast.fire({
        icon: 'error',
        html: 'Please type in one of the price range'
      })
    }else{
      history.push(`${match.path}?pricerange=${price.min}to${price.max}`)
      sortByPrice(prices, match.path);
    }
  }
  
  return (
    <div className="c-range">
        <h6 className="c-range__title">Price Range</h6>
        <div className="c-range__input">
            <input className="" type="number" placeholder="$ minimum" name="min" value={price.min} onChange={(e) => handleChange(e)}/>
            <p className="c-range__tilde">~</p>
            <input className="" type="number" placeholder="$ maximum" name="max" value={price.max} onChange={(e) => handleChange(e)}/>
        </div>
        <button type="button" className="c-range__apply btn" onClick={() => priceRange(price)}>Apply</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return{
      sortByPrice: (prices, path) => dispatch(getPriceFilter(prices, path)), // 依照價格在相應分類做搜索
      setPrice: (name, value) => dispatch(getPrice(name, value)) // 設置最高最低價
  }
}

export default connect(null, mapDispatchToProps)(PriceRange);