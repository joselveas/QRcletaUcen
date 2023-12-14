import { Outlet, useNavigate} from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Heading from './heading';
import { FaQuestionCircle } from "react-icons/fa";
import '../styles/styleSignup.css';


function Recuperado(){
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
                                        Se ha enviado un email con <br/>
                                        instrucciones para restablecer la<br/>
                                        contraseña
                                    </h2>
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

export default Recuperado;