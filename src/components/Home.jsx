import React from 'react';
import { useState } from 'react';
import '../styles/home.css'
function Home(props) {
    const [modal, setModal] = useState(false)
    return (
        <>
            <div>
                <button className='btn primary' onClick={() => setModal(!modal)}>Show</button>
            </div>
            {
                modal && <div className='modalka' onClick={() => setModal(!modal)}>
                    <div className='placeka' onClick={(e) => e.stopPropagation()}>
                        <div>
                            <h5>Loyiha dasturchisi:</h5>
                            <h3>Bahodirjon</h3>
                        </div>
                        <div>
                            <h5>Loyiha maqsadi:</h5>
                            <h6>Savdo sotiq bilan shug'ullanadigan magazin va do'konlar uchun, ishlaridagi yengillikni ta'minlash</h6>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

export default Home;