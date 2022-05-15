import React from 'react';
const path = process.env.PUBLIC_URL;

function Visual() {
  return (
    <figure className='myScroll'>
      <video src={`${path}/assets/intro.mp4`} muted loop autoPlay></video>
      <a href="#">Shop now</a>
    </figure>
  )
}

export default Visual