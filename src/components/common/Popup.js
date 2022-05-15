// function Popup(props) {
//   return (
//     <aside className="pop">
//         <div className="con">
//             {props.children}
//             <span className="close" onClick={()=>{props.setOpen(false)}}>Close</span>
//         </div>
//     </aside>
//   )
// }

// export default Popup

import { forwardRef, useState, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const Popup = forwardRef((props, ref) => {
	const [open, setOpen] = useState(false);

	//해당 컴포넌트를 forwardRef로 감싸서
	//useImperativeHandle로 state변경함수를 내보냄
	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});

	return (
	
		<AnimatePresence>
			{open && (
				<motion.aside 
				className='pop' 
				initial={{opacity:0, scale:0}} 
				animate={{opacity:1, scale:1, transition: {duration: 0.3}}} exit={{opacity:0,scale:0}}> 
					<motion.div className='con' 
					initial={{opacity:1}} 
					animate={{opacity:1, transition:{delay:0.5}}}
					exit={{opacity:0}}>
						{props.children}
					</motion.div> 
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Popup;