import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { BiAddToQueue, BiEdit } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/category.css'

function Category(props) {
    const {category} = useSelector(state=>state);
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('https://crmstore.herokuapp.com/getCategory')
            .then(data => data.json())
            .then(res => {
                console.log(res);
                dispatch({type:"SET_CATEGORY",payload:res})
            })
    }, [])

    const remove=(id)=>{
        fetch('https://crmstore.herokuapp.com/remove/'+id,{
            method:"DELETE",
            headers:{
                Authorization:JSON.parse(localStorage.getItem('jwt'))
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"red"})
            }else{
                M.toast({html:"Muvaffaqiyatli amalga oshirildi",classes:"green"})
                dispatch({ type: "REMOVE_CATEGORY", payload: data });
            }
        
        })
    }

    return (
        <div className="category">
            <div className='cat_bar'>
                <div>
                    <input type="text" className='form-control' placeholder='Search' />
                </div>
                <div>
                    <Link to={'/categoryAdd'}>
                        <BiAddToQueue className='BcClass' style={{ fontSize: '40px', marginRight: '20px' }} />
                    </Link>
                </div>
            </div>
            <table className='centered'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nomi</th>
                        <th>Sozlamalar</th>
                    </tr>
                </thead>

                <tbody>
                    {   category.length &&
                        category.map((val, idx) => {
                            return (
                                <tr key={idx}>
                                     <td>{idx+1}</td>
                                     <td>
                                        <Link to={'/showCat/'+val._id}>
                                        {val.cat_name}
                                        </Link>
                                     </td>
                                    <td>
                                    <span onClick={()=>remove(val._id)} >
                                        <BsTrash2 className='BcClass' style={{ fontSize: '40px', marginRight: '20px' }} />
                                    </span>
                                    <Link to={'/editCat/'+val._id}>
                                        <BiEdit className='BcClass' style={{ fontSize: '40px', marginRight: '20px' }} />
                                    </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    );
}

export default Category;