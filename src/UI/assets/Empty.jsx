import React from 'react';
import '../../styles/assets/empty.css'
function Empty(props) {
    return (
        <div className='empty'>
            <div class="container">
                <div class="cart">
                    <div class="stand"></div>
                    <div class="basket">
                        <div class="rec-v"></div>
                        <div class="rec-v"></div>
                        <div class="rec-v"></div>
                        <div class="rec-v"></div>
                        <div class="rec-h"></div>
                        <div class="rec-h rec-h2"></div>
                    </div>
                    <div class="skate"></div>
                    <div class="wheels">
                        <div class="wheel"></div>
                        <div class="wheel"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Empty;