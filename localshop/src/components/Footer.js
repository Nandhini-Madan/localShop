import React from 'react'



const Footer = () => {
  

  return (
    <div>
      <footer className="footer">
      <div className="legal__links">
          <span>Made with <span className="heart">♥</span> Nandhini Madan</span>
        </div>
        <div >
          <p> &copy;{(new Date().getFullYear())}</p>
          
        </div>
      </footer>
    </div>
  )
}

export default React.memo(Footer);