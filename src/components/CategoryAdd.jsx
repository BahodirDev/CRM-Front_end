import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/personalCard.css';
import M from 'materialize-css';

function CategoryAdd(props) {

       const dispatch = useDispatch();

    const [name, setName] = useState('');


    const navigate = useNavigate()

    function addCategory(){
        fetch('http://localhost:5000/categoryAdd',{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                catName:name
            })
            
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"red"})
            }else{
                M.toast({html:"Muvaffaqiyatli amalga oshirildi",classes:"green"})
                console.log(data);
                dispatch({ type: "ADD_CATEGORY", payload: data });
                navigate('/category')
            }
        
        })
    }

    return (
        <div className='edit_card'>
            <div className='edit_box'>
                <div className=" mb-3" style={{marginTop:'200px'}}>
                    <input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} placeholder="Category nomi"  />
                </div>
                <div>
                    <button className='btn btn-primary' onClick={addCategory}>Qo'shish</button>
                </div>
            </div>
        </div>      
    );
}

export default CategoryAdd;