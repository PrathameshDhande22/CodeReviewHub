import { prisma } from "@/prisma";
import { UserStats } from "@/types/profile";
import { Reputation } from "@generated/prisma/client";

export async function getReputations(): Promise<Reputation[]> {
    return prisma.reputation.findMany({
        orderBy: {
            score: "asc"
        }
    })
}

export async function getUserReputation(userId: string) {
    return prisma.userReputation.findFirst({
        where: { userid: userId },
        include: {
            reputation: true
        }
    });
}

export async function addUserReputation(userId: string) {
    const startingReputation = (await getReputations()).find((value) => value.score === 0)!

    const reputation = await prisma.userReputation.create({
        data: {
            userid: userId,
            score: 0,
            reputationid: startingReputation?.id
        }
    })
    return reputation.id
}

export async function getUserStats(userId: string): Promise<UserStats> {
    const reviewcount = prisma.review.count({
        where: {
            reviewerId: userId
        }
    })

    const postgroupby = prisma.post.groupBy({
        by: ['language'],
        orderBy: {
            _count: {
                language: "desc"
            }
        },
        where: {
            authorId: userId
        },
        _count: true
    })

    const [count, commonLang] = await Promise.all([reviewcount, postgroupby])

    return {
        reviewAdded: count,
        primaryLanguage: commonLang[0]?.language || "N/A"
    }
}
