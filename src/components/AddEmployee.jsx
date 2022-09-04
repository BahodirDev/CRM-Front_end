import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/personalCard.css';
import M from 'materialize-css';

function AddEmployee(props) {

       const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('');
    const [login,setLogin,] = useState('');
    const [role,setRole,] = useState('user');

    const navigate = useNavigate()

    function addUser(){
        console.log(name,login,tel,desc);
        fetch('http://localhost:5000/addemployer',{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                fish:name,
                description:desc,
                password:password,
                login:login,
                tel:tel,
                role
            })
            
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"red"})
            }else{
                M.toast({html:data.msg,classes:"green"})
                dispatch({ type: "ADD_EMP", payload: data.data });
                navigate('/employees')
            }
        
        })
    }

    return (
        <div className='edit_card'>
            <div className='edit_box'>
                <div className=" mb-3">
                    <input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} placeholder="FISH"  />
                </div>
                <div className="">
                    <input type="text" className="form-control"  value={desc}  onChange={e=>setDesc(e.target.value)} placeholder="izoh"  />
                </div>
                <div className="">
                    <input type="text" className="form-control"  value={login} onChange={e=>setLogin(e.target.value)}  placeholder="login" />
                </div>
                <div className="">
                    <input type="number" className="form-control"  value={tel}  onChange={e=>setTel(e.target.value)} placeholder="Tel" />
                </div>
                <div className="">
                    <input type="password" className="form-control"  value={password}  onChange={e=>setPassword(e.target.value)} placeholder="password"  />
                </div>
                <div className="">
                    <select value={role} onChange={e=>setRole(e.target.value)} className="form-control">
                        <option value='user'>Xodim</option>
                        <option value='admin'>Adminstrator</option>
                        <option value='editor'>Ish boshqaruvchi</option>
                    </select>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={addUser}>Qo'shish</button>
                </div>
            </div>
        </div>      
    );
}

export default AddEmployee;