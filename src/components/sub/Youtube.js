import Layout from '../common/Layout';
import {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import Popup from '../common/Popup';
import { useSelector, useDispatch } from 'react-redux';
import {setYoutube} from '../../redux/action';

function Youtube() {
  // const [vids,setVids] = useState([]);
  // const [open,setOpen] = useState(false);
  // const [index,setIndex] = useState(0);

  // useEffect(()=>{
	// 	const key = 'AIzaSyAsLXDLpmXVgedQP2psx-xNl8y57og-eqw';
	// 	const playlistId = 'PLXjsRlnOZcXu7-jCCLy6upnf16-9PXimy';
  //   const num = 6;
	// 	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

  //   axios.get(url).then((json)=>{
  //     console.log(json.data.items);
  //     setVids(json.data.items);
  //   });
  // },[]);

  const vidData = useSelector((store)=>store.youtubeReducer.youtube);

  const pop = useRef(null);

  const [index,setIndex] = useState(0);

  return (
    
    <>
      <Layout name={'Youtube'}>
      <p>description</p>
      </Layout>

      <section className='youtube'>
        {vidData.map((vid,idx)=>{
          const tit = vid.snippet.title;
          const desc = vid.snippet.description;
          const date = vid.snippet.publishedAt;

          return(
            <article key={idx}
            onClick={()=>{
              pop.current.open();
              setIndex(idx);
            }}>
              <div className="pic">
                <img src={vid.snippet.thumbnails.standard.url}/>
              </div>
              <div className="con">
                <h2>{tit.length > 50 ? tit.substr(0,50)+'...' : tit}</h2>
                <p>{desc.length > 150 ? tit.substr(0,150) +'...' : desc}</p>
                <span>{date.split('T')[0]}</span>
              </div>
            </article>
          );
        })}
      </section>

        {/* {open ? <Popup setOpen={setOpen}>
				<iframe src={`https://www.youtube.com/embed/${vids[index].snippet.resourceId.videoId}`} frameBorder="0"></iframe>
			</Popup> : null} */}

      <Popup ref={pop}>
				{vidData.length !== 0 ? (
					<>
						<iframe
							src={`https://www.youtube.com/embed/${vidData[index].snippet.resourceId.videoId}`}
							frameBorder='0'></iframe>
						{/* Popup컴포넌트의 함수를 이용해 팝업 닫기 */}
						<span className='close' onClick={() => pop.current.close()}>
							close
						</span>
					</>
				) : null}
			</Popup>
    
    </>
    
  )
}

export default Youtube