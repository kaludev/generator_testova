import statusCodes from 'http-status-codes'

export const GET = (request) =>{
    return new Response(JSON.stringify({
        ok: true,
        data: []
    }),{status: statusCodes.OK})
}