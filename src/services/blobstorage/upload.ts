import { BucketName } from "@/types";
import { ItemBucketMetadata } from "minio";
import { S3Client } from "./client";

export const uploadFile = async (
  userid: string,
  objectname: string,
  file: File,
  bucket: BucketName = "codefiles",
) => {
  const exists = await S3Client.bucketExists(bucket);
  if (exists) {
    console.log("Bucket exists.");
  } else {
    await S3Client.makeBucket(bucket);
  }

  const metadata: ItemBucketMetadata = {
    "X-UserId": userid,
    "Content-Type": file.type,
  };

  const filebuffer = Buffer.from(await file.arrayBuffer());

  await S3Client.putObject(bucket, objectname, filebuffer, file.size, metadata);
};
