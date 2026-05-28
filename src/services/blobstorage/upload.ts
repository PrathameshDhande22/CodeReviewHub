import { BucketName } from "@/types";
import { ItemBucketMetadata } from "minio";
import { S3Client } from "./client";

const publicReadPolicy = (bucket: string) =>
  JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: ["*"] },
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucket}/*`],
      },
    ],
  });

export const getPublicUrl = (bucket: BucketName, objectName: string): string => {
  const protocol = process.env.MINIO_USE_SSL === "true" ? "https" : "http";
  return `${protocol}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucket}/${objectName}`;
};

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
    if (bucket === "profile-images") {
      await S3Client.setBucketPolicy(bucket, publicReadPolicy(bucket));
    }
  }

  const metadata: ItemBucketMetadata = {
    "X-UserId": userid,
    "Content-Type": file.type,
  };

  const filebuffer = Buffer.from(await file.arrayBuffer());

  await S3Client.putObject(
    bucket,
    objectname,
    filebuffer,
    file.size,
    metadata,
  );
};
