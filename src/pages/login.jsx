import { React, useRef, useState} from "react";
import "../styles/style.css";
import LogoU from '../images/Logo UCEN_R.COQUIMBO_.png'
import LogoCleta from '../images/QRcleta.png'
//import Mail from '../images/mail.png'
//import Pass from '../images/pass.png'
import { Link, Outlet, useNavigate} from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { BiShow, BiHide } from 'react-icons/bi'
import CryptoJS from 'crypto-js';
import Users from './users.json'

import { conexion } from "../ConectionSQL/conexion";
import Cookies from "universal-cookie";

import Heading from "./heading";

function validaRut(rut){
    let ok = false;
    let spg = rut.replace(/[.-]/g, '');
    let snd = spg.slice(0, -1);
    let r_u_t = snd.split("")
    let t_u_r = r_u_t.reverse();
    let tur = t_u_r.join("");
    
    let multi = 2;
    let sum = 0;
    for(let i = 0;i<tur.length;i++){
        if(multi > 7){
            multi = 2;
        }
        //console.log(tur[i]);
        sum = sum+parseInt(tur[i]*multi);
        multi = multi+1;
    }
    
    let dv = 11-(sum%11);
    let dvu = rut[rut.length-1];
    if(dvu === 'k' || dvu === 'K'){
        dvu = dvu.toUpperCase();
    }
    //console.log('dvu: ',dvu);
    if(dv===11){
        dv = "0";
    }else if(dv === 10){
        dv="K";
    }
    //console.log('dv: ',dv);
    if(String(dv) === dvu){
        ok = true;
    }else{
        ok = false
    }
    return ok;
}


function Login(){
    
    let mailRef = useRef();
    let passRef = useRef();
    //let iconRef = useRef();

    const cambio = (ojo) => {
        if(ojo === 'BiShow'){
            setEye(
                <BiHide className="clickeable" fontSize='25'
                    onClick={()=>cambio('BiHide')}
                />);
            setPass('text');
            
        }else{
            setEye(
                <BiShow id='show' className="clickeable" fontSize='25'
                    onClick={()=>cambio('BiShow')}
                />
            );
            setPass('password');
        }
    }

    const [pass,setPass] = useState('password');
    const [eye,setEye] = useState(
        <BiShow className="clickeable" fontSize='30'
            onClick={()=>cambio(eye.type.name)}
        />
    );

    
    const navigate = useNavigate();

    function verificar(mail,pass){
        try{
            let Cpass = CryptoJS.SHA256(pass).toString();
            
            let con = new conexion();

            let dat = con.leer(mail);
            dat.then(data => {
                //console.log(data[0].Pass);
                //console.log(data[0]);
                if(data[0].rut === mail && data[0].clave === Cpass){
                    console.log('Correcto')
                    //let datos = JSON.stringify(data[0]);
                    let cock = new Cookies();
                    cock.set('Datos',data[0],{path:'/'})
                    navigate("/UserProf")
                }else{
                    console.log('Incorrecto')
                }
              })
              .catch(error => {
                console.error("Error al leer los datos:", error);
              });
            //console.log(dat)

            
            
        }catch(ex){
            console.log('error en "Verificar()": '+String(ex));
        }
    }
    
    const [rut,SetRut] = useState(true);

    return(
        <div id="page" className="site login-show">
            
            <div className="container">
                <div className="wrappr">
                    <div className="login">
                        <Heading wel={
                            (
                                <h2>
                                    Estacionamiento QR<br/> 
                                    para bicicletas
                                </h2>
                            )
                        } 
                        logo1={<img className="ImgLogoU" src={LogoU} alt="Logo"></img>} 
                        logo2={<img className="ImgLogoU" src={LogoCleta} alt="Logo"></img>}/>
                        <div className="content-form">
                            <div className="y-style">
                                <h1>Bienvenido</h1>
                                <form action="" >
                                    <p className="badText" hidden={rut}>Ingrese un rut valido</p>
                                    <div className="userInput">
                                        <div className="userInputContent" onChange={
                                            ev=>{
                                                ev.preventDefault();
                                                SetRut(validaRut(mailRef.current.value))
                                            }
                                        }>
                                            <div className="IconSide centrado">
                                                <AiOutlineMail fontSize="25"/>
                                            </div>
                                            <div className="InputSide centrado">
                                                <input autoComplete="off" ref={mailRef} id="InputCorreo" className="userInputText" type="email" placeholder="  Ingresa tu RUT"/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="userInput">
                                        <div className="userInputContent">
                                            <div className="IconSide centrado">
                                                <AiOutlineLock fontSize="25"/>
                                            </div>
                                            <div className="InputSide centrado">
                                                <input ref={passRef} id="InputPassword" className="userInputText" type={pass} placeholder="  Ingresa tu contraseña"/>
                                            </div>
                                            <div className="IconSide centrado">
                                                {eye}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="check">

                                        <input type="checkbox" id="remember"/>
                                        <label>Recuérdame</label>
                                    </p>
                                    <Link to='/recover' className="forgot">Recuperar contraseña</Link>
                                    <button onClick={
                                        ev=>{
                                            ev.preventDefault();
                                            if(rut){
                                                verificar(
                                                    mailRef.current.value,
                                                    passRef.current.value,
                                                    Users
                                                )
                                            }
                                        }
                                    } id='BtnLogIn' className="Iniciar" type="submit">
                                        Iniciar Sesión
                                    </button>
                                </form>
                                <div className="afterform">
                                    <p>¿No tienes una cuenta?</p>
                                    {/**<a onClick={toSignup} className="t-signup">Registrate</a> */}
                                    <Link to='/signup'>Registrate</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <Outlet/>
        </div>
    );
}

export default Login;