import { prisma } from "@/prisma";


export async function addComment(postid: string, startline: number, content: string, userid: string, endline?: number | null) {
    try {
        const comment = await prisma.comment.create({
            data: {
                content: content,
                authorId: userid,
                postId: postid,
                startlineno: startline,
                endlineno: endline
            }, select: {
                id: true
            }
        })
        return comment.id

    } catch (error) {
        console.error(error)
        throw error;
    }
}