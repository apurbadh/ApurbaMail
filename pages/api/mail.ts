import {Mail} from "../../database/database";
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSession } from 'next-session';
import {Op} from "sequelize"

export default withSession(async (req: NextApiRequest, res: NextApiResponse) => {
    let finalArr = []
    // @ts-ignore
    let from = req.session.name;
    let type = req.body.type;
    let temp;
    if (type == 0){
        let foundUsers = await Mail.findAll({
            where: {
                [Op.or]: [{from: from}, {to: from}]
            }
        })
        for (let i = 0; i < foundUsers.length; i++){
            // @ts-ignore
            temp = foundUsers[i].dataValues;
            finalArr.push({from: temp.from, title: temp.title, description: temp.desc, to: temp.to})
        }
        res.json({arr : finalArr})
        return
    }else if (type == 1){
        let foundUsers = await Mail.findAll({
            where:{
                to: from
            }
        })
        for (let i = 0; i < foundUsers.length; i++){
            // @ts-ignore
            temp = foundUsers[i].dataValues;
            finalArr.push({from: temp.from, title: temp.title, description: temp.description, to: temp.to})
        }
        res.json({arr : finalArr})
        return
    }else if (type == 2){
        let foundUsers = await Mail.findAll({
            where:{
                from: from,
            }
        })
        for (let i = 0; i < foundUsers.length; i++){
            // @ts-ignore
            temp = foundUsers[i].dataValues;
            finalArr.push({from: temp.from, title: temp.title, description: temp.description, to: temp.to})
        }
        res.json({arr : finalArr})
        return
    }
    res.status(404)
})
