import { authOptions } from "@app/api/auth/[...nextauth]/route";
import classCode from "@models/classCodes";
import User from "@models/user";
import { getServerSession } from "next-auth";
import statusCodes from 'http-status-codes'

export const POST = async (request) =>{
    const session = await getServerSession(authOptions)
    if(!session?.user){
        return new Response(JSON.stringify({
            ok: false,
            message: "Morate biti ulogovani"
        }),{status: statusCodes.UNAUTHORIZED})
    }
    if(session?.user.isVerified){
        return new Response(JSON.stringify({
            ok:false,
            message:"Već ste deo odeljenja"
        }),{status: statusCodes.BAD_REQUEST});
    }
    const body = await request.json()
    const className = await classCode.findOneAndUpdate({code: body.code},{ $inc: {numOfAttenders:1}});
    if(!className){
        
        return new Response(JSON.stringify({
            ok:false,
            message:"Kod nije važeći"
        }),{status: statusCodes.BAD_REQUEST})
    }
    const user = await User.updateOne({email: session.user.email},{
        verified:true,
        className:className.name
    });
    return new Response(JSON.stringify({
        ok:true,
        className: className.name
    }),{status: statusCodes.OK});
}