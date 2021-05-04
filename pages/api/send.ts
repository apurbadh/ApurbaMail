import type { NextApiRequest, NextApiResponse } from 'next'
import {Mail, Users} from "../../database/database";
import {withSession} from "next-session";

export default withSession(async (req: NextApiRequest, res: NextApiResponse) => {
    // @ts-ignore
    let from = req.session.name;
    if (!from){
        res.status(404);
        return
    }
    let to = req.body.to;
    if (from == to){
        res.json({status: 'error', mes:"Error", ht:"You can't mail yourself"})
        return
    }
    const foundUser = await Users.findOne({where : {username : to}})
    if (foundUser == null){
        res.json({status: 'error', mes:"Invalid Username", ht:"User doesn't exists"})
        return
    }
    let title = req.body.title;
    let desc = req.body.desc;
    await Mail.create({
        from: from,
        to: to,
        title: title,
        desc: desc
    })
    res.json({status: 'success', mes:"Successful", ht:"Mail Sent"})
    return

})
