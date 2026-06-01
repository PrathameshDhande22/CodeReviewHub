import { CodeStatus, Prisma } from "@generated/prisma/client";

export interface PostCodeRequest {
  title: string;
  description: string;
  code: string | null;
  language: string;
  authorId: string;
  blobName?: string | null;
  published: boolean;
  requireComments: boolean;
  requireReview: boolean;
  postStatus?: CodeStatus;
}

export type PostAuthor = {
  id: string;
  name: string | null;
  image: string | null;
}

export type PostListItem = Prisma.PostGetPayload<{
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
            name: true;
          };
        };
      };
    };
    _count: {
      select: {
        reviews: true;
        postViews: true,
        comments: {
          where: {
            parentId: null;
            reviewId: null;
          };
        };
      };
    };
  };
}>;


export type PropertyBag = {
  IncludeAuther?: boolean;
  IncludeTags?: boolean;
  IncludeUserView?: boolean;
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
    postViews: {
      select: {
        viewerId: true
      }
    },
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
  };
}>;
