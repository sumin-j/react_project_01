import {useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons';

const path = process.env.PUBLIC_URL;

function News() {
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
          
    ];

    

    if(data) {
      return JSON.parse(data);
    }else {
      return dummyPosts;
    }
  }

 
  const [posts] = useState(getLocalData());

  useEffect(()=>{
    // post가 변경될때마다 해당 state를 문자열로 변환해서 로컬 저장소에 저장
    localStorage.setItem('post',JSON.stringify(posts));
  },[])

  return (
    
      <section id="info" className='myScroll'>
      <div className="inner">
      <div div className="news">
        <img src={`${path}/assets/news.jpg`} alt="" />
        <h1>Can I help you?</h1>
        <span></span>
        {posts.map((post,idx)=>{
          if(idx < 3) {

            return (
              <li key={idx}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </li>
            )
         }
        
          })}
      </div>
      <section className='review'>
        <h2>Customer Reviews</h2>

        <div className="search">
          <span>Filter Reviews</span>
          <input type="text" placeholder='Search' />
        </div>

        <div className="content">
          <div className="user-photo">
            <img src={`${path}/assets/user1.jpeg`} alt="user1" />
            <span className='user-status'></span>
          </div>
          <div className="user-name">Chris M.
            <span>Verified</span>
          </div>
          <div className="star">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />    
          <FontAwesomeIcon icon={faStar} />    
          <FontAwesomeIcon icon={faStar} />    
          <FontAwesomeIcon icon={faStar} /> 
          </div>       

          <strong>Perfect rack for small spaces</strong>
          <p>I needed a way to keep all of my different activity shoes neatly tucked away but also nearby! This rack proviede the perfect solution.</p>
        </div>

        <div className="content">
          <div className="user-photo">
            <img src={`${path}/assets/user2.jpeg`} alt="user2" />
            <span className='user-status'></span>
          </div>
          <div className="user-name">SABINA.
            <span>Verified</span>
          </div>
          <div className="star">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />    
          <FontAwesomeIcon icon={faStar} />    
          <FontAwesomeIcon icon={faStar} />    
          <FontAwesomeIcon icon={faStar} /> 
          </div>       

          <strong>Amazing~~~~~~!!!</strong>
          <p>These under-bed storages are simply amazing and way larger than I expected. Let me be honest, I never look at dimensions when buying things and maybe should have with these. I used them to help me move initially and was able to fit so much in them!</p>
        </div>

        <div className="content">
          <div className="user-photo">
            <img src={`${path}/assets/user3.jpeg`} alt="user3" />
            <span className='user-status'></span>
          </div>
          <div className="user-name">Chris M
            <span>Verified</span>
          </div>
          <div className="star">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />    
          <FontAwesomeIcon icon={faStar} />    
          <FontAwesomeIcon icon={faStar} />    
          <FontAwesomeIcon icon={faStarHalf} /> 
          </div>       

          <strong>I store my pumping supplies</strong>
          <p>I store my pumping supplies and daughter’s little bobbles/toys in these sturdy beauties.
</p>
        </div>
      </section>
      </div>


    </section>

    
   
  );
}

export default News;