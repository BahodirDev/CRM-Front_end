import React from 'react';
import { useEffect } from 'react';
import '../styles/rightbar.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlertModal from '../UI/modal/AlertModal';
import { BiBed, BiListCheck, BiTrash, BsBasket, BsBasket2, BsBook, BsBorder, BsBorderAll, BsCash, BsDoorOpen, BsFillBookmarkPlusFill, BsListNested, BsListTask } from 'react-icons/all'
import M from 'materialize-css';
import Empty from '../UI/assets/Empty';


function Basket(props) {

  const dispatch = useDispatch();
  const { orders } = useSelector(state => state);
  const [price, setPrice] = useState(Number)
  const [amount, setAmount] = useState(Number);
  const [isAllowed,setIsAllowed] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/getAllProducts')
      .then(data => data.json())
      .then(res => {
        console.log(res);
        dispatch({ type: "PRODUCTS_FETCHED_BASKET", payload: res })
      })
  }, [])

  function Cost() {
    fetch("http://localhost:5000/cost",{
    headers:{
      Authorization:JSON.parse(localStorage.getItem('jwt'))
    }})
    .then(data => data.json())
    .then(res => {
      console.log(res);
      if(res.error){
        M.toast({html:res.error,classes:'red'})
      }else{
        M.toast({html:"Muvaffaqiyatli amalga oshirildi",classes:'blue'});
        navigate('/store')
      }
      })
            

  }

  function removeOrder(id) {
    fetch("http://localhost:5000/removeorder/" + id, {
      method: "DELETE"
    })
      .then(data => data.json())
      .then(res => {
        if(res.error){  
          M.toast({html:res.error,classes:"red"})
        }else{
          M.toast({html:"O`chirildi",classes:"black"})
          dispatch({ type: "REMOVE_ORDER", payload: res })
        }
        
      })
  }


  const navigate = useNavigate()

  let totalPrice = orders.reduce((box, val) => {
    return box += val.amount * val.product_id.sale_price
  }, 0)


  return (
    <div className='emp_list'>
      <div>
        <div className='btn_place' onClick={()=>navigate(-1)}>
            <button className='btn primary'>Ortga qaytish</button>
        </div>
        <table className='table table-striped table-hover centered'>
          <thead>
            <tr className='tr_box'>
              <th className='tr'>No</th>
              <th className='tr'>Nomi</th>
              <th className='tr'>Miqdori</th>
              <th className='tr'>Sotuv Narxi</th>
              <th className='tr' colSpan={2} >
                Hisob
              </th>
            </tr>
          </thead>
          <tbody>
            {
              orders &&
                orders.length ?
                orders.map((val, idx) => {
                  if(val.msg !== "false"){
                     return (
                    <tr className='tr_box' key={idx} style={{background:'red'}}>
                      <td className='tr'>{idx + 1}</td>
                      <td className='tr'>{val.product_id.name}</td>
                      <td className='tr'>
                        <input type="number" className="form-control" id="floatingPassword" defaultValue={val.amount} onChange={e => {
                          setAmount(e.target.value)
                          fetch('http://localhost:5000/editamount', {
                            method: "put",
                            headers: {
                              "Content-Type": 'application/json'
                            },
                            body: JSON.stringify({ amount: e.target.value, id: val._id,idd:val.product_id })
                          })
                            .then(data => data.json())
                            .then(res => {
                              if(res.error){
                                M.toast({html:res.error,classes:"red"});
                                setIsAllowed(false)
                              }else{
                                dispatch({ type: "EDIT_FETCHED_BASKET", payload: res });
                                setIsAllowed(true)

                                console.log(res);
                              }
                           
                            })
                        }} placeholder={val.amount} />
                      </td>
                      <td className='tr'>
                        <input type="number" className="form-control" id="floatingPassword" defaultValue={val.sale_price} onChange={e => {
                          fetch('http://localhost:5000/editprice', {
                            method: "put",
                            headers: {
                              "Content-Type": 'application/json'
                            },
                            body: JSON.stringify({ price: e.target.value, id: val._id })
                          })
                            .then(data => data.json())
                            .then(res => {
                              if(res.error){
                                M.toast({html:res.error,classes:"red"})
                              }else{

                                dispatch({ type: "EDIT_FETCHED_BASKET_PRICE", payload: { id: val._id, price: e.target.value } })
                              }
                            })
                          setPrice(e.target.value);
                          console.log(price);
                        }} placeholder={val.sale_price} />
                      </td>
                      <td>
                        <b>{val.amount * val.product_id.sale_price} so`m</b>
                      </td>
                      <td>
                        <span className='edit_icons' onClick={() => removeOrder(val._id)}>
                          <BiTrash className='BcClass' />
                        </span>
                      </td>
                    </tr>
                  )
                  }else{
                    return (
                      <tr className='tr_box' key={idx}>
                        <td className='tr'>{idx + 1}</td>
                        <td className='tr'>{val.product_id.name}</td>
                        <td className='tr'>
                          <input type="number" className="form-control" id="floatingPassword" defaultValue={val.amount} onChange={e => {
                            console.log(e.target.value);
                            setAmount(e.target.value)
                            fetch('http://localhost:5000/editamount', {
                              method: "put",
                              headers: {
                                "Content-Type": 'application/json'
                              },
                              body: JSON.stringify({ amount: e.target.value, id: val._id,idd:val.product_id })
                            })
                              .then(data => data.json())
                              .then(res => {
                                if(res.error){
                                  M.toast({html:res.error,classes:"red"});
                                  setIsAllowed(false)
                                }else{
                                  dispatch({ type: "EDIT_FETCHED_BASKET", payload: res });
                                  setIsAllowed(true)

                                  console.log(res);
                                }
                              })
                          }} placeholder={val.amount} />
                        </td>
                        <td className='tr'>
                          <input type="number" className="form-control" id="floatingPassword" defaultValue={val.sale_price} onChange={e => {
                            fetch('http://localhost:5000/editprice', {
                              method: "put",
                              headers: {
                                "Content-Type": 'application/json'
                              },
                              body: JSON.stringify({ price: e.target.value, id: val._id })
                            })
                              .then(data => data.json())
                              .then(res => {
                                if(res.error){
                                  M.toast({html:res.error,classes:"red"})
                                }else{
  
                                  dispatch({ type: "EDIT_FETCHED_BASKET_PRICE", payload: { id: val._id, price: e.target.value } })
                                }
                              })
                            setPrice(e.target.value);
                            console.log(price);
                          }} placeholder={val.sale_price} />
                        </td>
                        <td>
                          <b>{(val.amount * val.product_id.sale_price).toLocaleString('us-US')} so`m</b>
                        </td>
                        <td>
                          <span className='edit_icons' onClick={() => removeOrder(val._id)}>
                            <BiTrash className='BcClass' />
                          </span>
                        </td>
                      </tr>
                    )
                  }
                 
                }) : "Savat Bo`sh"
            }
          </tbody>
        </table>
        <div>
          <div style={{ padding: "10px", backgroundColor: "#808080", display: 'flex', justifyContent: "space-around", width: "100%", alignItems: 'center' }}>
            <b>
              Umumiy hisob:  {totalPrice} so`m
            </b>
            <div>
              {
                isAllowed &&
              <button className='btn btn-danger' onClick={Cost}>Xarid</button>   
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basket;