import { authOptions } from '@app/api/auth/[...nextauth]/route';
import Chapter from '@models/chapter';
import classCode from '@models/classCodes';
import Subject from '@models/subject';
import statusCodes from 'http-status-codes'
import { getServerSession } from 'next-auth'

export const POST = async (request) =>{
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
    const data = await request.json();
    const chapters = await Chapter.find({classId:data.classId,subjectId:data.subjectId});
    const className = await classCode.findOne({_id:data.classId},{_id:0 ,name:1,code:1,numOfAttenders:1});
    const subjectId = await Subject.findOne({_id:data.subjectId}, {_id:0,name:1});
    return new Response(JSON.stringify({
        ok: true,
        data: chapters,
        className: className,
        subjectId: subjectId
    }),{status: statusCodes.OK})
}