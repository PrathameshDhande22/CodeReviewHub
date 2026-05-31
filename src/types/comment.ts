import { Prisma } from "@generated/prisma/client";

export interface CommentCountOnPost {
    count: number;
    startlineno: number
}

export type CommentUpdatedResponse = {
    id: string,
    content: string
}

export type CommentWithAuthorAndReplyCount = Omit<Prisma.CommentGetPayload<{
    include: {
        author: {
            select: {
                id: true;
                name: true;
                image: true;
            };
        };
        _count: {
            select: {
                replies: true;
            };
        };
    };
}>, "_count"> & {
    replyCount: number;
}

export type CommentForUser = Omit<Prisma.CommentGetPayload<{
    include: {
        post: {
            select: {
                id: true;
                title: true;
            };
        };
        author: {
            select: {
                id: true;
                name: true;
                image: true;
            };
        };
        _count: {
            select: {
                replies: true;
            };
        };
    };
}>, "_count"> & {
    replyCount: number;
};

export interface PaginatedCommentsResponse {
    comments: CommentForUser[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
}