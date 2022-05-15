import Layout from '../common/Layout';
import Popup from '../common/Popup';
import {useRef, useEffect, useState} from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';


function Gallery() {
  const path = process.env.PUBLIC_URL;
  const frame = useRef(null);
  const input = useRef(null);
  const pop = useRef(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [enableClick, setEnableClick] = useState(true);
  const masonryOptions = { transitionDuration: '0.5s' };

  
  const getFlickr = async (opt) => {
    const key = 'ca24b6512eb290da467d30145c248418';
    const num = opt.count;
    const method_interest = 'flickr.interestingness.getList';
    const method_search='flickr.photos.search';
    const method_user = 'flickr.people.getPhotos';
    let url = '';

    if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&user_id=${opt.user}`;
		}

    await axios.get(url).then((json)=> {
      if(json.data.photos.photo.length === 0) {
        alert ('There are no images for that search term.');
        return;
      }
      setItems(json.data.photos.photo);
    });

    setTimeout(()=> {
      frame.current.classList.add('on');
      setLoading(false);
      setEnableClick(true);
    },1000);

  };

  const showSearch = () => {
    const result = input.current.value.trim();

    if(!result) {
      alert('Please enter your search term');
      return;
    }

    input.current.value = '';

    if(enableClick) {
      setEnableClick(false);
      setLoading(true);
      frame.current.classList.remove('on');

      getFlickr({
        type: 'search',
        count:100,
        tags: result,
      });
    }
  }

  useEffect(()=> {
    // getFlickr({
		// 	type: 'interest',
		// 	count: 100,
		// });

    getFlickr({
      type: 'user',
      count:100,
      user: '195483360@N06',

    })
  },[])


  return (
    <>
      <Layout name={'Gallery'}>
        <p>description</p>
      </Layout>

      {loading ? (
					<img className='loading' src={path + '/assets/loading.gif'} />
				) : null}
      <div className="wrap">
      <button className='interest_button' onClick={()=>{
        if(enableClick) {
          setEnableClick(false);
          setLoading(true);
          frame.current.classList.remove('on');

          getFlickr({
            type: 'interest',
            count: 20,
          });
        }
      }}>
       Interest Photos
      </button>

      <div className="searchBox">
        <input type="text" 
        ref={input}
        onKeyUp={(e)=>{
          if(e.key === 'Enter') showSearch();
        }}
        />
        <button onClick={showSearch}>Search</button>
      </div>

      <div className="frame" ref={frame}>
        <Masonry elementType={'div'} options={masonryOptions}>
        {items.map((item,idx)=> {
          return(
            <article key={idx}
            onClick={()=>{ 
              setIndex(idx);
              pop.current.open();
            }}>
              <div className="inner">
                <div className="pic">
                  <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}/>
                </div>
                <h2>{item.title}</h2>
              </div>


            </article>
          )
        })}
        </Masonry>
      </div>
      </div>

      
    </>


  )
}

export default Gallery