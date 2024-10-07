import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

//contains few gen ai content

const Navbar = ({ searchTerm, setSearchTerm }) => {
    return (
        <nav className='navbar'>
            <div className='store_name'>GamingVerse</div>
            <ul className='nav_list'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/products'>Products</Link></li>
                <li><Link to='/cart'>Cart</Link></li>
                <li className='wishli'><Link to='/Wishlist'>WishList</Link></li>
            </ul>
            <div className='nav_div'>
                <input 
                    type='text' 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder='Search products...' 
                    className='search-input'
                />
            </div>
        </nav>
    );
}

export default Navbar;
