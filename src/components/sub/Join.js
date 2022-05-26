import Layout from '../common/Layout';
import {useState, useEffect} from 'react';

const path = process.env.PUBLIC_URL;

function Join() {
  const initVal = {
    id : '',
    pw1 : '',
    pw2 : '',
    email : '',
    language : '',
    path : '',
    comments :  ''
  }

  const [val, setVal] = useState(initVal);
  const [err, setErr] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmit,setIsSubmit] = useState(false);

  const check = (val) => {
    const errs = {};
    const eng = /[a-zA-Z]/;
    const num = /[0-9]/;
    const spc = /[~!@#$%^&*()_+]/;

    if(val.id.length < 5){
      errs.id = 'Enter an ID of 5 or more characters';
    }

    if(val.pw1.length <5 || !eng.test(val.pw1) || !num.test(val.pw1) || !spc.text(val.pw1)) {
      errs.pw1 = 'Password must contain at least 5 letters, numbers, and special characters.';
    }

    if(val.pw1 !== val.pw2 || !val.pw2) {
      errs.pw2 = 'Please enter the same two passwords';
    }

    if(val.email.length < 8 || !/@/.test(val.email)) {
      errs.email = 'Please enter your email at least 8 characters including @';
    }
    if(val.language ==='') {
      errs.language = 'Choose your language';
    }
    if (!val.path) {
      errs.path = 'Please select one or more';
    }

    if(val.comments.length < 10) {
      errs.comments = 'Please enter 10 or more characters for comments.';
    }
    
    return errs;
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setVal({...val, [name]:value})
  }

  const handleCheck = (e) => {
    let isCheck = false;
    const {name} = e.target;
    const inputs = e.target.parentElement.querySelectorAll('input');

    inputs.forEach(el => {
      if(el.checked) isCheck = true;
    });

    setVal({...val,[name]:isCheck});
  }

  const handleSelect = (e) =>{
    const {name} = e.target;
    const isSelected = e.target.options[e.target.selectedIndex].value;
    console.log(isSelected);
    setVal({...val,[name]:isSelected});
  }

  const handleReset = () => {
		setVal(initVal);
		setErr({});
	};

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(check(val));
  };

  useEffect(()=> {

  },[err]);

  
  return (
   <>
    <Layout name={'Join'} img={`join.jpg`}>
     <p>We're excited to offer professional organizers and interior designers exclusive trade pricing on all full-price merchandise<br/> with no minimum purchase.</p>
    </Layout>
    
    <form action="#" onSubmit={handleSubmit}>
      <h3>Welcome to Open spaces </h3>
      <p>Register your account</p>
      <fieldset>
        <legend className='hidden'>Join form</legend>
        <table>
          <caption className='hidden'>Join form</caption>
          <tbody>
            {/* ID */}
            <tr>
              <th scope='row'>
                <label htmlFor="id">ID</label>
              </th>
              <td>
                <input type="text" placeholder='name' id='id' name='id' value={val.id} onChange={handleChange} />
                <span className='err'>{err.id}</span>
              </td>
            </tr>
            {/* PW1 */}
            <tr>
              <th scope='row'>
                <label htmlFor="pw1">PASSWORD</label>
              </th>
              <td>
                <input type="password" name="pw1" id="pw1" placeholder='Password' value={val.pw1} onChange={handleChange}/>
                <span className="err">{err.pw1}</span>
              </td>
            </tr>
            {/* PW2 */}
            <tr>
              <th scope='row'>
                <label htmlFor="pw2">Confirm Password</label>
              </th>
              <td>
                <input type="password" name="pw2" id="pw2" placeholder='Re-enter password' value={val.pw2} onChange={handleChange} />
                <span className="err">{err.pw2}</span>
              </td>
            </tr>
            {/* EMAIL */}
            <tr>
              <th scope='row'>
                <label htmlFor="email">E-mail</label>
              </th>
              <td>
                <input type="email" name="email" id="email" placeholder='Email address' value={val.email} onChange={handleChange}/>
                <span className="err">{err.email}</span>
              </td>
            </tr>
            {/* Language */}
            <tr>
              <th>
                <label htmlFor="language">Language</label>
              </th>
              <td>
                <select name="lan" id="lan" onChange={handleSelect}>
                  <option value="">Select language</option>
                  <option value="korean">Korean</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="chinese">Chinese</option>
                  <option value="japanese">Japanese</option>
                </select>
                <span className="err">{err.language}</span>

              </td>
            </tr>
            {/* Known path */}
            <tr>
              <th scope='row'>
                <label htmlFor="path">Known path</label>
              </th>
              <td>
                <label htmlFor="recommendation">Recommendation</label>
                <input type="checkbox" name="path" id="recommendation" onChange={handleCheck} />
                <label htmlFor="internet">Internet</label>
                <input type="checkbox" name="pth" id="internet" onChange={handleCheck} />
                <label htmlFor="leafleat">Leafleat</label>
                <input type="checkbox" name="path" id="leafleat" onChange={handleCheck} />
                <span className='err'>{err.path}</span>
              </td>
            </tr>
            {/* Comments */}
            <tr>
              <th scope='row'>
                <label htmlFor="comments">Comments</label>
              </th>
              <td>
                <textarea name="comments" id="comments" cols="30" rows="10" value={val.comments} onChange={handleChange}></textarea>
                <span className='err'>{err.comments}</span>
              </td>
            </tr>

            <tr>
              <th colSpan='2'>
                <input type="reset" value="Cancle" onClick={handleReset} />
                <input type="submit" value="Submit" onClick={()=>setIsSubmit(true)}/>
              </th>
            </tr>
          </tbody>
        </table>
      </fieldset>

      <div className="wrap">
        <div className="pic">
        <img src={`${path}/assets/join1.jpg`} alt="" className='join1' />
        <img src={`${path}/assets/join2.jpg`} alt="" className='join2' />      
        </div>
        {/* <div className='pic2'>
        </div> */}
      </div>
    </form>

    
    </>
  )
}

export default Join