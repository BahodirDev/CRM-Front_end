import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/personalCard.css';

function AddItem(props) {

    const [category,setCategory] = useState([])
    useEffect(()=>{
        fetch("https://crmstore.herokuapp.com/getCategory")
            .then(data=>data.json())
            .then(res=>{
                setCategory(res);
                console.log(res);
            })
    },[])

       const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [orgPrice,setOrgPrice,] = useState('');
    const [type,setType,] = useState('');

    const navigate = useNavigate()

    function addItem(){
        if(name, desc, amount, salePrice, orgPrice, type){
            fetch('https://crmstore.herokuapp.com/addproducts',{
                method:"POST",
                headers:{
                    Authorization:JSON.parse(localStorage.getItem('jwt')),
                    "Content-Type":'application/json',
                },
                body:JSON.stringify({
                    fish:name,
                    description:desc,
                    price:orgPrice,
                    sale:salePrice,
                    amount,
                    type
                })
                
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html:data.error,classes:'red'})
                }else{
                    M.toast({html:'Muvaffaqiyatli amalga oshirildi',classes:'blue'})
                    console.log(data);
                    dispatch({ type: "ADD_PRODUCTS", payload: data });
                    navigate('/store')
                }
               
                console.log(data.data);
            })
        }else{
            M.toast({html:'Xatolik',classes:'red'})
        };
     
    }

   

    return (
        <div className='edit_card'>
               <div className='btn_place' onClick={()=>navigate(-1)}>
            <button className='btn primary'>Ortga qaytish</button>
        </div>
            <div className='edit_box'>
                <div className=" mb-3">
                    <input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} placeholder="Mahsulot nomi"  />
                </div>
                <div className="">
                    <input type="number" className="form-control"  value={amount}  onChange={e=>setAmount(e.target.value)} placeholder="Miqdori"  />
                </div>
                <div className="">
                    <input type="number" className="form-control"  value={orgPrice} onChange={e=>setOrgPrice(e.target.value)}  placeholder="Asl narxi" />
                </div>
                <div className="">
                    <input type="number" className="form-control"  value={salePrice}  onChange={e=>setSalePrice(e.target.value)} placeholder="Sotuv narxi" />
                </div>
                <div className="">
                    <input type="text" className="form-control"  value={desc}  onChange={e=>setDesc(e.target.value)} placeholder="Izoh"  />
                </div>
                <div className="">
                    <select className='form-control' value={type} onChange={e=>setType(e.target.value)}>
                        <option value="">.....</option>
                        {
                            category &&
                            category.map((val,idx)=>{
                              return  <option value={val.cat_name} key={idx}>{val.cat_name}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={addItem}>Qo'shish</button>
                </div>
            </div>
        </div>      
    );
}

export default AddItem;