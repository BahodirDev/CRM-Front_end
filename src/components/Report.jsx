import React, { useState } from 'react';
import { useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { BsTrash, BsTrash2 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../styles/report.css"

function Report(props) {
    const {user} = useSelector(state=>state)

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [person, setPerson] = useState('');
    const [date, setDate] = useState('');



    //---- ekranga chiqadigan massivlar---///
    const [categories, setCategories] = useState([]);
    const [persons, setPersons] = useState([]);

    const dispatch = useDispatch()
    const {reports,searching} = useSelector(state=>state)
    useEffect(() => {
        dispatch({type:'FETCHING'})
        fetch('http://localhost:5000/getHistory')
            .then(data => data.json())
            .then(res => {
                dispatch({type:"REPORT",payload:res})
                console.log(res);
            })
        fetch('http://localhost:5000/getCategory')
            .then(data => data.json())
            .then(res => {
                
                setCategories(res)
                console.log(res);
            })
        fetch('http://localhost:5000/allList')
            .then(data => data.json())
            .then(res => {
              
                setPersons(res)
                console.log(res);
            })
    }, []);

    function filterReport(e) {
            setDate(e.target.value)
            fetch(`http://localhost:5000/getQuery`,{
                method:"POST",
                headers:{
                    "Content-Type":'application/json',
                    Authorization:JSON.parse(localStorage.getItem('jwt'))
                },
                body:JSON.stringify({
                   date:e.target.value
                })
            })
            .then(data=>data.json())
            .then(res=>{
                if(res.error){
                    M.toast({html:res.error,classes:'red'})
                }else{
                    console.log(res);
                    dispatch({type:"FILTER_QUERY",payload:res})
                }
            })
        
       
    }
    function filterReport33(e) {
        setName(e.target.value)
            fetch(`http://localhost:5000/getQuery`,{
                method:"POST",
                headers:{
                    "Content-Type":'application/json',
                    Authorization:JSON.parse(localStorage.getItem('jwt'))
                },
                body:JSON.stringify({
                   name:e.target.value
                })
            })
            .then(data=>data.json())
            .then(res=>{
                if(res.error){
                    M.toast({html:res.error,classes:'red'})
                }else{
                    console.log(res);
                    dispatch({type:"FILTER_QUERY",payload:res})
                }
            })
        
       
    }
    function filterReport2(e) {
        setPerson(e.target.value)
           if(name.length < 0){
            M.toast({html:"Mahsulot nomini kiritng",classes:'red'})
           }else{
            fetch(`http://localhost:5000/getQuery`,{
                method:"POST",
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify({
                    person:e.target.value,
                })
            })
            .then(data=>data.json())
            .then(res=>{
                if(res.error){
                    M.toast({html:res.error,classes:'red'})
                }else{
                    console.log(res);
                    dispatch({type:"FILTER_QUERY",payload:res});

                }
            })
           }
        
       
    }
    function filterReport3(e) {
        setCategory(e.target.value)
           if(name.length < 0){
            M.toast({html:"Mahsulot nomini kiritng",classes:'red'})
           }else{
            fetch(`http://localhost:5000/getQuery`,{
                method:"POST",
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify({
                    category:e.target.value
                })
            })
            .then(data=>data.json())
            .then(res=>{
                console.log(res);
                if(res.error){
                    M.toast({html:res.error,classes:'red'})
                }else{

                    dispatch({type:"FILTER_QUERY",payload:res})
                }
            })
           }
        
       
    }
    const generelReport =() =>{
        fetch(`http://localhost:5000/getQueryReport`,{
                method:"POST",
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify({
                    category,
                    name,
                    person,
                    date
                })
            })
            .then(data=>data.json())
            .then(res=>{
                console.log(res);
                if(res.error){
                    M.toast({html:res.error,classes:'red'})
                }else{
                    setName('')
                    setCategory('')
                    setPerson('')
                    setDate('')
                    dispatch({type:"FILTER_QUERY",payload:res})
                }
            })
    }

    const remove = (id)=>{
        fetch('http://localhost:5000/removeReport/'+id,{
            method:"DELETE"
        })
        .then(data => data.json())
        .then(res => {
            if(res.error){
                M.toast({html:res.error,classes:'red'})
            }else{
                M.toast({html:"Muvaffaqiyatli amalga oshirildi",classes:"blue"})
                dispatch({type:"REPORT_DELETE",payload:res})
                console.log(res);
            }
           
        })
    }


    // summa
    let totalCost = reports.reduce((box,val)=>{
        return box += (val.amount * val.sale_price)
    },0)

    return (
        <div className='report'>
            <div className='report_bar'>
                <div style={{borderRight:"1px solid #eeeee"}}>
                    <input type="date" className='form-control'  placeholder='Qidiruv' onChange={filterReport} /> 
                </div>
                <div>
                <select className='form-control' onChange={filterReport2}>
                           <option value={user.id} disabled>.....</option>
                        {
                            persons && persons.map((val,idx)=>{
                                return (
                                    <option value={val._id} key={idx}>{val.fish}</option>
                                )
                            })
                        }
                    </select>
                    <select className='form-control' onChange={filterReport3}>
                           <option>.....</option>
                        {
                            categories && categories.map((val,idx)=>{
                                return (
                                    <option value={val.cat_name} key={idx}>{val.cat_name}</option>
                                )
                            })
                        }
                    </select>
                    <div>
                        <h6>
                            umumiy summa: {totalCost.toLocaleString('en-US')}
                        </h6>
                    </div>
                </div>
                <div style={{borderRight:"1px solid #eeeee"}}>
                    <input type="text" className='form-control' value={name}  placeholder='Qidiruv' onChange={filterReport33} /> 
                    <button className='btn blue' onClick={generelReport}>Qidiruv</button>
                </div>
            </div>
            <table className='centered'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nomi</th>
                        <th>Kategoriya</th>
                        <th>Miqdor</th>
                        <th>Sotilgan</th>
                        <th>Umumiy Narx</th>
                        <th>Sana</th>
                        <th>Xodim</th>
                        <th>Sozlamalar</th>
                    </tr>
                </thead>

                <tbody>
                    {
    
                        reports.length &&
                        reports.map((val, idx) => {
                            console.log('reports');
                            return (
                                <tr key={idx}>
                                     <td>{idx+1}</td>
                                    <td>{val.product_id.name}</td>
                                    <td>{val.product_id.cat_id}</td>
                                    <td>{val.amount}</td>
                                    <td>{val.sale_price.toLocaleString("en-US")}</td>
                                    <td>{(val.sale_price * val.amount).toLocaleString("en-US")}</td>
                                    {/* <td>{(new Date(val.updated_at)).toLocaleTimeString()}</td> */}
                                    <td>{val.createdAt}</td>
                                    <td>{val.postedBy.fish}</td>
                                    <td>
                                        <span onClick={()=>remove(val._id)}>
                                          <BsTrash  className='BcClass'/>
                                        </span>
                                        <Link to={'/edit_report/'+val._id}>
                                          <BiEdit  className='BcClass'/>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }).reverse()
                    }

                </tbody>
            </table>
        </div>
    );
}

export default Report;