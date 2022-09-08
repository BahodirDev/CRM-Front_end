import React from 'react';

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg #4a148c  " style={{marginTop:'0px',background:'#320449'}}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav"style={{margin:'0 auto'}}>
            <h3 id='fromText'>CRM for store</h3>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;