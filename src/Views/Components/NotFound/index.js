import React from 'react';
import "./styles.css"
import Header from '../Header';
import Footer from '../Footer';
import imgNotFound from "./../../../assets/404.svg"

class PageNotFound extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
 
  render() {
    return (
      <div>
        <Header/>
        <div id="main" className="main-page-not-found">
          <img src={imgNotFound} alt="Not Found"></img>
          <p>Page not found</p>
        </div>
        <Footer/>
      </div>
    );
  }
}


export default PageNotFound;