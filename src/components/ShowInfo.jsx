import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/show_info.css'

function ShowInfo(props) {

    const {id}  = useParams();
    const dispatch = useDispatch();
    const [emp_info,setEmp] = useState('');
    const navigate = useNavigate()

    useEffect(()=>{
    dispatch({type:"FETCHING"})
    fetch("http://localhost:5000/allList/"+id)
      .then(data => data.json())
      .then(res => {
        setEmp(res)
        console.log(res);
      })
    },[id])
    console.log(emp_info);
    return (
        <div className='show_info'>
               <div className='btn_place' onClick={()=>navigate(-1)}>
            <button className='btn primary'>Ortga qaytish</button>
        </div>
            <div className='info_place'>
                <div className="info_box">
                   <h3>
                    <b>{emp_info.fish}</b>
                   </h3>
                   <div className='divide_info_box'>
                        <div style={{padding:'20px 0px'}}>
                            <img src='data:image/jpeg;base64,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' alt="" />
                        </div>
                        <div id='info_table'>
                            <span className='note_place'>
                                <h4>Ishga yonlagna vaqti</h4> <h6>{(new Date(emp_info.assign_time)).toLocaleTimeString()}</h6>
                            </span>
                            <span className='note_place'>
                                <h4>Qisqacha izoh</h4> <h6>{emp_info.description}</h6>
                            </span>
                            <span className='note_place'>
                                <h4>Telefon raqani</h4> <h6>{emp_info.tel}</h6>
                            </span>
                            <span className='note_place'>
                                <h6>{emp_info.role && emp_info.role.roles.map((val)=>(<span key={val}>{val}</span>))}</h6>
                            </span>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    );
}

export default ShowInfo;