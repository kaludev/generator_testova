import { authOptions } from '@app/api/auth/[...nextauth]/route';
import classCode from '@models/classCodes';
import Subject from '@models/subject';
import statusCodes from 'http-status-codes'
import { getServerSession } from 'next-auth'

export const GET = async (request) =>{
    const session = await getServerSession(authOptions);
    if(!session?.user){
        return new Response(JSON.stringify({
            ok: false,
            message: "Morate biti ulogovani"
        }),{status: statusCodes.UNAUTHORIZED})
    }
    if(!session?.user.isSuperAdmin){
        return new Response(JSON.stringify({
            ok:false,
            message:"Morate biti Miloye"
        }),{status: statusCodes.UNAUTHORIZED});
    }
    const subjects = await Subject.find({}).populate("classes");
    return new Response(JSON.stringify({
        ok: true,
        data: subjects
    }),{status: statusCodes.OK})
}