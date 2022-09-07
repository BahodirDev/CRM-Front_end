import React from 'react';
import { useEffect } from 'react';
import '../styles/rightbar.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlertModal from '../UI/modal/AlertModal';
import {BiAddToQueue, BsFillBookmarkPlusFill} from 'react-icons/all' 

function RightBar(props) {

  const dispatch = useDispatch();
  const { employees, isRemove, spec_id} = useSelector(state => state)
  const [alerts,setAlert] = useState(false);
  const [getId,setGetId] = useState('');
  useEffect(() => {
    dispatch({ type: "FETCHING" })
    fetch("http://localhost:5000/allList")
      .then(data => data.json())
      .then(res => {
        dispatch({ type: "EMP_FETCHED", payload: res });
      })
  }, [])
  
    const navigate = useNavigate()

    const deleItem = (id)=>{
      if(id){
        fetch("http://localhost:5000/remove_item/"+id,{
          headers:{
            Authorization:JSON.parse(localStorage.getItem('jwt'))
          },
          method:"DELETE"
        })
        .then(data=>data.json())
        .then(res=>{
          if(res.error){
            M.toast({html:res.error,classes:'red'})
            }else{
            M.toast({html:"Muvaffaqiyatli amalga oshirildi",classes:'blue'})
              dispatch({type:"REMOVE_FROM_EMP",payload:res})
              setAlert(false);
          }
      
  
        })
      }else{
      setAlert(false);
      }
    }


  return (
    <div className='emp_list'>
      <div>
        <div>
          
        </div>
        <table className='table table-striped table-hover centered'>
          <thead>
            <tr className='tr_box'>
              <th className='tr'>No</th>
              <th className='tr'>Fish</th>
              <th className='tr'>Tel:</th>
              <th className='tr'>izoh</th>
              <th className='tr'>
              <span className='edit_controllers' onClick={()=>navigate('/employeesAdd')}>
                  <BiAddToQueue style={{fontSize:'40px',color:"blue"}} />
              </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              employees &&
                employees.length ?
                employees.map((val, idx) => {
                  return (
                    <tr className='tr_box' key={idx}>
                      <td className='tr'>{idx + 1}</td>
                      <td className='tr'>{val.fish}</td>
                      <td className='tr'>{val.tel}</td>
                      <td className='tr'>{val.description}</td>
                      <td>
                        <Link to={`/show/${val._id}`} className='edit_icons'>
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAADqklEQVRYhb3YW4hVVRgH8N+ZGY5aOKaNl6CbWmHhUBLZDUvNHqIgAguLbg/dHgqit2ygjIrooYyu0ENZdKOUIdOIMaIIo2IwuhBdMB0hzSKjlJlm0tPDt05nz3jO7HNmjvOHzV5rr+9867+/9d32KThymImpDcj/eaSIFNGPUgPX7rYGNpiM2RjArzmybUn+BmytQ/cVeKSlDsGz0C3MuAN78DPuxaSc3+5O91sTucVYhd9xM+ZjO/ZCHpnr8BnacT06cSleQxc+xSu4R1hjHu7HVxkdHVgkrHpaGren+9yc/f/HORjEmhrrd2EI6/EH+nAIO/GY8INL6txrFfaPJtCDzZl5y4jxm3gjze/EASxLa5NwEH8lonnXfuyr5cAzkuLL0/xKPIWTxNF14VVhndtwoziyD5P8P1iOWaO97QjsqrVwtjDzcWk+HZel8SzhN1Pwgnj7XxLRcaGWZQbSfYaIiAKWitxxalrrEVHSkkjvHC+ZWtH0E/7GkozcxeIY1uLozPMl6B0vkTw8KyKkPfNsmsiuZdwi/OOUHF0nirCfh2PHQmamSHJf4Pgq6zclIl05elYanvb71UiWBeEXa3FGlfXZicgg1onIOQofqzj5tnTP4qDI2o+Ko+xEa1rbJ7LuYWjD47gIz1dRSjhwCecnxQN4EW9VU5hwjEiW3wvLXp0hk8Xm9GIIy3ybFD8wivKxoFdE3Dt4ogaZdSJ/ISzzEe4QeaOaZYaxz2CKqEnVepbpOFP401acWw/7ggjTh7CwyvqctNnJad4i6g+RiV9WybpZ/IsNIik2DcuEtaaljYeEw87FffiumZvltRD96b4S14qM2yrahKJIjBNGpoyiCNffEsFFwmcmFOepFMz30rhPdGaD+LyZm9XbAw+Jqt0hktYJeFeUgcVVSE1tQHcZB/IEypbpSPMFKkVyjYisftGSlrE8PW/ky6CE7Y2yX4+n8Vya92KTiLROrBY1bVB0/PViKe5ulEzR8CJXEpn7G7wkclW3cPYtuEClDamGIVFaOmj8XGvhbdEDdascE5Gnrhrld4fwQXnSLDLwpXDmDSL04eF05eF06s8z9WKvTOHDg/haNFXb8CSuEeXnMDTTMtWwUbQgu/CMaCn6RNM2YWRasSKNfxT98w7h/OWGfkVGfmE9ZEa2FIUa4yz2JL09ObpH4oc8gTkiTG/HhaLL2yg+2D/B6w1uOG6sToRKeF+8eUl8Jy2YaDJEY17+x2CyaN6LtcXHhv8A0JjnAMCVP40AAAAASUVORK5CYII=" />
                        </Link>
                        <Link to={`/edit/${val._id}`} className='edit_icons'>
                          <img src="data:image/png;base64,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" />
                        </Link>
                        <span onClick={() =>{
                           setGetId(val._id)
                           setAlert(!alerts);
                        }} className='edit_icons'>
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACZklEQVRYhe2XP2sUURTFf3dirBJBkk6LRNBgMCCWWlmIjZZaCDY2fgZJo4X4MewE9QukEWxioQhCSOIfsEmKGYKkkFTr3GOxM7svu/Pmz26RJg9mmHf3zj3n3XvfebNwOk54WGvPB+9mkuWVFxhX6h31w3//fM77h3mbsGdaE1hauSO0jpI+bTNQ8ZsBUjEXLK1sAhttwlZn4NmvVUzXMa0h1oBVxEWM2VZkRQ9jH9jB2EK2hewbry7vNBNY372Jks1WQF2H+S1eXv0UmsZLcHD0hYVz95fX5t9gzFcG0shjMZc05ifAXX/3vx894mz6eYxTjOyND4fbwOqxeCWaIsCBXYMJ4Gxv3Vu8VoWTxAgAaQis/q14LkCk4iK4VPgObY7SGEh0F5hb5lYihSsbpIJBxkdWPLSrfC/rTCAnz0w2LTDqT7sTMCxTR+CqXihu3Ql4bhnmBDidgQdmn4SAKS1boAjXqvtD4KAEEzSh8gwlA5Bwi7cFLnshd5ugB3qW+cxo0IZUVzQhwMxsnEBUB87PLWQSHu53BPJSB8Y1ILQNdUCaSxcPOhP4eNv+SX44KipV4hMBLjPx5+tT68Vwao9jYRliobK+MJbqKqmu04DaDADgnkZX5uP2Klk2xWW4OQMii6mggqXXCpRUm4FaAo5lFgMe1YSIJLvVl6A+A/nw5cajeAS49PFpMpAYqXsDcNCUEYGavAecPCM4EUOQaN2DmwRYMkUPuDKTtQMe7s3jPskUJSC3vXIdXb8BStY9JXt1EI1/TC69TZ8YuouwMLqXDn68N0pjXyZsY+/xhddNGKfjRMd/nJZgP9lO33gAAAAASUVORK5CYII=" />
                        </span>
                      </td>
                    </tr>
                  )
                }) : 'Sahifa bo`sh'
            }
          </tbody>
        </table>
      </div>
     {alerts &&  <AlertModal title={'Siz shu xodimni o`chirmoqchimisiz...?'} alerts={alerts} callBack={deleItem} setAlert={setAlert} id={getId} />}
    </div>
  );
}

export default RightBar;