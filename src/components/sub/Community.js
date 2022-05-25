import Layout from '../common/Layout';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import {useRef, useState, useEffect} from 'react';

const path = process.env.PUBLIC_URL;

function Community() {
  const input = useRef(null);
  const textarea = useRef(null);
  const editInput = useRef(null);
  const editTextarea = useRef(null);
  const frame = useRef(null);
  const cursor = useRef(null);
  let isCursor = false;

  const getLocalData = () => {
    const data = localStorage.getItem('post');

    const dummyPosts = [
      {
        title : 'Are your products food safe?',
        content: 'Products like our Shelf Risers are perfect for storing food, but we do not recommend eating off of them.'
      },
      {
        title: 'Where are your products made?',
        content : 'Our products are designed in San Francisco and New York City and made in China.'
      },
      {
        title: 'Do you offer a warranty?',
        content : 'You can find our warranty policy here.'
      },
      {
        title: 'Where can I find the sizes of products?',
        content : 'Product dimensions are listed in the bulleted section just below the main description on each product page.'
      },
      {
        title: 'How do I assemble the shelf riser?',
        content : 'Place the wood shelf flat on the ground with Open Spaces logo facing upwards. Hold one steel leg in place over the corresponding holes (the flat panel should be on the inside with the wire legs on the outside). Screw in tightly and repeat on the opposite side.'
      },
      {
        title: 'How do I assemble the entryway rack?',
        content : 'For detailed instructions on how to assemble the Entryway Rack - click here.'
      }
    ];

    if(data) {
      return JSON.parse(data);
    }else {
      return dummyPosts;
    }
  }

  

  
  

  const [posts, setPosts] = useState(getLocalData());
  const [allowed, setAllowed] = useState(true);

  const resetPost = () => {
    input.current.value = '';
    textarea.current.value = '';
  }

  const createPost = () => {
    if (!input.current.value.trim() || !textarea.current.value.trim()) {
      alert('Please enter a title and content');
      return;
    }
    setPosts([
      {title:input.current.value, content:textarea.current.value},...posts,
    ]);
    resetPost();
  }

  const deletePost = (index) => { 
    setPosts(
      posts.filter((_, idx)=> idx !== index)
    )
  }

  const enableUpdate = (index) => {
    setAllowed(false);
    setPosts (
      posts.map((post, idx)=>{
        if(idx === index) post.enableUpdate = true;
        return post;
      })
    )
  }

  const disableUpdate = (index) => {
    setAllowed(true);
    setPosts(
      posts.map((post,idx)=> {
        if(idx === index) post.enableUpdate = false;
        return post;
      })
    )
  }

  const updatePost = (index) => {
    if (!editInput.current.value.trim() || !editTextarea.current.value.trim()) {
      alert ('Enter the title and body to be edited');
      return;
    }
    setPosts(
      posts.map((post, idx)=> {
        if(idx === index) {
          post.title = editInput.current.value;
          post.content = editTextarea.current.value;
          post.enableUpdate = false;
        }
        return post;
      })
    )
  }

  const mouseMove = (e) => {
    if(isCursor) {
      cursor.current.style.left = e.clientX + 'px';
      cursor.current.style.top = e.clientY + 'px';
    }
  }


  useEffect(()=>{
    localStorage.setItem('post',JSON.stringify(posts));
  },[posts])

  useEffect (() => {
    frame.current.addEventListener('mouseenter',()=> {
      isCursor=true;
      cursor.current.style.display = 'block'; 
    })
    frame.current.addEventListener('mouseleave',()=>{
      isCursor=false;
      cursor.current.style.dispaly = 'none';
    })

    window.addEventListener('mousemove',mouseMove);

    return()=>window.removeEventListener('mousemove', mouseMove)
  })

  return (
    <>
      <Layout name={'Community'} img={`community.jpg`}>
        <p>We created Give One as an extension of the Pattern family<br/>to help communities around the country better enjoy daily life.</p>
      </Layout>

      <section className='insta' ref={frame}>
      <div className="inner">
        <h2>Your belongings deserve great homes</h2>
        <p>Share your space: #CreateSpacetoEnjoy</p>
      </div>

      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        slidesPerView={7}>
          {[0,1,2,3,4,5,6,7,8,9].map((num)=>{
            return(
              <SwiperSlide
                key={num}
                onMouseEnter={()=>{
                  cursor.current.style = 'transform : scale(4)';
                }}
                onMouseLeave={()=>{ 
                  cursor.current.style = 'transform : scale(1)';
                }}>
                  <img src={`${path}/assets/insta${num+1}.jpg`}/>
              </SwiperSlide>
            )
          })}
        {/* <SwiperSlide>
          <img src={`${path}/assets/insta1.jpg`} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${path}/assets/insta2.jpg`} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${path}/assets/insta3.jpg`} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${path}/assets/insta4.jpg`} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${path}/assets/insta5.jpg`} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${path}/assets/insta6.jpg`} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${path}/assets/insta7.jpg`} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${path}/assets/insta8.jpg`} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${path}/assets/insta9.jpg`} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${path}/assets/insta10.jpg`} alt="" />
        </SwiperSlide>*/}
      </Swiper> 

      <div className="cursor" ref={cursor}></div>

      <span><a href="#">Follow us @getoepnspaces</a></span>
      </section>

      <section className="faq">
        <div className="inputBox">
          <h3>Have questions about your Free Move ?</h3>
          <span>CONTACT US ANYTIME</span>
          <a href="mailto:help@getopenspaces.com">help@getopenspaces.com</a>
          <input type="text" placeholder='Please enter a title.' ref={input}/><br/>
          <textarea  cols="30" rows="10" placeholder='Please enter a content' ref={textarea}></textarea><br/>

          <button onClick={resetPost}>Cancel</button>
          <button onClick={createPost}>Create</button>
        </div>

        <div className="showBox">
          {posts.map((post, idx)=> {
            return (
              <article key={idx}>
                {post.enableUpdate ?
                <>
                  <input type="text" defaultValue={post.title} ref={editInput} /> <br/>
                  <textarea cols="30" rows="10" ref={editTextarea}>{post.content}</textarea>

                  <div className="btns">
                    <button onClick={()=>disableUpdate(idx)}>cancle</button>
                    <button onClick={()=>updatePost(idx)}>save</button>
                  </div>
                </>  :
                <>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>

                  <div className="btns">
                    <button onClick={()=>{if(allowed)enableUpdate(idx);}}>edit</button>
                    <button onClick={()=>deletePost(idx)}>delete</button>
                  </div>
                </>
                
              }
              </article>
            )
          })}
        </div>
      </section>
    </>


  )
}

export default Community