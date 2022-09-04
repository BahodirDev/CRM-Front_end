import React from 'react';
import { useEffect } from 'react';
import '../styles/rightbar.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlertModal from '../UI/modal/AlertModal';
 import M from 'materialize-css';
import { BiListCheck, BsBasket, BsBasket2, BsBook, BsBorder, BsBorderAll, BsCash, BsDoorOpen, BsFillBookmarkPlusFill, BsListNested, BsListTask} from 'react-icons/all' 

function Store(props) {

  const dispatch = useDispatch();
  const { products} = useSelector(state => state);
  const [amount,setAmount] = useState(1)
  
  useEffect(() => {
    fetch('http://localhost:5000/allProducts')
        .then(data => data.json())
        .then(res => {
            console.log(res);
            dispatch({ type: "PRODUCTS_FETCHED", payload: res })
        })
}, [])


function setBasket(id,sale_price){
  fetch('http://localhost:5000/orderadd',{
    method:"POST",
    headers:{
      "Content-Type":'application/json',
      Authorization:JSON.parse(localStorage.getItem('jwt'))
    },
    body:JSON.stringify({
      id,
      amount,
      sale_price
    })
  })
  .then(data=>data.json())
  .then(res=>{
    if(res.error){
      M.toast({html:res.error,classes:"red"})
    }else{
      M.toast({html:"Muvaffaqiyatli bajarildi",classes:'green'})
      setAmount(1)
    }
  })
}

    const navigate = useNavigate()




  return (
    <div className='emp_list'>
      <div>
        <div>
          
        </div>
        <table className='table table-striped table-hover centered' id='store_table'>
          <thead>
            <tr className='tr_box'>
              <th className='tr'>No</th>
              <th className='tr'>Nomi</th>
              <th className='tr'>Miqdori</th>
              <th className='tr'>Sotuv Narxi</th>
              <th className='tr'>Soni</th>
              <th className='tr' colSpan={2}>
              <span className='edit_controllers' onClick={()=>navigate('/basket')}>
                  <BsBasket2 style={{fontSize:'40px',color:"blue"}} />
              </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products &&
                products.length ?
                products.map((val, idx) => {
                  if(val.amount<=10){
                    return (
                      <tr className='tr_box' key={idx} style={{background:'red'}}>
                        <td className='tr'>{idx + 1}</td>
                        <td className='tr'>{val.name}</td>
                        <td className='tr'>{val.amount.toLocaleString("en-US")}</td>
                        <td className='tr'>{val.sale_price.toLocaleString("en-US")}</td>
                        <td>
                          <select  onChange={(e)=>setAmount(e.target.value)} className='form-control'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </td>
                        <td>
                         
                          <span className='edit_icons'>
                            <BsBasket className='BcClass' onClick={()=> setBasket(val._id,val.sale_price)} />
                          </span>
                         <Link to={`show_item/${val._id}`} className='edit_icons'>
                            <BsCash className='BcClass' />
                         </Link>
                        </td>
                      </tr>
                    )
                  }else if(val.amount<=50){
                    return (
                      <tr className='tr_box' key={idx} style={{background:'pink',color:"black"}}>
                        <td className='tr'>{idx + 1}</td>
                        <td className='tr'>{val.name}</td>
                        <td className='tr'>{val.amount.toLocaleString("en-US")}</td>
                        <td className='tr'>{val.sale_price.toLocaleString("en-US")}</td>
                        <td>
                          <select  onChange={(e)=>setAmount(e.target.value)} className='form-control'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </td>
                        <td>
                         
                          <span className='edit_icons'>
                            <BsBasket className='BcClass' onClick={()=> setBasket(val._id,val.sale_price)} />
                          </span>
                         <Link to={`show_item/${val._id}`} className='edit_icons'>
                            <BsCash className='BcClass' />
                         </Link>
                        </td>
                      </tr>
                    )
                  }else if(val.amount>50){
                    return (
                      <tr className='tr_box' key={idx}>
                        <td className='tr'>{idx + 1}</td>
                        <td className='tr'>{val.name}</td>
                        <td className='tr'>{val.amount.toLocaleString("en-US")}</td>
                        <td className='tr'>{val.sale_price.toLocaleString("en-US")}</td>
                        <td>
                          <select  onChange={(e)=>setAmount(e.target.value)} className='form-control'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </td>
                        <td>
                         
                          <span className='edit_icons'>
                            <BsBasket className='BcClass' onClick={()=> setBasket(val._id,val.sale_price)} />
                          </span>
                         <Link to={`show_item/${val._id}`} className='edit_icons'>
                            <BsCash className='BcClass' />
                         </Link>
                        </td>
                      </tr>
                    )
                  }

                }) : 'loading'
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Store;