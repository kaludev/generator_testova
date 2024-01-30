import className from "@models/classCodes";
import User from "@models/user";
import { getServerSession } from "next-auth";


export const POST = async (request) =>{
    const session = await getServerSession()
    const user = await User.findOne({email: session.user.email});
    return new Response(JSON.stringify({
        ok:true,
        className: className
    }))
}