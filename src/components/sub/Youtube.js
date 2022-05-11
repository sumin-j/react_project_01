import Layout from '../common/Layout';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Popup from '../common/Popup';

function Youtube() {
  const [vids,setVids] = useState([]);
  const [open,setOpen] = useState(false);
  const [index,setIndex] = useState(0);

  useEffect(()=>{
		const key = 'AIzaSyAsLXDLpmXVgedQP2psx-xNl8y57og-eqw';
		const playlistId = 'PLXjsRlnOZcXu7-jCCLy6upnf16-9PXimy';
    const num = 6;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

    axios.get(url).then((json)=>{
      console.log(json.data.items);
      setVids(json.data.items);
    });
  },[]);

  return (
    
    <>
      <Layout name={'Youtube'}>
      <p>description</p>
      </Layout>

      <section>
        {vids.map((vid,idx)=>{
          const tit = vid.snippet.title;
          const desc = vid.snippet.description;
          const date = vid.snippet.publishedAt;

          return(
            <article key={idx}
            onClick={()=>{
              setOpen(true);
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

        {open ? <Popup setOpen={setOpen}>
				<iframe src={`https://www.youtube.com/embed/${vids[index].snippet.resourceId.videoId}`} frameBorder="0"></iframe>
			</Popup> : null}
    
    </>
    
  )
}

export default Youtube