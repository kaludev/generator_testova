import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import statusCodes from 'http-status-codes'
import { uid } from "uid";
import Subject from "@models/subject";

export const POST = async (request) =>{
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

        const data = await request.json();
        const classes = data.classes;
        const className= {
            name: data.name,
            class: data.class,
            
        }
        await Subject.create(className);
        return new Response(JSON.stringify({
            ok:true,
            data: className
        }),{status: statusCodes.OK});
    }catch (e) {
        return new Response(JSON.stringify({
            ok:false,
            message:e.message
        }),{status: statusCodes.INTERNAL_SERVER_ERROR});
    }
    
}