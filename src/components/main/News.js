import {useState,useEffect} from 'react';

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
          }
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
    <section id="news" className='myScroll'>
      <h1>Recent News</h1>
      {/* posts 값 중에서 최근글 3개까지만 화면에 출력 */}
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
    </section>
  );
}

export default News;