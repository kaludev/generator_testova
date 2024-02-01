import { authOptions } from '@app/api/auth/[...nextauth]/route';
import classCode from '@models/classCodes';
import User from '@models/user';
import statusCodes from 'http-status-codes'
import { getServerSession } from 'next-auth'

export const GET = async (request,{params}) =>{
    const session = await getServerSession(authOptions);
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
    const code = params.code;
    const className = await classCode.findOne({code:code});
    if(!className){
        return new Response(JSON.stringify({
            ok:false,
            message:"Kod je pogrešan"
        }),{status: statusCodes.BAD_REQUEST});
    }
    const attenders = await User.find({className: className.name},{_id:0, email:1,username:1,name:1,image:1});
    className.attendees = attenders;
    console.log(className);
    console.log(attenders);
    return new Response(JSON.stringify({
        ok: true,
        data: className
    }),{status: statusCodes.OK})
}