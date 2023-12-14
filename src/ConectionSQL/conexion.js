import axios from "axios";
//import {React} from "react";
//import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";


export class conexion{
    constructor(){
        this.uri = 'http://localhost:8000/base';
        this.blog = [];
    }
    async crear(data){
        
        try {
            await axios.post(this.uri+'/create/',data);
        } catch (error) {
            console.log(error);
        }
        
    }

    async crearEst(data){
        
        try {
            await axios.post(this.uri+'/createE/',data);
        } catch (error) {
            console.log(error);
        }
        
    }

    async crearB(data){
        
        try {
            await axios.post(this.uri+'/createB/',data);
        } catch (error) {
            console.log(error);
        }
        
    }

    async leer(mail){
        
        try{
            const res = await axios.get(`${this.uri}/select/${mail}`);
            this.blog = res.data;
        }catch(error){
            this.blog = [];
        }
        return this.blog;
    }

    async leerB(rut){
        
        try{
            const res = await axios.get(`${this.uri}/selectB/${rut}`);
            this.blog = res.data;
        }catch(error){
            this.blog = [];
        }
        return this.blog;
    }

    setblog(blo){
        
        this.blog = blo;
    }

    getblog(){
        return this.blog;
    }

    actualizar(){

    }
    eliminar(){

    }
}
/*

const CompoRead = ()=>{
    const [blog,setBlog] = useState([]);
    useEffect(()=>{
        getBolg()
    },[])
    const getBolg = async ()=> {

    }
    const delBolg = async ()=> {
        
    }
    return(
        <div>

        </div>
    )
}
*/