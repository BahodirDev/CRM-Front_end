import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/personalCard.css';

function EditCat(props) {

       const dispatch = useDispatch();
       const [emp_info,setEmp] = useState("")
         const { id } = useParams();
    useEffect(() => {
        fetch("http://localhost:5000/category/" + id)
            .then(data => data.json())
            .then(res => {
                console.log(res);
                setEmp(res)
            })
    }, [id])
    const navigate = useNavigate()
    const [name = emp_info.fish, setName] = useState(emp_info.fish);


    function editCat(){
        fetch('http://localhost:5000/categoryEdit/' + id,{
            method:"PUT",
            headers:{
                "Content-Type":'application/json',
                Authorization:JSON.parse(localStorage.getItem('jwt'))
            },
            body:JSON.stringify({
                name:name,
            })
            
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
            M.toast({html:data.error,classes:"red"})
            }else{
                navigate('/category');
                M.toast({html:"Muvaffaqiyatli bajarildi",classes:"blue"})
            }

        })
    }

    return (
        <div className='edit_card'>
               <div className='btn_place' onClick={()=>navigate(-1)}>
            <button className='btn primary'>Ortga qaytish</button>
        </div>
            <div className='edit_box'>
                <div className=" mb-3" style={{marginTop:'120px'}}>
                    <input type="text" className="form-control" id="floatingInput" defaultValue={emp_info.cat_name} onChange={e=>setName(e.target.value)} placeholder={emp_info.cat_name} />
                </div>
                <div>
                    <button className='btn btn-primary' onClick={editCat}>O'zgartirish</button>
                </div>
            </div>
        </div>      
    );
}

export default EditCat;