import React from 'react';
import { useDispatch } from 'react-redux';
import '../../styles/Modal.css'


function AlertModal(props) {

    const dispatch = useDispatch()

    const {title,setAlert,alerts,id,callBack} = props;
    return (
        <div className='Modal' onClick={()=>setAlert(!alerts)}>
            <div className='modal_view' onClick={e=>e.stopPropagation()}> 
                <p>{title}</p>
                <div>
                  <button className='btn btn-danger' id='modal_btn'onClick={()=>{
                    callBack(id)
                  }}>Ha</button>
                  <button className='btn btn-info' id='modal_btn'onClick={()=>setAlert(!alerts)}>Yo`q</button>
                </div>
            </div>
      </div>
    );
}

export default AlertModal;