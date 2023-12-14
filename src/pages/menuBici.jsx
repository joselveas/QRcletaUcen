import { Navigate, Outlet, useNavigate} from "react-router-dom";
//import { conexion } from "../ConectionSQL/conexion";
import { IoMdArrowRoundBack } from "react-icons/io";
import Heading from "./heading";
import UserMenu from './UserMenu';
import "../styles/styleUser.css"
import Cookies from 'universal-cookie';
import { MdPedalBike } from 'react-icons/md';
import { useState } from "react";

function TraeData(Nav){
    let cock = new Cookies();
    let data = cock.get('BiciData');
    let arr = [];
    for(let i = 0;i<data.length;i++){
        arr.push(
            <div className="BikeBox clickeable" key={i}
                onClick={
                    ev=>{
                        ev.preventDefault();
                        let datQR = {
                            'id_t':data[i].id_t,
                            'rut_e':cock.get('Datos').rut
                        };
                        //console.log(datQR)
                        cock.set(
                            'qrbici',
                            datQR,
                            {path:'/'}
                        );
                        Nav('/qrCode');
                    }
                }
            >
                <div className="BikeBoxCont">
                    <h3>N° serie</h3>
                    <p>{data[i].id_t}</p>
                </div>
                <div className="BikeBoxCont">
                    <h3>Trasporte</h3>
                    <p>{data[i].tipo}{' '}{data[i].marca}</p>
                </div>
                <div className="BikeBoxCont">
                    <h3>Modelo</h3>
                    <p>{data[i].modelo}</p>
                </div>
            </div>
        )
    }
    return arr;
}

function BikeMenu() {
    const navigate = useNavigate();
    let cock = new Cookies();
    const [bicis,setBicis] = useState(TraeData(navigate));
    return(
        <div id="page" className="site login-show">
            
            <div className="container">
                <div className="wrappr">
                    <div className="login">
                        <Heading wel={
                            (
                                <div>
                                <h1>Bicis de<br/>Usuario</h1>
                                    {/* Contenido del perfil del usuario */}
                                </div>
                            )
                        } 
                        logo1={<div/>} 
                        logo2={<UserMenu userData={cock.get("Datos")}/>}/>
                        <div className="content-form">
                            <div className="y-style">
                                {/*Espacio para componentes */}
                                <div>
                                    {bicis}
                                </div>
                                <button onClick={
                                    ev=>{
                                        ev.preventDefault();
                                        navigate('/sigbici')
                                    }
                                } id='BtnLogIn' className="Iniciar InputSide">
                                    Registrar Bici
                                </button>

                                <button 
                                    onClick={
                                        ev=>{
                                            /*Boton para volver*/
                                            ev.preventDefault();
                                            cock.remove('BiciData');
                                            navigate('/UserProf');//eso redirige a la ruta especificada
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
            <Outlet/>
        </div>
    );
}

export default BikeMenu;