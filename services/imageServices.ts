import {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET,
} from "@/constants";
import axios from "axios";
import { ResponseType } from "./../types";

const CLOUDINARY_CLOUD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (
    file: { uri?: string } | string,
    folderName: string
): Promise<ResponseType> => {
    try {
        // If file is already a URL (string), return it directly
        if (typeof file === "string") {
            return { success: true, data: file };
        }

        // If file is an object with a URI (React Native image)
        if (file?.uri) {
            const formData = new FormData();
            formData.append("file", {
                uri: file.uri,
                type: "image/jpeg", // you can make this dynamic
                name: file.uri.split("/").pop() || "file.jpg",
            } as any);

            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            formData.append("folder", folderName);

            const response = await axios.post(CLOUDINARY_CLOUD_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log(response.data);
            

            return { success: true, data: response?.data?.secure_url };
        }

        return { success: false, msg: "Invalid file input" };
    } catch (error: any) {
        console.log("Got error uploading the file:", error);
        return {
            success: false,
            msg: error.message || "Could not upload file",
        };
    }
};

export const getProfileImage = (file: any) => {
    if (file && typeof file === "string") return file;
    if (file && typeof file === "object") return file.uri;

    return require("../assets/images/defaultAvatar.png");
};
