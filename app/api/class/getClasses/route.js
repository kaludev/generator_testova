import { authOptions } from '@app/api/auth/[...nextauth]/route';
import classCode from '@models/classCodes';
import statusCodes from 'http-status-codes'
import { getServerSession } from 'next-auth'

export const GET = async (request) =>{
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
    const classNames = await classCode.find({});
    return new Response(JSON.stringify({
        ok: true,
        data: classNames
    }),{status: statusCodes.OK})
}