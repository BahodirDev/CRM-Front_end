import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/auth.css';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';
function Auth(props) {
    const [login,setLogin] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state);
    const navigate= useNavigate()
    const Login=()=>{
        fetch('http://localhost:5000/auth',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                login,
                password
            })
        })
        .then(data=>data.json())
        .then(res=>{
            if(res.error){
                M.toast({html:res.error,classes:'red'})
            }else{
                M.toast({html:"Muvaffaqiyatli amalga oshirildi",classes:'blue'})
                localStorage.setItem('user',JSON.stringify(res.user));
                localStorage.setItem('jwt',JSON.stringify(res.token));
                dispatch({type:"AUTH",payload:res.user});
                dispatch({type:"LOGIN",payload:true});
                console.log(res);
                navigate('/employees')
            }
        })
    }
    console.log(user);
    return (
        <div>
            <div className="container">
                <div className="form">
                    <h2 className="header">Ma`lumotlarni kiriting</h2>
                    <div className="form__div">
                        <input type="text" value={login} name="user" required className='form-control' onChange={e=>setLogin(e.target.value)} />
                            <label for="" className="form__label">Login</label>
                    </div>
                    <div className="form__div">
                        <input type="password" value={password} name="password" required className='form-control' onChange={e=>setPassword(e.target.value)} />
                            <label for="" className="form__label">Password</label>
                    </div>
                    <div className="form__div">
                            <button className='btn' style={{background:"#320449"}} onClick={Login}>Tasdiqlash</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;