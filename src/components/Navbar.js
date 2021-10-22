import React from 'react';

function Navbar() {
    return (
        <nav>
            <img  className='nav-logo' src='assets/logo.png' alt='logo' />
            <div className='nav-user-info'>
                <p>
                    Tarek Hassan
                </p>
                <img src='assets/profile.jpg' alt='user avatar'/>
            </div>
        </nav>
    );
}

export default Navbar;