import React from 'react'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RiCloseLargeFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const styles = {
        link: "hover:bg-white hover:text-slate-800 px-3 py-2 rounded-md transition-colors duration-300"
    }
    const currentUser = useSelector((state)=> state.currentUser);
  return (

    <nav className='bg-slate-900 p-3 text-white selection-none sticky top-0 fixed '>
        <div className='flex justify-between items-center mx-auto container'>
            <h1 className='text-xl md:text-3xl font-semibold'>Tech Blog</h1>

            <ul className='hidden md:flex space-x-4 '>
                <li>
                    <Link to="/" className={styles.link}>Home</Link>
                </li>
                <li>
                    <Link to="/blogs" className={styles.link}>Blogs</Link>
                </li>
                <li>
                    <Link to="/contact" className={styles.link}>Contact</Link>
                </li>
                {!currentUser && 
                <li>
                    <Link to="/signin" className={styles.link}>Signin</Link>
                </li>
                }
                {currentUser && 
                <li>
                    <Link to="/dashboard" className={styles.link}>Dashboard</Link>
                </li>
                }

            </ul>
            <button className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
               {isMenuOpen ? <RiCloseLargeFill size={20} /> : <GiHamburgerMenu size={20} />}
            </button>
        </div>
        <Link></Link>
        {/* mobile menu screen */}
           {isMenuOpen && ( <ul className='md:hidden flex flex-col space-y-2 mt-4 text-center '>
                <li>
                    <Link to="/" className={`${styles.link} block`}>Home</Link>
                </li>
                <li>
                    <Link to="/blogs" className={`${styles.link} block`}>Blogs</Link>
                </li>
                <li>
                    <Link to="/contact" className={`${styles.link} block`}>Contact</Link>
                </li>
                {/* <li>
                    <Link to="/signin" className={`${styles.link} block`}>Signin</Link>
                </li> */}
                 {!currentUser && 
                <li>
                    <Link to="/signin" className=  {`${styles.link} block`}>Signin</Link>
                </li>
                }
                {currentUser && 
                <li>
                    <Link to="/dashboard" className= {`${styles.link} block`}>Dashboard</Link>
                </li>
                }
            </ul>)}
    </nav>
  )
}

export default Navbar