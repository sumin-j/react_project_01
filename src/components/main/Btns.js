function Btns(props) {
	const arr = Array.from(Array(props.num).keys());
	let num = 0

	return (
		<ul className='scroll_navi'>
			{arr.map((_, idx) => {
				let active = '';
				idx === 0 ? (active = 'on') : (active = '');

				return (
					<li
						key={idx}
						className={active}
						onClick={() => props.setIndex(idx)}>

					</li>
					
						
				);
			})}
		</ul>
	);
}

export default Btns;