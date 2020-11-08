import React from 'react';
import "./styles.css"
import "./../../Css-Global/styles.css"
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { ToastContainer } from "react-toastify";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false
    }
  }
  async UNSAFE_componentWillMount() {
    this.setState({isLoading:true})
    setTimeout(() => {
      this.setState({isLoading:false})
    }, 300)
  }
  render() {
    return (
      <div>
        <Header/>
        <div>
          <ToastContainer />
        </div>
        <div  id="main">
        <div className="main-settings">
          <div className="card-description">
            <span className="span-settings"> Configurações</span>
          </div>
          <div className="row">
            <div className="column-100">
              <div className="column-40">
                <div className="card-settings-20">
                  <div className="settings-check-p">
                  <label className="check-text">Notificações por SMS</label>
                    <div className="check-style">
                      <label className="switch">
                        <input value={1} id="config_sms" type="checkbox" defaultChecked={true} onClick={this.configSms} ></input>
                        <span className="slider round"></span>
                      </label>
                    </div>
                    </div>
                </div>
              </div>
              <div className="column-40">
                <div className="card-settings-20">
                  <div className="settings-check-p">
                  <label className="check-text">Notificações por E-mail</label>
                    <div className="check-style">
                      <label className="switch">
                        <input value={1} id="config_email" type="checkbox" defaultChecked={true} onClick={this.configEmail}></input>
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
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
        <Footer/>
      </div>
    );
  }

  configSms() {
    const value = document.getElementById("config_sms");
    console.log('sms ' + value.value)
  }

  configEmail() {
    const value = document.getElementById("config_email");
    console.log('Email ' + value.value)
  }

}


export default Settings;