import { S3Client } from "./client";

export const deleteFile = async (fileKey: string) => {
    try {
        await S3Client.removeObject("codefiles", fileKey);
        console.log("removed the file")
    } catch (error) {
        console.error("Error deleting file from blob storage:", error);
        throw error;
    }
}