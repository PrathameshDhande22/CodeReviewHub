import { S3Client } from "./client";

export const uploadFile = async (userid: string) => {
  // check if the bucket exists
  const exists = await S3Client.bucketExists("codefiles");
  if (exists) {
    console.log("Bucket exists.");
  } else {
    await S3Client.makeBucket("codefiles");
  }

  const metadata = {
    "X-UserId": userid,
  };

  // put the files

};
