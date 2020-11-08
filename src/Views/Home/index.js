import React from 'react';
import "./styles.css"
import "./../../Css-Global/styles.css"
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ReactTooltip from 'react-tooltip';
import { ToastContainer } from "react-toastify";
import api from "../../services/api";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notice:[],
      covidPauDosFerros:{},
      covidMartins:{},
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
    this.getNotice()
    this.getCovid()
    setTimeout(() => {
      this.setState({isLoading:false})
    }, 500)
  }

  async getNotice(){
    const notice = await api.get("https://triunfo.pe.gov.br/wp-json/wp/v2/posts?search=vacina");
    this.setState({notice:notice.data})
  }
  async getCovid(){
    const covidMartins = await api.get("https://brasil.io/api/v1/dataset/covid19/caso/data/?format=json&is_last=True&state=RN&city=Martins");
    const covidPauDosFerros = await api.get("https://brasil.io/api/v1/dataset/covid19/caso/data/?format=json&is_last=True&state=RN&city=Pau%20dos%20Ferros");
    this.setState({covidPauDosFerros:covidPauDosFerros.data.results[0],covidMartins:covidMartins.data.results[0]})
    console.log(covidPauDosFerros)
  }
  render() {
    return (
      <div>
        <Header/>
        <div>
          <ToastContainer />
        </div>
        <div  id="main">
        <div className="primary-color main-home">
          <div className="secundary-color card-search">
            <span className="search-title" style={{margin:"0 0 0 10px"}}>Página inicial</span>
          </div>
          <div className="row">
          <ReactTooltip/>
          <div className="column-50">
            <div className="secundary-color card-home-50">
                <p className="title-city">Martins - RN</p>
                <div className="content-city">
                  <p><b>{this.state.covidMartins.confirmed}</b> Casos confirmados</p>
                  <p><b>{this.state.covidMartins.deaths}</b> Mortes</p>
                  <p><b>{this.state.covidMartins.estimated_population}</b> População estimada</p>
                  <p><b>{this.state.covidMartins.date}</b> última atualização</p>
                </div>
                <hr style={{margin:"20px 0"}}/>
                <p className="title-city">Pau dos Ferros - RN</p>
                <div className="content-city">
                  <p><b>{this.state.covidPauDosFerros.confirmed}</b> Casos confirmados</p>
                  <p><b>{this.state.covidPauDosFerros.deaths}</b> Mortes</p>
                  <p><b>{this.state.covidPauDosFerros.estimated_population}</b> População estimada</p>
                  <p><b>{this.state.covidPauDosFerros.date}</b> última atualização</p>
                </div>
            </div>
          </div>
            <div className="column-50">
            <div className="secundary-color card-home-40">
            <div className="secundary-color title">
                <p>Últimas notícias</p>
                <span>Fique atualizado com as notícias sobre vacinação.</span>
            </div>
              {
                this.state.notice.map((item) => {
                  return (
                    <li key={item.id} className="card-content">
                        <span>{item.title.rendered} </span>
                        <a target="_blank" rel="noopener noreferrer" href={item.link}>Ler mais</a>
                        <hr/>
                      </li>
                    )
                  })
              }
              </div>
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


export default Home;