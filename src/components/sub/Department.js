import Layout from '../common/Layout';
import {useEffect,useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const path = process.env.PUBLIC_URL;


function Department() {
  const [members, setMembers] = useState([]);

  useEffect(()=>{
    axios.get(`${path}/DB/member.json`).then((json)=>{
      console.log(json);
      console.log(json.data.members);
      setMembers(json.data.members);
    }) 


  },[]);

  return (
    
      <>
      <Layout name={'Department'} img={`department.jpg`}>
        <p>After a long day of urgent emails, meetings, 
and calls,<br/> we do everything we can to slow 
down and focus on the important things</p>
      </Layout>


      
        <section className='banner'>
          <div className="inner">
             <h2>
            We intend to make
a difference
            </h2>
              <p>
              Through Open Spaces, we’re embracing a new philosophy that focuses on a series of small, more intentional steps. Rather than approaching organization as an added chore, we believe organizing our homes can create the physical and mental space to be more mindful in our everyday habits and routines. Our intention is to approach organizing in a way that’s empathetic, flexible, and more sustainable.
              </p>
          </div>
        </section>
      <section className="member">
      {members.map((member,idx)=>{
          return  (
            <li key={idx}>
              <div className="inner">
                <div className="pic">
                  <img src={`${path}/assets/${member.pic}`}/>
                </div>
                <div className="con">
                  <span>{member.num}</span>
                  <h1>{member.name}</h1>
                  <p>{member.position}</p>

                  <div className="sns">
                    <FontAwesomeIcon icon={faFacebook} /> 
                    <FontAwesomeIcon icon={faInstagram} />    
                    <FontAwesomeIcon icon={faTwitter} />    
                  </div>
                </div>

                
              </div>
            </li>
          )
        })}
      </section>
      
      
      </>
      
      
    
  )
}

export default Department