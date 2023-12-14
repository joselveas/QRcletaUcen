import React, { useRef, useState } from "react";
import "../styles/styleSignup.css";
import { Link, Outlet, useNavigate} from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { BiHide, BiShow, BiUser } from "react-icons/bi";
import user from '../pages/users.json'
import CryptoJS from 'crypto-js';
import Heading from "./heading";
import { conexion } from "../ConectionSQL/conexion";
import { FaPhoneAlt,FaUniversity } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";

function Signup(){
    const cambio = (ojo) => {
        if(ojo === 'BiShow'){
            setEye(
                <BiHide className="clickeable" fontSize='30'
                    onClick={()=>cambio('BiHide')}
                />);
            setPass('text');
            
        }else{
            setEye(
                <BiShow id='show' className="clickeable" fontSize='30'
                    onClick={()=>cambio('BiShow')}
                />
            );
            setPass('password');
            
        }
    }

    const cambio2 = (ojo) => {
        if(ojo === 'BiShow'){
            setEye2(
                <BiHide className="clickeable" fontSize='30'
                    onClick={()=>cambio2('BiHide')}
                />);
            setPass2('text');
            
        }else{
            setEye2(
                <BiShow id='show' className="clickeable" fontSize='30'
                    onClick={()=>cambio2('BiShow')}
                />
            );
            setPass2('password');
            
        }
    }

    const [pass,setPass] = useState('password');
    const [eye,setEye] = useState(
        <BiShow className="clickeable" fontSize='30'
            onClick={()=>cambio(eye.type.name)}
        />
    );
    const [pass2,setPass2] = useState('password');
    const [eye2,setEye2] = useState(
        <BiShow className="clickeable" fontSize='30'
            onClick={()=>cambio2(eye.type.name)}
        />
    );

    const navigate = useNavigate();

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
    

    function Revisa(rut,nomb,apel,fono,mail,pass,pess,carr){
        let con = new conexion();
        //chekear usuario
        con.leer('').then(data => {
                //console.log(data)
                let existe = false;
                for(let i = 0; i < data.length; i++){
                    //console.log(data[i].rut);
                    if(data[i].rut === rut){
                        existe = true;
                        break;
                    }
                }
                //console.log('Existe:'+String(existe));
                const confir = revisapass(pass,pess);
                if(!existe && confir){
                    let Nuser = {
                        "rut": rut,
                        "nombre":nomb,
                        "apellido":apel,
                        "fono": parseInt(fono),//ese tiene que ser String, no Int
                        "correo":mail,
                        "estado": 0,
                        "clave":CryptoJS.SHA256(pass).toString()
                      }
                    con.crear(Nuser);
                    let Nest ={
                        "rut_e": rut,
                        "carrera":carr
                    }
                    con.crearEst(Nest);
                    alert('Usuario '+nomb+' '+apel+'\nse ha creado con exito');
                    navigate("/");  
                }
            })
            .catch(error => {
            console.error("Error al leer los datos:", error);
        });
        /*const existe = mail in user;
        //chekear pass
        const confir = revisapass(pass,pess);
        if(!existe && confir){
            let Nuser = {
                "Mail":mail,
                "Nombre":nomb,
                "Apellido":apel,
                "Pass":CryptoJS.SHA256(pass).toString(),
                "Type":"0"
            }
            
            con.crear(Nuser);
            alert('Usuario '+nomb+' '+apel+'\nse ha creado con exito');
            navigate("/");
            
            //console.log(his);

        }
        */
    }

    function existeUs(mail){
        const existe = mail in user;
        return !existe;
    }

    function revisapass(pass1,pass2){
        return pass1 === pass2;
    }

    let numrut = useRef();
    let nombre = useRef();
    let apelli = useRef();
    let nofono = useRef();
    let correo = useRef();
    let passi1 = useRef();
    let passi2 = useRef();
    let carrer = useRef();

    let [samepass,setSamepass] = useState(true);
    let [newCorreo,SetNew] = useState(true);


    
    const [rut,SetRut] = useState(true);
    return(
        <div id="page" className="site login-show">
            <div className="container">
                <div className="wrapper">
                    <div className="login">
                        <Heading   
                            wel={
                            (   
                                <h2 className="Titulo">
                                    Datos de<br/> 
                                    la cuenta
                                </h2>
                            )
                        }
                        logo2={
                            (
                                <h2 className="welcome"><FaUserGraduate size="150" /></h2>
                            )
                        }
                        />    
                        <div className="content-form">
                            <div className="y-style">
                                <form action="">
                                    <p className="badText" hidden={rut}>Ingrese un rut valido</p>
                                    <div className="userInput" onChange={
                                            ev=>{
                                                ev.preventDefault();
                                                SetRut(validaRut(numrut.current.value))
                                            }
                                        }>
                                        <div className="userInputContent">
                                            <div className="IconSide centrado">
                                                <BiUser fontSize='25'/>
                                            </div>
                                            <div className="InputSide centrado">
                                                <input ref={numrut} className="userInputText" type="text" placeholder=" Ingresa tu RUT"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="userInput">
                                        <div className="userInputContent">
                                            <div className="IconSide centrado">
                                                <BiUser fontSize='25'/>
                                            </div>
                                            <div className="InputSide centrado">
                                                <input ref={nombre} className="userInputText" type="text" placeholder=" Ingresa tu nombre"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="userInput">
                                        <div className="userInputContent">
                                            <div className="IconSide centrado">
                                                <BiUser fontSize='25'/>
                                            </div>
                                            <div className="InputSide centrado">
                                                <input ref={apelli} className="userInputText" type="text" placeholder=" Ingresa tu apellido"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="userInput">
                                        <div className="userInputContent">
                                            <div className="IconSide centrado">
                                                <FaPhoneAlt fontSize='20'/>
                                            </div>
                                            <div className="InputSide centrado">
                                                <input ref={nofono} className="userInputText" type="text" placeholder=" Ingresa tu N° de telefono"/>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="badText" hidden={newCorreo}>Ese correo ya existe</p>
                                    <div className="userInput">
                                        <div className="userInputContent">
                                            <div className="IconSide centrado">
                                                <AiOutlineMail fontSize='25'/>
                                            </div>
                                            <div className="InputSide centrado">
                                                <input onChange={
                                                    ev=>{
                                                        ev.preventDefault();
                                                        SetNew(existeUs(correo.current.value));
                                                    }
                                                } ref={correo} className="userInputText" type="email" placeholder=" Ingresa tu correo"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="userInput">
                                        <div className="userInputContent">
                                            <div className="IconSide centrado">
                                                <AiOutlineLock fontSize="25"/>
                                            </div>
                                            <div className="InputSide centrado">
                                                <input ref={passi1} className="userInputText" type={pass} placeholder=" Ingresa tu contraseña"/>
                                            </div>
                                            <div className="IconSide centrado">
                                                {eye}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="userInput">
                                        <div className="userInputContent">
                                            <div className="IconSide centrado">
                                                <AiOutlineLock fontSize="25"/>
                                            </div>
                                            <div className="InputSide centrado">
                                                <input onChange={ev=>{setSamepass(revisapass(passi1.current.value,passi2.current.value))}} ref={passi2} className="userInputText" type={pass2} placeholder=" Repite tu contraseña"/>
                                            </div>
                                            <div className="IconSide centrado">
                                                {eye2}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="userInput">
                                        <div className="userInputContent">
                                            <div className="IconSide centrado">
                                                <FaUniversity fontSize='25'/>
                                            </div>
                                            <div className="InputSide centrado">
                                                <input onChange={
                                                    ev=>{
                                                        ev.preventDefault();
                                                        SetNew(existeUs(correo.current.value));
                                                    }
                                                } ref={carrer} className="userInputText" type="email" placeholder=" Ingresa tu carrera"/>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="badText" hidden={samepass}>las contraseñas no coinsiden</p>
                                    <button onClick={
                                        ev=>{
                                            ev.preventDefault();
                                            Revisa(
                                                numrut.current.value,
                                                nombre.current.value,
                                                apelli.current.value,
                                                nofono.current.value,
                                                correo.current.value,
                                                passi1.current.value,
                                                passi2.current.value,
                                                carrer.current.value
                                                );

                                        }
                                    } className="Iniciar" type="sumbit">Crear cuenta</button>
                                </form>
                                <div className="afterform">
                                    <p>¿Ya tienes una cuenta?</p>
                                    {/**<a onClick={toSignup} className="t-signup">Registrate</a> */}
                                    <Link to='/'>Inicia sesion</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default Signup