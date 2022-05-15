import { Route,Switch } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {setYoutube, setMembers, setFlickr} from './redux/action';
import axios from 'axios';

// common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// main
// import Visual from './components/main/Visual';
// import Content from './components/main/Content';
import Main from './components/main/Main';

// sub
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Join from './components/sub/Join';

import './scss/style.scss';

const path = process.env.PUBLIC_URL;





function App() {

	const dispatch = useDispatch();

	const fetchYoutube = async () => {
		const key = 'AIzaSyAsLXDLpmXVgedQP2psx-xNl8y57og-eqw';
		const playlistId = 'PLXjsRlnOZcXu7-jCCLy6upnf16-9PXimy';
		const num = 6;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

		await axios.get(url).then((json) => {
			console.log(json.data.items);
			// setVids(json.data.items);
			// axios로 받아온 데이터를 setYoutube로 함수로 action 객체를 반환하고
			// 반환된 action객체를 dispatch로 reducer에 전달
			dispatch(setYoutube(json.data.items));

		});
	}
	const fetchMembers = async ()=> {
		const url = path+'/DB/member.json';
		
		await axios.get(url).then((json)=>{
			dispatch(setMembers(json.data.members));
		})
	}

	// const fectchFlickr = async () => {
	// 	const key = 'ca24b6512eb290da467d30145c248418';
    // 	const method_interest = 'flickr.interestingness.getList';
    // 	const num = 30;
    // 	const url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;

    // 	await axios.get(url).then((json)=>{
    //   	dispatch(setFlickr(json.data.photos.photo));
    // });
	// }

	// 해당 루트 컴포넌트가 마운트 되면 store에 데이터 저장
	useEffect(()=> {
		fetchYoutube();
		fetchMembers();
		
	},[])


	return (
		<>
		<Switch>
			{/* <Route exact path='/'>
				<Header type={'main'} />
				<Visual />
				<Content />
			</Route>

			<Route path='/'>
				<Header type={'sub'}/>
			</Route> */}
			<Route exact path='/' component={Main}/>
				{/* <Route path='/' component={()=> <Header type={'sub'}/>}/> */}

				<Route path='/' render={()=> <Header type={'sub'}/>}/> 
		</Switch>

		<Route path='/department' component={Department}/>

		<Route path='/community' component={Community}/>

		<Route path='/gallery' component={Gallery}/>

		<Route path='/youtube' component={Youtube}/>

		<Route path='/location' component={Location}/>

		<Route path='/join' component={Join}/>

		<Footer />
		</>
	);
}

export default App;
