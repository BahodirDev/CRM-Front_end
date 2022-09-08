import React, { useState } from 'react';
import { useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { RiAddCircleLine, RiDeleteBin2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import "../styles/products.css"
import AlertModal from '../UI/modal/AlertModal';
import ListModal from '../UI/modal/ListModal';

function Products(props) {

    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state);
    const [alerts,setAlert] = useState(false);
    const [getId,setGetId] = useState('');
    const [search,setSearch] = useState([]);


    useEffect(() => {
        fetch('https://crmstore.herokuapp.com/allProducts')
            .then(data => data.json())
            .then(res => {
                dispatch({ type: "PRODUCTS_FETCHED", payload: res })
            })
    }, [])


    function deleteItem(id){
        if(id){
            fetch("https://crmstore.herokuapp.com/remove_product/"+id,{
                headers:{
                    Authorization:JSON.parse(localStorage.getItem('jwt'))
                },
              method:"DELETE"
            })
            .then(data=>data.json())
            .then(res=>{
                if(res.error){  
                    M.toast({html:res.error,classes:"red"})

                }else{
                    M.toast({html:"O`chirildi",classes:"black"})
                    dispatch({type:"REMOVE_FROM_PRO",payload:res})
                    setAlert(false);
                }
           
      
            })
          }else{
          setAlert(false);
          }
    }

    function Search(e){
        // setSearch(e.target.value);
        
        fetch("https://crmstore.herokuapp.com/search_item/"+e.target.value)
            .then(data=>data.json())
            .then(res=>{
                if(res.error){
                    console.log(res.error)
                }else{

                    setSearch(res)
                }
            })
    }

    if (loading === 'loading') {
        return <Loader />
    }
    return (
        <>
        <div className='item_subnavbar'>
            <div className='search_products'>
                <input type="text" className='form-control' style={{marginBottom:"0px",width:"500px"}}  onChange={Search} placeholder='Qidiruv' />
            </div>
            <span>
               <Link to={'/add_item'}>
               <RiAddCircleLine className='item_icons' />
               </Link>
            </span>
        </div>
            <div className='products'>
                {
                    products &&
                        products.length ?
                        products.map((val, idx) => (
                            <div className="cards" key={idx}>
                                <div className="card_body">
                                    <Link to={`/store/show_item/${val._id}`} style={{ textDecoration: 'none' }}>
                                        <h6>{val.name}</h6>
                                    </Link>
                                    <div className='products_list'>
                                        <span>
                                            miqdor:       {val.amount}
                                        </span>
                                        <span>
                                            Sotuv narxi:       {val.sale_price}
                                        </span>
                                        <span>
                                            izoh: {val.description && val.description.slice(0, 12)}
                                        </span>

                                        {val.deadLine !== null &&
                                            <span>
                                                {val.deadLine}
                                            </span>
                                        }

                                    </div>
                                    <div style={{ display: 'flex', justifyContent: "space-around", marginTop: '20px' }}>
                                        <i>
                                           <Link to={`/edit_item/${val._id}`}>
                                           <BsPencilSquare className='item_icons' style={{ color: 'blueviolet' }} />
                                           </Link>
                                        </i>
                                        <i>
                                            <RiDeleteBin2Fill className='item_icons' style={{ color: 'black' }} onClick={()=>{
                                                setGetId(val._id);
                                                setAlert(!alerts)
                                            }} />
                                        </i>
                                    </div>
                                </div>
                            </div>
                        )) : "Mahsulot topilmadi"
                }
            </div>
            {alerts && <AlertModal alerts={alerts} title={'Siz shu mahsulotni o`chirmoqchimisiz...?'} setAlert={setAlert} callBack={deleteItem} id={getId} />}
            {search.length >= 1 && <ListModal massiv={search} setSearch={setSearch} />}
        </>
    );
}

export default Products;