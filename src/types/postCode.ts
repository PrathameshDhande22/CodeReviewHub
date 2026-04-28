import { Prisma } from "@generated/prisma/client";

export interface PostCodeRequest {
  title: string;
  description: string;
  code: string | null;
  language: string | null;
  authorId: string;
  blobName?: string | null;
  published: boolean;
  requireComments: boolean;
  requireReview: boolean;
}

export type SelectedPost = Prisma.PostGetPayload<{
  select: {
    id: true;
    title: true;
    description: true;
    published: true;
    language: true;
    code: true;
    blobName: true;
    requireReview: true;
    acceptedReviewId: true;
    requireComments: true;
    authorId: true;
    status: true;
    createdAt: true;
    updatedAt: true;
    author: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
    postTags: {
      select: {
        tag: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;


export type PropertyBag = {
  IncludeAuther?: boolean;
  IncludeTags?: boolean;
  IncludeComments?: boolean;
  IncludeReviews?: boolean;
}

export type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
    postTags: {
      select: {
        tag: {
          select: {
            id: true;
            name: true;
          };
        };
      };
    };
    comments: {
      select: {
        id: true;
        content: true;
        lineno: true;
        authorId: true;
        author: {
          select: {
            id: true;
            name: true;
            image: true;
          };
        };
        parentId: true;
        createdAt: true;
      };
    };
    reviews: {
      select: {
        id: true;
        content: true;
        rating: true;
        isAccepted: true;
        reviewerId: true;
        reviewer: {
          select: {
            id: true;
            name: true;
            image: true;
          };
        };
        createdAt: true;
      };
    };
  };
}>;
