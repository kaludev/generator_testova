import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import statusCodes from 'http-status-codes'
import Chapter from "@models/chapter";
import Question from "@models/question";

export const POST = async (request) =>{
    try{
        const session = await getServerSession(authOptions)
        if(!session.user){
            return new Response(JSON.stringify({
                ok: false,
                message: "Morate biti ulogovani"
            }),{status: statusCodes.UNAUTHORIZED})
        }
        const data = await request.json();
        console.log(session.user)
        const question= {
            question:data.question,
            author:session.user._id
        }
        const chapter = await Question.create(question);
        await Chapter.findByIdAndUpdate(data.id,{$addToSet:{questions:chapter._id}})
        return new Response(JSON.stringify({
            ok:true, 
            data: chapter
        }),{status: statusCodes.OK});
    }catch (e) {
        return new Response(JSON.stringify({
            ok:false,
            message:e.message
        }),{status: statusCodes.INTERNAL_SERVER_ERROR});
    }
    
}