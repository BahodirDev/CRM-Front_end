import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/personalCard.css';

function Edit(props) {

       const dispatch = useDispatch();
       const [emp_info,setEmp] = useState("")
         const { id } = useParams();
    useEffect(() => {
        fetch("https://crmstore.herokuapp.com/editUser/" + id,{
            headers:{
                Authorization:JSON.parse(localStorage.getItem('jwt'))
            }
        })
            .then(data => data.json())
            .then(res => {
                console.log(res);
                setEmp(res)
            })
    }, [id])
    const navigate = useNavigate()
    const [name = emp_info.fish, setName] = useState(emp_info.fish);
    const [desc = emp_info.description, setDesc] = useState(emp_info.desc);
    const [tel = emp_info.tel, setTel] = useState(emp_info.tel);
    const [time = emp_info.assign_time, setTime] = useState(emp_info.time);
    const [login = emp_info.login,setLogin,] = useState(emp_info.login);
    const [role,setRole,] = useState(emp_info.role);

    function editUser(){
       
        fetch('https://crmstore.herokuapp.com/editUser/' + id,{
            method:"PUT",
            headers:{
                "Content-Type":'application/json',
                Authorization:JSON.parse(localStorage.getItem('jwt'))
            },
            body:JSON.stringify({
                fish:name,
                description:desc,
                tel:tel,
                login:login,
                assign_time:time,
                role
            })
            
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"red"})
            }else{
                M.toast({html:'Muvaffaqiyatli amalga oshirildi',classes:"green"})
                dispatch({ type: "EMP_FETCHED_INFO", payload: data });
                navigate('/employees')
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
                    <input type="text" class="form-control" id="floatingInput" defaultValue={emp_info.fish} onChange={e=>setName(e.target.value)} placeholder={emp_info.fish} />
                </div>
                <div class="">
                    <input type="text" class="form-control" id="floatingPassword" defaultValue={emp_info.description}  onChange={e=>setDesc(e.target.value)} placeholder={emp_info.description}  />
                </div>
                <div class="">
                    <input type="date" class="form-control" id="floatingPassword" defaultValue={emp_info.time}  onChange={e=>setTime(e.target.value)} placeholder={emp_info.time}  />
                </div>
                <div class="">
                    <input type="text" class="form-control" id="floatingPassword" defaultValue={emp_info.login}  onChange={e=>setLogin(e.target.value)} placeholder={emp_info.login}  />
                </div>
                <div class="">
                    <input type="number" class="form-control" id="floatingPassword" defaultValue={emp_info.tel}  onChange={e=>setTel(e.target.value)} placeholder={emp_info.tel}  />
                </div>
                <div className="">
                    <select defaultValue={emp_info.role} onChange={e=>setRole(e.target.value)} className="form-control">
                        <option value='user'>Xodim</option>
                        <option value='admin'>Adminstrator</option>
                        <option value='editor'>Ish boshqaruvchi</option>
                    </select>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={editUser}>O'zgartirish</button>
                </div>
            </div>
        </div>      
    );
}

export default Edit;