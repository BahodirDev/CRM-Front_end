import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Modal.css';

function ListModal(props) {
    const {massiv = [],setSearch} = props;
    return (
        <div className='Modal' onClick={()=>setSearch([])}>
            <div className='modal_views' onClick={(e)=>e.stopPropagation()}>
            {
                massiv.length >= 1 &&
                massiv.map((val,idx)=>{
                    return(
                        <Link to={'/store/show_item/'+val._id} className="search_place">
                            <div>
                                <b>{val.name}</b>                                
                            </div>
                            <div>
                                <p>{val.amount}</p>                                
                            </div>
                            <div>
                                <p>Asl narxi: {val.orginal_price}</p>                                
                            </div>
                            <div>
                                <p>Sotuv narxi: {val.sale_price}</p>                                
                            </div>
                        </Link>
                    )
                })
            }
            </div>
        </div>
    );
}

export default ListModal;