import React from 'react'

function Footer() {
  return (
    <footer>
      <div className="inner">
        <h4>Open spaces Studio AB</h4>
        <span> sumin-j&copy; ALL RIGHT RESERVED. See <a href="#">privacy policy</a> and <a href="#">terms of service</a></span>

        <div className="footer">
        <ul className='sns'>
          <li><a href="#">Email</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">Behance</a></li>
        </ul>

        <ul className='pages'>
          <li><a href="#">News</a></li>
          <li><a href="#">Work</a></li>
          <li><a href="#">Play</a></li>
          <li><a href="#">Studio</a></li>
        </ul>
        </div>

      </div>
    </footer>
  )
}

export default Footer