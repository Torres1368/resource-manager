import { ID } from "appwrite";
import { storage } from "./appwrite";

const bucketId = import.meta.env.VITE_BUCKET_ID_RESOURCE_FILES;

export const uploadFile = async (file) => {
  const uploaded = await storage.createFile(bucketId, ID.unique(), file);
  return uploaded.$id;
};

export const getFileUrl = (fileId) => {
  return storage.getFileView(bucketId, fileId);
};
