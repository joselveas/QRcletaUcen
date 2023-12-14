import { useRef} from 'react';
import { Outlet, useNavigate} from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import Heading from './heading';
import { FaQuestionCircle } from "react-icons/fa";
import '../styles/styleSignup.css';

function Send(mail){//Funcion Para enviar correo
    //Aqui puede ir un codigo para consultar parametros
    console.log(mail);
}

function Recupera(){
    let mailRef = useRef();
    const navigate = useNavigate();
    return(
        <div>
            <div id="page" className="site login-show">
                <div className="container">
                    <div className="wrapper">
                        <div className="login">
                            <Heading 
                                wel={
                                    (<h2 className="Titulo">
                                        Recuperar<br/>contraseña
                                    </h2>)
                                }
                            />
                            <div className="content-form">
                                <div className="y-style">
                                    {/*Contenido de la pagina */}
                                    <div className='Mcolor'>
                                        <FaQuestionCircle size={70}/>
                                    </div>
                                    <h2 className='encabezado'>
                                        ¿Olvidaste tu contraseña?<br/>
                                        No te preocupes, es posible recuperarla
                                    </h2>
                                    <form action="" >
                                        <h2 className='encabezado'>
                                            Solo ingresa tu correo
                                        </h2>
                                        <div className="userInput">
                                            <div className="userInputContent">
                                                <div className="IconSide centrado">
                                                    <AiOutlineMail fontSize="30"/>
                                                </div>
                                                <div className="InputSide centrado">
                                                    <input autoComplete="off" ref={mailRef} id="InputCorreo" className="userInputText" type="email" placeholder="  Ingresa tu correo"/>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={
                                            ev=>{
                                                ev.preventDefault();
                                                Send(mailRef.current.value);
                                                navigate('/recoverOk')
                                            }
                                        } id='BtnLogIn' className="Iniciar" type="sumbit">Recuperar</button>
                                        <div className='welcome'>
                                            <button 
                                                onClick={
                                                    ev=>{
                                                        ev.preventDefault();
                                                        navigate('/')
                                                    }
                                                }
                                                onMouseOver={(e) => e.target.title = 'Volver'} 
                                            id='BtnLogIn' className="GoBack centrado" type="sumbit">
                                                <IoMdArrowRoundBack size={60}/>
                                            </button>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    );
}

export default Recupera;