export interface PostCodeRequest {
  title: string;
  description: string;
  code: string | null;
  language: string | null;
  authorId: string;
  blobName: string | undefined;
  published: boolean;
  requireComments: boolean;
  requireReview: boolean;
}
