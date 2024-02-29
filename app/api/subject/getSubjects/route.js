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
        const className = await classCode.findOne({name: session?.user.class},{_id:1})

        const subject = await Subject.find({classes: className._id},{_id:1,name:1})
        
        return new Response(JSON.stringify({
            ok: true,
            data: subject
        }),{status: statusCodes.OK})
    }
    const subjects = await Subject.find({}).populate("classes");
    return new Response(JSON.stringify({
        ok: true,
        data: subjects
    }),{status: statusCodes.OK})
}