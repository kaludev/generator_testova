import { authOptions } from '@app/api/auth/[...nextauth]/route';
import Chapter from '@models/chapter';
import Question from '@models/question';
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
    const id = params.id;
    const chapter = await Chapter.findById(id).populate('questions').populate('classId').populate('subjectId');
    if(!chapter){
        return new Response(JSON.stringify({
            ok:false,
            message:"Kod je pogrešan"
        }),{status: statusCodes.BAD_REQUEST});
    }
    
    console.log(chapter);
    const data = {...chapter._doc}
    console.log(data);
    return new Response(JSON.stringify({
        ok: true,
        data: data
    }),{status: statusCodes.OK})
}