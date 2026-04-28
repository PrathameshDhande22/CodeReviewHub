import { S3Client } from "./client";

export const getFileContent = async (blobname: string) => {
    const exists = await S3Client.bucketExists("codefiles");
    if (!exists) {
        console.log("bucket Does not exists")
        return null;
    }

    let code: string = ""
    try {
        const stream = await S3Client.getObject("codefiles", blobname);
        await new Promise((resolve, reject) => {
            stream.on("data", (chunk) => {
                code += chunk.toString();
            });

            stream.on("end", () => {
                resolve(null);
            });

            stream.on("error", reject);
        });
        return code;
    } catch (error) {
        console.error("Error fetching file from blob storage:", error);
        throw error;
    }
}