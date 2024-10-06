import react from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'


const Navbar=()=>{
    return(
      
        <nav className = 'navbar'>
            <div className='store_name'>
                GamingVerse
            </div>
            
            <ul className='nav_list'>
                <li><Link to ='/'>Home</Link></li>
                <li><Link to = '/products'>Products</Link></li>
                <li><Link to ='/cart'>Cart</Link></li>
                <li className='wishli'><Link to = '/Wishlist'>WishList</Link></li>
                
            </ul>
          
        </nav>

      
    )

 }

export default Navbar;