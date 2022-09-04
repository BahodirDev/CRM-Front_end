import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/storeItem.css';
import M from 'materialize-css';

function ItemShow(props) {
    const { id } = useParams();
    const [item, setItem] = useState('')
    const [sale_price = item.sale_price,setSale_price] = useState(item.sale_price);
    const [amount,setAmount] = useState(1);

    useEffect(() => {
        fetch('http://localhost:5000/show_item/' + id)
            .then(data => data.json())
            .then(res => {
                console.log(res);
                setItem(res)
            })
    }, [id]);

    const navigate = useNavigate()

    function singleCost(){
        console.log(sale_price);
        fetch('http://localhost:5000/show_item_report',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Authorization:JSON.parse(localStorage.getItem('jwt'))
            },
            body:JSON.stringify({
                product_id:id,
                amount,
                sale_price
            })
        })
        .then(data => data.json())
        .then(res => {
            if(res.error){
                M.toast({html:res.error,classes:'red'})
            }else{
                M.toast({html:'Muvaffaqiyatli amalga oshirildi',classes:'green'});
                navigate('/store')   
            }
        })
    }

    function cancled(){
        navigate('/store');
        setAmount(''),
        setSale_price("");
        setItem('')
    }   

    return (
        <div className='itemId'>
            <div className="card" style={{width:'95%',minHeight:'80%',marginTop:"-100px"}}>
                <div className='fields_cost'>
                   <b>Nomi: {item.name}</b>
                </div>
                <div className='fields_cost'>
                <b>Miqdori: {item.amount}</b>
                </div>
                <div className='fields_cost'>
                    <input type="number" id='counting' defaultValue={amount.toLocaleString('en-US')} onChange={e=>setAmount(e.target.value)} className="form-control" placeholder="Miqdor" />
                    <label htmlFor="counting" className='label_info'>Sotuvda</label>
                </div>
                <div className='fields_cost'>
                     <input type="number" id='sale' defaultValue={item.sale_price} onChange={e=>setSale_price(e.target.value)} className="form-control" placeholder={item.sale_price} />
                    <label htmlFor="sale" className='label_info'>Sotuvdagi narxi</label>
                </div>
                <div className='fields_cost'>
                <input type="number" id='count' defaultValue={item.sale_price * amount.toLocaleString('en-US')} className="form-control" placeholder={item.sale_price * amount.toLocaleString('en-US')} style={{color:'white',background:"black",textIndent:'10px'}} />
                <label htmlFor="count" className='label_info'>Umumiy narxi</label>
                </div>
                <div className='' id='final_place'>
                        <button className='btn blue ' onClick={singleCost}>
                            Xarid
                        </button>
                        <button className='btn red' onClick={cancled}>
                            Bekor qilish
                        </button>
                </div>
            </div>
        </div>
    );
}

export default ItemShow;