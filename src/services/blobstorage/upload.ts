import { S3Client } from "./client";
import { ItemBucketMetadata } from "minio";

export const uploadFile = async (
  userid: string,
  objectname: string,
  file: File,
) => {
  // check if the bucket exists
  const exists = await S3Client.bucketExists("codefiles");
  if (exists) {
    console.log("Bucket exists.");
  } else {
    await S3Client.makeBucket("codefiles");
  }

  const metadata: ItemBucketMetadata = {
    "X-UserId": userid,
    "Content-Type": file.type,
  };

  // Convert the file to buffer
  const filebuffer = Buffer.from(await file.arrayBuffer());

  // put the files
  await S3Client.putObject(
    "codefiles",
    objectname,
    filebuffer,
    file.size,
    metadata,
  );
};
