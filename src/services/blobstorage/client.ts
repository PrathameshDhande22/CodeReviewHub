import * as minio from "minio";

export const S3Client: minio.Client = new minio.Client({
  endPoint: String(process.env.MINIO_ENDPOINT),
  accessKey: String(process.env.MINIO_ACCESS_KEY),
  port: Number(process.env.MINIO_PORT),
  secretKey: String(process.env.MINIO_SECRET_KEY),
  useSSL: process.env.MINIO_USE_SSL === "true",
});
