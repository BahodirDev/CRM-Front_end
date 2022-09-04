import React from 'react';
import { BiCategory, BiHistory, BiLogOut, BiRepost, BiTrophy } from 'react-icons/bi';
import { BsCart4, BsMegaphoneFill, BsPerson, BsType } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/leftBar.css';

function LeftBar(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    function logOut(){
        navigate('/auth')
        localStorage.clear();
        dispatch({type:"LOGIN",payload:false});
    }
    return (
        <div>
            <Link to={'/'}>
                <div className='left_bar_list'>
                    <span className='icons_space'>
                        <h5>Menu</h5>
                        <img src="data:image/png;base64,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" />
                    </span>
                </div>
            </Link>
            <Link to={'/store'}>
                <div className='left_bar_list'>
                    <span className='icons_space'>
                        <h5>Sotuv bo`limi</h5>
                        <BsMegaphoneFill style={{ fontSize: '40px', marginRight: '20px' }} />
                    </span>
                </div>
            </Link>
            <Link to={'/report'}>
                <div className='left_bar_list'>
                    <span className='icons_space'>
                        <h5>Sotuv Tarixi</h5>
                        <BiHistory style={{ fontSize: '40px', marginRight: '20px' }} />
                    </span>
                </div>
            </Link>
            <Link to={'/employees'}>
                <div className='left_bar_list'>
                    <span className='icons_space'>
                        <h5>Hodimlar</h5>
                        <BsPerson style={{ fontSize: '40px', marginRight: '20px' }} />
                        {/* <img src="https://img.icons8.com/bubbles/100/000000/contact-card.png" /> */}
                    </span>
                </div>
            </Link>
            <Link to={'/products'}>
                <div className='left_bar_list'>
                    <span className='icons_space'>
                        <h5>Mahsulotlar</h5>
                        <BsCart4 style={{ fontSize: '40px', marginRight: '20px' }} />
                    </span>
                </div>
            </Link>
            <Link to={'/category'}>
                <div className='left_bar_list'>
                    <span className='icons_space'>
                        <h5>Kategoriya</h5>
                        <BiCategory style={{ fontSize: '40px', marginRight: '20px' }} />
                    </span>
                </div>
            </Link>
            <Link to={'/auth'} onClick={logOut}>
                <div className='left_bar_list'>
                    <span className='icons_space'>
                        <h5>Tizim Chiqish</h5>
                        <BiLogOut style={{ fontSize: '40px', marginRight: '20px' }} />
                    </span>
                </div>
            </Link>
        </div>
    );
}

export default LeftBar;