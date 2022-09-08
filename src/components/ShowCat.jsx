import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/show_info.css'

function ShowCat(props) {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [emp_info, setEmp] = useState('')

    useEffect(() => {
        dispatch({ type: "FETCHING" })
        fetch("https://crmstore.herokuapp.com/category/" + id)
            .then(data => data.json())
            .then(res => {
                setEmp(res)
                console.log(res);
            })
    }, [id])
    console.log(emp_info);
    return (
        <div className='show_info'>
            <div className='info_place'>
                <div className="info_box" style={{marginTop:'120px'}}>
                    <h3>
                        <b>{emp_info.cat_name}</b>
                    </h3>
                    <h3>
                        <b>{(new Date(emp_info.createdAt)).toLocaleTimeString()}</b>
                        <br />
                        <b>{(new Date(emp_info.createdAt)).toLocaleString()}</b>
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default ShowCat;