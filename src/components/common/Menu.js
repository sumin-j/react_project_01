import {NavLink} from 'react-router-dom';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {motion, AnimatePresence, MotionConfig} from 'framer-motion';
import { Manipulation } from 'swiper';

const Menu = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, ()=>{
        return {
            open : () => setOpen(true),
            close : () => setOpen(false)
        }
    })
  return (
    <AnimatePresence>
        {open && (
            <motion.nav  initial={{x: -280, opacity:0}}
            animate={{x:0, opacity:1, trnasition:{type:'spring' ,bounce:0.7}}}
            exit={{x:-280, opacity:0}}
            onClick={()=>{
              setOpen(false);
              props.setToggle(!props.toggle)
            }}>
            <h1><NavLink exact to ='/'>Open Spaces</NavLink></h1>

            <ul id="gnb">
            <li><NavLink to='/department'>Department</NavLink></li>
            <li><NavLink to='/community'>Community</NavLink></li>
            <li><NavLink to='/gallery'>Gallery</NavLink></li>
            <li><NavLink to='/youtube'>Youtube</NavLink></li>
            <li><NavLink to='/location'>Location</NavLink></li>
            <li><NavLink to='/join'>Join</NavLink></li>
            </ul>
            </motion.nav>
        )}

    </AnimatePresence>
  
  )
})

export default Menu