import React from 'react'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RiCloseLargeFill } from 'react-icons/ri'
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const styles = {
        link: "hover:bg-white hover:text-slate-800 px-3 py-2 rounded-md transition-colors duration-300"
    }
  return (
    <nav className='bg-slate-800 p-3 text-white selection-none sticky top-0'>
        <div className='flex justify-between items-center mx-auto container'>
            <h1 className='text-xl md:text-3xl font-semibold'>Tech Blog</h1>

            <ul className='hidden md:flex space-x-4 '>
                <li>
                    <a href="#" className={styles.link}>Home</a>
                </li>
                <li>
                    <a href="#" className={styles.link}>Blogs</a>
                </li>
                <li>
                    <a href="#" className={styles.link}>Contact</a>
                </li>
                <li>
                    <a href="#" className={styles.link}>Signin</a>
                </li>
            </ul>
            <button className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
               {isMenuOpen ? <RiCloseLargeFill size={20} /> : <GiHamburgerMenu size={20} />}
            </button>
        </div>
        {/* mobile menu screen */}
           {isMenuOpen && ( <ul className='md:hidden flex flex-col space-y-2 mt-4 text-center '>
                <li>
                    <a href="#" className= {`${styles.link} block`}>Home</a>
                </li>
                <li>
                    <a href="#" className= {`${styles.link} block`}>Blogs</a>
                </li>
                <li>
                    <a href="#" className= {`${styles.link} block`}>Contact</a>
                </li>
                <li>
                    <a href="#" className= {`${styles.link} block`}>Signin</a>
                </li>
            </ul>)}
    </nav>
  )
}

export default Navbar