import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './styles.css';
import '../../Css-Global/styles.css'

import api,{url} from "../../services/api";
import { login } from "../../services/auth";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:false,
            email: '',
            password: '',
            error:''
        }
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
    async UNSAFE_componentWillMount() {
        this.setState({isLoading:true})
        setTimeout(() => {
          this.setState({isLoading:false})
        }, 800)
    }
    handleSignIn = async e => {
        e.preventDefault();
        const body = {
            email:this.state.email,
            password:this.state.password
        }
        const response = await api.post("/login", body);
        login(response.data.token,response.data.refreshToken);
        const user = {
            id:response.data.id,
            name:response.data.name,
            role:response.data.role,
            avatar:`${url}/user/profile/?path=${response.data.avatar}`
        }
        localStorage.setItem('@vacine/authUser', JSON.stringify(user));
        this.props.history.push("/home");
    };

    render() {
        return (
            <div id="main">
                <div className="main-login">
                    <div>
                        <ToastContainer />
                    </div>
                    <div className="card-login">
                        <div style={{alignItems: "center", paddingTop: '1rem'}}>
                            <p style={{fontSize:'0.8rem'}}>Login</p>
                        </div>
                        <form onSubmit={this.handleSignIn}>
                            <div style={{paddingTop: '0'}}>
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
                            </div>
                            <div style={{alignItems: 'center'}}>
                                <button  type="submit" className='button-login'>Login</button>
                            </div>
                        </form>
                        <div style={{textAlign: 'left', paddingTop: '1rem', paddingLeft: '1.5rem'}}>
                            <a href="/">Esqueceu a senha?</a>
                            <p><span>Ainda não possui cadastro?</span><a href="/Register"> Cadastre-se</a></p>
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


export default Login;