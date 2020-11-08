import React from 'react';
import "./styles.css"
import "./../../Css-Global/styles.css"
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ReactTooltip from 'react-tooltip';
import { ToastContainer } from "react-toastify";

class Administered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      // authUser: JSON.parse(localStorage.getItem('@vacine/authUser')),
      authUser: {
        name:"gyovanne",
        role:{
          id:1
        }
      },
    }
  }
  async UNSAFE_componentWillMount() {
    this.setState({isLoading:true})
    setTimeout(() => {
      this.setState({isLoading:false})
    }, 500)
  }
  render() {
    return (
      <div>
        <Header/>
        <div>
          <ToastContainer />
        </div>
        <div  id="main">
          <div className="primary-color main-administered">
          <div className="secundary-color card-search">
              <span className="search-title" style={{margin:"0 0 0 10px"}}><a href="/home">Pagina inicial</a> / Administradas</span>
            </div>
            <div className="row">
            <ReactTooltip/>
              <div  data-delay-show='400' data-tip="Clique para ver informações da vacina" className="column-25">
              <a href=" #" className="link">
                <div className="secundary-color card-administered-20">
                  <p className="p-title">Tríplice Viral (SCR)</p>
                  <p className="p-description">20 a 29 anos</p>
                  <hr className="p-dose"/>
                  <p className="p-dose">Duas doses</p>
                  <p className="p-description">Previne sarampo, caxumba e rubéula</p>
                  <p className="p-description">10/11/2019</p>
                </div>
              </a>
              </div>
            </div>
            {
              this.state.isLoading && (
                <div className="loading">
                  <div className="lds-ring">
                    <div></div><div></div><div></div><div></div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}


export default Administered;