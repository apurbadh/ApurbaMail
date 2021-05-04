
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSession } from 'next-session';
import {Users} from "../../database/database";

export default withSession(async (req: NextApiRequest, res: NextApiResponse) => {
    let username = req.body.username;
    let password = req.body.password;
    const foundUser = await Users.findOne({where : {username : username}})
    if (foundUser == null){
        res.status(200).json({ mes:"Error", status:"error", ht:"User does not exist" })
        return

    }
    // @ts-ignore
    if (foundUser.dataValues.password != password){
        res.status(200).json({ mes:"Error", status:"error", ht:"Password does not match" })
        return
    }
    // @ts-ignore
    req.session.name = username;
    res.status(200).json({ mes:"Successfully Logged in !", status:"success", ht:"You have been successfully logged in" })
})
