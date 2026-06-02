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

export async function incrementUserReputationScore(userId: string, points: number) {
    const [userReputation, allReputations] = await Promise.all([
        getUserReputation(userId),
        getReputations(),
    ]);

    if (!userReputation) return;

    const newScore = userReputation.score + points;

    // Find the highest tier whose score threshold the new score meets or exceeds
    const newTier = [...allReputations]
        .reverse()
        .find((tier) => newScore >= tier.score);

    await prisma.userReputation.update({
        where: { userid: userId },
        data: {
            score: newScore,
            ...(newTier && newTier.id !== userReputation.reputationid
                ? { reputationid: newTier.id }
                : {}),
        },
    });
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
