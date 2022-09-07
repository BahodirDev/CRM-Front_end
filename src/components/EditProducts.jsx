import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/personalCard.css';

function EditProducts(props) {

       const dispatch = useDispatch();
       const [emp_info,setEmp] = useState("")
         const { id } = useParams();
    useEffect(() => {
        fetch("http://localhost:5000/editProduct/" + id)
            .then(data => data.json())
            .then(res => {
                setEmp(res)
            })
    }, [id])
    const navigate = useNavigate()
    const [name, setName] = useState(emp_info.name);
    const [desc, setDesc] = useState(emp_info.description);
    const [amount, setAmount] = useState(emp_info.amount);
    const [type, setType] = useState(emp_info.cat_id);
    const [deadLine,setDeadLine,] = useState(emp_info.deadLine);
    const [sale_price, setSale] = useState(emp_info.sale_price);
    const [org_price,setOrg,] = useState(emp_info.orginal_price);

    function editProducts(){
        fetch('http://localhost:5000/editProduct/' + id,{
            method:"PUT",
            headers:{
                "Content-Type":'application/json',
                Authorization:JSON.parse(localStorage.getItem('jwt'))
            },
            body:JSON.stringify({
                name,
                description:desc,
                amount,
                cat_id:type,
                deadLine,
                sale_price,
                orginal_price:org_price
            })
            
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"red"})
            }else{
                M.toast({html:"Muvaffaqiyatli amalga oshirildi",classes:"blue"})
                navigate('/products')
            }
        })
    }

    return (
        <div className='edit_card'>
               <div className='btn_place' onClick={()=>navigate(-1)}>
            <button className='btn primary'>Ortga qaytish</button>
        </div>
            <div className='edit_box'>
                <div class=" mb-3">
                    <input type="text" class="form-control" id="floatingInput" defaultValue={emp_info.name} onChange={e=>setName(e.target.value)} placeholder={emp_info.name} />
                </div>
                <div class="">
                    <input type="text" class="form-control" id="floatingPassword" defaultValue={emp_info.description}  onChange={e=>setDesc(e.target.value)} placeholder={emp_info.description}  />
                </div>
                <div class="">
                    <input type="text" class="form-control" id="floatingPassword" defaultValue={emp_info.cat_id}  onChange={e=>setType(e.target.value)} placeholder={emp_info.cat_id}  />
                </div>
                <div class="">
                    <input type="number" class="form-control" id="floatingPassword" defaultValue={emp_info.amount}  onChange={e=>setAmount(e.target.value)} placeholder={emp_info.amount+" miqdor"}  />
                </div>
                <div class="">
                    <input type="date" class="form-control" id="floatingPassword" defaultValue={emp_info.deadLine}  onChange={e=>setDeadLine(e.target.value)} placeholder={emp_info.deadLine}  />
                </div>
                <div class="">
                    <input type="number" class="form-control" id="floatingPassword" defaultValue={emp_info.sale_price}  onChange={e=>setSale(e.target.value)} placeholder={emp_info.sale_price}  />
                </div>
                <div class="">
                    <input type="number" class="form-control" id="floatingPassword" defaultValue={emp_info.org_price}  onChange={e=>setOrg(e.target.value)} placeholder={emp_info.orginal_price}  />
                </div>
                <div>
                    <button className='btn btn-primary' onClick={editProducts}>O'zgartirish</button>
                </div>
            </div>
        </div>      
    );
}

export default EditProducts;