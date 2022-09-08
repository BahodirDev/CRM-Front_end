import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/personalCard.css';
import M from 'materialize-css';

function EditReport(props) {

    const dispatch = useDispatch();
    const [emp_info, setEmp] = useState("")
    const { id } = useParams();
    useEffect(() => {
        fetch("https://crmstore.herokuapp.com/getReport/" + id)
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
        if(amount < 0){
            M.toast({html:"Ma`lumotni to`g`ri kiriting",classes:'red'})
        }else{

        fetch('https://crmstore.herokuapp.com/editReport/' + id,{
            method:"PUT",
            headers:{
                "Content-Type":'application/json',
                Authorization:JSON.parse(localStorage.getItem('jwt'))
            },
            body:JSON.stringify({
                name,
                amount,
                org_amount:emp_info.amount,
                sale_price,
                postedBy:emp_info.postedBy,
                product_id:emp_info.product_id,
              
            })

        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"red"})

            }else{
                M.toast({html:"Muvaffaqiyatli amalga oshirildi",classes:"blue"})
                navigate('/report')
            }
        })
    }

    }

    return (
        <>
            {
                emp_info &&
                <div className='edit_card'>
                                 <div className='btn_place' onClick={()=>navigate(-1)}>
            <button className='btn primary'>Ortga qaytish</button>
        </div>
                    <div className='edit_box'>
                        <div class=" mb-3">
                            <label htmlFor="name" className='label_report'>Mahsulot Nomi</label>
                            <input type="text"  class="form-control" id="name" defaultValue={emp_info.name} onChange={e => setName(e.target.value)} placeholder={emp_info.name} />
                        </div>
                        <div class="">
                        <label htmlFor="cat_name" className='label_report'>Mahsulot Turi</label>
                            <input type="text" class="form-control" id="cat_name" defaultValue={emp_info.category}  placeholder={emp_info.category} />
                        </div>
                        <div class="">
                        <label htmlFor="amount" className='label_report'>Mahsulot Miqdori</label>
                            <input type="number" class="form-control" id="amount" defaultValue={emp_info.amount} onChange={e => setAmount(e.target.value)} placeholder={emp_info.amount + " miqdor"} />
                        </div>
                        <div class="">
                        <label htmlFor="price" className='label_report'>Mahsulot Narxi</label>
                            <input type="number" class="form-control" id="price" defaultValue={emp_info.sale_price} onChange={e => setSale(e.target.value)} placeholder={emp_info.sale_price} />
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