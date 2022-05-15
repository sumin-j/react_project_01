import Layout from '../common/Layout';
import {useRef, useEffect, useState} from 'react';

const path = process.env.PUBLIC_URL;


function Location() {
  const {kakao} = window;
  const container = useRef(null);

  const info = [
    {
      title : 'Shinsegae',
      latlng : new kakao.maps.LatLng(37.5049693, 127.0042386),
      imgSrc : `${path}/assets/marker.png`,
      imgSize :new kakao.maps.Size(64, 69) ,
      imgPos : {offset: new kakao.maps.Point(27, 69)}
    },
    {
      title : 'Galleria',
      latlng : new kakao.maps.LatLng(37.5281284, 127.0408146),
      imgSrc : `${path}/assets/marker.png`,
      imgSize :new kakao.maps.Size(64, 69) ,
      imgPos : {offset: new kakao.maps.Point(27, 69)}
    },
    {
      title : 'Hyundai',
      latlng : new kakao.maps.LatLng(37.3925837, 127.1119894),
      imgSrc : `${path}/assets/marker.png`,
      imgSize :new kakao.maps.Size(64, 69) ,
      imgPos : {offset: new kakao.maps.Point(27, 69)}
    }
  ]

  const [map, setMap] = useState(null);
  const branch = useRef(null);
  const [mapInfo] = useState(info);
  const [traffic, setTraffic] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(()=>{
    container.current.innerHTML = '';

    const options = { 
      center: mapInfo[index].latlng,
      level: 3 
  };
    var map = new kakao.maps.Map(container.current, options);
    
    setMap(map);

    const markerPosition = mapInfo[index].latlng;

    const imageSrc = mapInfo[index].imgSrc; 
    const imageSize = mapInfo[index].imgSize;
    const imageOption = mapInfo[index].imgPos;

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    var marker = new kakao.maps.Marker({
      position: markerPosition, 
      image: markerImage // 마커이미지 설정 
  });

  marker.setMap(map); 

      const branch_li = branch.current.querySelectorAll("li");
      for(const btn of branch_li) btn.classList.remove("on");
      branch_li[index].classList.add("on");

      var mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      const mapInit = () => { 
        console.log('마커 중앙 유지');
        map.setCenter(mapInfo[index].latlng);
      }

      window.addEventListener('resize',mapInit);

      return() => {
        window.removeEventListener('resize',mapInit)
      }


  },[index])

  useEffect(()=>{
    if (map) {
      traffic
        ? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
        : map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    }
  },[traffic])

  return (
    <>
      <Layout name={'Location'}>
        <p>description</p>
      </Layout>

      <section className="map">
        <div id="map" ref={container}></div>


      <button onClick={()=>setTraffic(!traffic)}>
        {traffic ? 'Traffic Off' : 'Traffic On'}
      </button>
     

      <ul className='branch' ref={branch}>
        {mapInfo.map((item,idx)=>{
          return(
            <li key={idx} onClick={()=>setIndex(idx)}>
              {item.title}
            </li>
          )
        })}
      </ul>

      
      </section>
    </>
  )
}

export default Location