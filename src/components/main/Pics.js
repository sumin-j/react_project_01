import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import Popup from '../common/Popup';

function Pics(props) {
	const scrolled = props.scrolled;
	const start = props.start;
	const base = 400;
	const position = scrolled - start + base;

	const pics = useSelector((store) => store.flickrReducer.flickr);
	const [index, setIndex] = useState(0);
	const pop = useRef(null);

	return (
		<>
			<section id='pics' className='myScroll'>
				<h2 style={
						position >= 0
							? { transform: `translateX(${position / 1.2}px)` }
							: null
					}>Quality</h2>
				<h2 style={
						position >= 0
							? { transform: `translateX(${position / -9}px)` }
							: null
					}>Responsibility</h2>
				<h2 style={
						position >= 0
							? { transform: `translateX(${position / -1}px)` }
							: null
					}>Versatility</h2>
				
				<ul className='list'>
					{pics.map((pic, idx)=> {
						if (idx < 3) {
							return (
								<li key={idx}
								onClick={()=>{
									setIndex(idx);
									pop.current.open();
								}}
								style={
									position >= 0 
									?  { transform: `translateY(${position / -1.2}px)` }
									: null
								}
								>
									<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} />
								</li>
							)
						}
					})}
				</ul>
			</section>

			<Popup ref={pop}>
				{pics.length !== 0 && (
					<>
						<img
							src={`https://live.staticflickr.com/${pics[index].server}/${pics[index].id}_${pics[index].secret}_b.jpg`}
						/>
						<span className='close' onClick={() => pop.current.close()}>
							close
						</span>
					</>
				)}
			</Popup>
		</>
	);
}

export default Pics;