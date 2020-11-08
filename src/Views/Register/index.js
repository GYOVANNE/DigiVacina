import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles.css';
import '../../Css-Global/styles.css';
import api from  '../../services/api';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        isLoading:false,
        name: '',
        phone: '',
        email: '',
        password: '',
        passwordConfirmation: ''
        }
    }
    async UNSAFE_componentWillMount() {
        this.setState({isLoading:true})
        setTimeout(() => {
          this.setState({isLoading:false})
        }, 500)
    }
    toastSuccess(text){
        toast.success(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    toastError(text){
        toast.error(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    handleRegister = async e => {
    e.preventDefault();
    const body = {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
    }
    // await api.post("/register", body)
    this.toastSuccess('Usuário cadastrado!')
    this.props.history.pusash("/");
    };
  
  render() {
    return (
        <div id="main">
            <div className="main-register">
                <ToastContainer />
                <div className="card-register">
                    <div style={{alignItems: "center", paddingTop: '1rem'}}>
                        <p style={{fontSize:'0.8rem'}}>Cadastro</p>
                    </div>
                    <form onSubmit={this.handleRegister}>
                        <div style={{paddingTop: '0'}}>
                                <input
                                    placeholder="Nome Completo" 
                                    type='text'
                                    onChange={e => this.setState({ name: e.target.value })}
                                    required
                                />
                                <input 
                                    placeholder="Telefone" 
                                    type='text'
                                    onChange={e => this.setState({ phone: e.target.value })}
                                    required
                                />
                                <input 
                                    placeholder="E-mail" 
                                    type='text'
                                    onChange={e => this.setState({ email: e.target.value })}
                                    required
                                />
                                <input
                                    placeholder="Senha" 
                                    type='password'
                                    onChange={e => this.setState({ password: e.target.value })}
                                    required
                                />
                                <input 
                                    placeholder="Confirmação de senha" 
                                    type='password'
                                    onChange={e => this.setState({ passwordConfirmation: e.target.value })}
                                    required
                                />
                        </div>
                        <div style={{alignItems: 'center'}}>
                            <button className='button-register' type="submit">Cadastrar</button>
                        </div>
                    </form>
                    <div style={{textAlign: 'left', paddingTop: '0', paddingLeft: '1.5rem'}}>
                        <p><span>Já possui cadastro?</span><a href="/"> Entrar</a></p>
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
    );
  }
}


export default Register;