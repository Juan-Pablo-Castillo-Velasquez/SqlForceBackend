import { NextApiRequest, NextApiResponse } from 'next';
import {verify} from "jsonwebtoken"
export default function Profilehandler(req: NextApiRequest, res: NextApiResponse){
   try {
    const {mytoken}:any=req.cookies
    if(!mytoken){
        return res.status(403).json({error:"no token"})
    }
    const user:any= verify(mytoken, 'secret');
     return res.status(200).json({usuario:user.username})
   } catch (error) {
    console.log(error)
    return res.status(401).json({message:"invalid token"})
   }
}