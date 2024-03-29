import {useEffect, useRef} from 'react';
const path = process.env.PUBLIC_URL;


function Layout(props) {
    const frame = useRef(null);

    useEffect(()=>{
        frame.current.classList.remove("on");
        frame.current.classList.add("on");
    },[])

  return (
    
    <section className={`content ${props.name}`} ref={frame}>
        <figure>
          <img src={`${path}/assets/${props.img}`}/>
        </figure>

        <div className="inner">
            <h1>{props.name}</h1>
            
            {props.children}
            
        </div>

        
    </section>
    
    
  );
}

export default Layout