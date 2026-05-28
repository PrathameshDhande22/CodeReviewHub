import { BucketName } from "@/types";
import { S3Client } from "./client";

export const deleteFile = async (fileKey: string, bucket: BucketName = "codefiles") => {
    try {
        await S3Client.removeObject(bucket, fileKey);
        console.log("removed the file")
    } catch (error) {
        console.error("Error deleting file from blob storage:", error);
        throw error;
    }
}
