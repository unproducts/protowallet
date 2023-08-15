import { Document } from '../custom-langchain';
import { WebPDFLoader } from "../custom-langchain";

export const loadPDFDocument = async (blob: Blob): Promise<Document> => {
  const loader = new WebPDFLoader(blob);
  const documents = await loader.load();
  return documents[0];
};
