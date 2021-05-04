import type { NextApiRequest, NextApiResponse } from 'next'
import {Users} from "../../database/database";


export default async function Register(req : NextApiRequest, res : NextApiResponse){

    let fullName = req.body.fullName;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    const foundUser = await Users.findOne({where : {username : username}})
    if (foundUser != null){
        res.json({status: 'error', mes:"Invalid Username", ht:"User already exists"})
        return
    }
    await Users.create({
        fullName: fullName,
        username: username,
        email : email,
        password : password
    });
    res.status(200).json({status: "success", mes:"Successfully Registered", ht:"You have been successfully registered"})

}
