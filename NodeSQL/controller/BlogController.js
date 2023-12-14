import {UserModel,UserEsModel, BikeModel} from "../models/BlogModels.js";

export const Create = async (req, res)=>{
    let op = {
        raw:true,
        silent:true,
        fields:['rut','nombre','apellido','fono','correo','estado','clave']
    };
    try{
        await UserModel.create(req.body,op);
        res.json({message:'Creado'});
    }catch(error){
        res.json({message:error.message})
        //res.json()
    }
}

export const CreateEst = async (req, res)=>{
    let op = {
        raw:true,
        silent:true,
        fields:['rut_e','carrera']
    };
    try{
        await UserEsModel.create(req.body,op);
        res.json({message:'Creado'});
    }catch(error){
        res.json({message:error.message})
    }
}

export const CreateBike = async (req, res)=>{
    let op = {
        raw:true,
        silent:true,
        fields:['id_t','marca','modelo','color','tipo','rut_e']
    };
    try{
        await BikeModel.create(req.body,op);
        res.json({message:'Creado'});
    }catch(error){
        res.json({message:error.message})
        //res.json()
    }
}


export const ReadAll = async (req, res)=>{
    try{
        let blogs = await UserModel.findAll({attributes:['rut']});
        res.json(blogs);
    }catch(error){
        res.json({message:error.message})
    }
}

export const ReadAllB = async (req, res)=>{
    try{
        let blogs = await BikeModel.findAll({
            attributes:['id_t','marca','modelo','color','tipo'],
            where:{
                'rut_e':req.params.rut_e
            }
        });
        res.json(blogs);
    }catch(error){
        res.json({message:error.message})
    }
}

export const ReadOne = async (req, res)=>{
    try{
        let blogs = await UserModel.findAll({
            attributes:['rut','nombre','apellido','fono','correo','estado','clave'],
            where:{
                'rut':req.params.rut
            }
        });
        res.json(blogs);
    }catch(error){
        res.json({message:error.message})
    }
}
/*
export const Update = async (req, res)=>{
    try{
        let blogs = await UserModel.update(req.body,{
            where:{
                'Mail':req.params.Mail
            }
        });
        res.json({message:'Actualizado'});
    }catch(error){
        res.json({message:error.message})
    }
}

export const Delete = async (req, res)=>{
    try{
        let blogs = await UserModel.destroy({
            where:{
                'Mail':req.params.Mail
            }
        });
        res.json({message:'Eliminado'});
    }catch(error){
        res.json({message:error.message})
    }
}
*/