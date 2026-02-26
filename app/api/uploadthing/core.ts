import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Yükleme işlemini kimler yapabilir? (Şimdilik herkes yapabilsin diye basit tutuyoruz)
const auth = (req: Request) => ({ id: "admin" });

export const ourFileRouter = {
  imageUploader: f({ 
    image: { 
      maxFileSize: "4MB", 
      maxFileCount: 10 // <--- BURAYI 1 YERİNE 10 (veya istediğin sayı) YAP
    } 
  })
    .middleware(async ({ req }) => {
       // ... auth kontrolleri ...
       return { userId: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;