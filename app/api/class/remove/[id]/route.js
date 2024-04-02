import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import statusCodes from 'http-status-codes'
import User from "@models/user";
import classCode from "@models/classCodes";

export const GET = async (request,{params}) =>{
    try{
        const session = await getServerSession(authOptions)
        if(!session.user){
            return new Response(JSON.stringify({
                ok: false,
                message: "Morate biti ulogovani"
            }),{status: statusCodes.UNAUTHORIZED})
        }
        if(!session.user.isSuperAdmin){
            return new Response(JSON.stringify({
                ok:false,
                message:"Morate biti Miloye"
            }),{status: statusCodes.UNAUTHORIZED});
        }
        const id = params.id;
        console.log(id);
        const user = await User.findByIdAndUpdate(id,{className: "",verified: false});
        await classCode.updateOne({class: user.className},{$inc:{ numOfAttenders: -1}})
        return new Response(JSON.stringify({ok:true}),{status: statusCodes.OK})
    }catch (e) {
        return new Response(JSON.stringify({
            ok:false,
            message:e.message
        }),{status: statusCodes.INTERNAL_SERVER_ERROR});
    }
    
}