import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';
import {useState, useRef, useEffect} from 'react';


function Header(props) {
    const menu = useRef(null);
    const active = {background:'#1f464a', borderRadius:'16px', color:'#fff'};
    const [toggle, setToggle] = useState(false);

    useEffect(()=> {
        toggle ? menu.current.open() : menu.current.close();
    },[toggle])
  return (
    <>
        <header className={props.type}>
        <div className="inner">
            <h1>
                <NavLink exact to='/'>Open spaces</NavLink>
            </h1>

            <ul id="gnb">
                <li>
                    <NavLink activeStyle={active} to='/department'>Department</NavLink>
                </li>
                <li>
                    <NavLink activeStyle={active} to='/community'>Community</NavLink>
                </li>
                <li>
                    <NavLink activeStyle={active} to='/gallery'>Gallery</NavLink>
                </li>
                <li>
                    <NavLink activeStyle={active} to='/youtube'>Youtube</NavLink>
                </li>
                <li>
                    <NavLink activeStyle={active} to='/location'>Location</NavLink>
                </li>
                {/* <li>
                    <NavLink activeStyle={active} to='/join'>Join</NavLink>
                </li> */}
            </ul>

            <div className="util">
            <a href="#" className='myPage'>
                <NavLink to='/join'>
                    <FontAwesomeIcon icon={faCircleUser} />  
                </NavLink>
  
            </a>

            <a className='menuMo'>
                <FontAwesomeIcon icon={faBars} onClick={()=> setToggle(!toggle)}></FontAwesomeIcon>
            </a>
            </div>

        </div>
    </header>

            <Menu ref={menu} toggle={toggle} setToggle={setToggle}/>

    </>
  )
}

export default Header