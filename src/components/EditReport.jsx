import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/personalCard.css';

function EditReport(props) {

    const dispatch = useDispatch();
    const [emp_info, setEmp] = useState("")
    const { id } = useParams();
    useEffect(() => {
        fetch("http://localhost:5000/getReport/" + id)
            .then(data => data.json())
            .then(res => {
                setEmp(res)
                console.log(res);
            })
    }, [id])
    const navigate = useNavigate()
    const [name = emp_info.name, setName] = useState(emp_info.name);
    const [amount = emp_info.amount, setAmount] = useState(emp_info.amount);
    const [sale_price = emp_info.sale_price, setSale] = useState(emp_info.sale_price);

    function editReport(){
        fetch('http://localhost:5000/editReport/' + id,{
            method:"PUT",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                name,
                amount,
                sale_price,
                postedBy:emp_info.postedBy,
                product_id:emp_info.product_id,
              
            })

        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            // navigate('/products')
        })
    }

    return (
        <>
            {
                emp_info &&
                <div className='edit_card'>
                    <div className='edit_box'>
                        <div class=" mb-3">
                            <input type="text" class="form-control" id="floatingInput" defaultValue={emp_info.name} onChange={e => setName(e.target.value)} placeholder={emp_info.name} />
                        </div>
                        <div class="">
                            <input type="text" class="form-control" id="floatingPassword" defaultValue={emp_info.category}  placeholder={emp_info.category} />
                        </div>
                        <div class="">
                            <input type="number" class="form-control" id="floatingPassword" defaultValue={emp_info.amount} onChange={e => setAmount(e.target.value)} placeholder={emp_info.amount + " miqdor"} />
                        </div>
                        <div class="">
                            <input type="number" class="form-control" id="floatingPassword" defaultValue={emp_info.sale_price} onChange={e => setSale(e.target.value)} placeholder={emp_info.sale_price} />
                        </div>
                        <div>
                            <button className='btn btn-primary' onClick={editReport}>O'zgartirish</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default EditReport;