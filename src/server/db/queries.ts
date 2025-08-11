import { db } from "~/server/db";
import { files_table as fileSchema, folders_table as folderSchema } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function getAllParents (folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(folderSchema)
        .where(eq(folderSchema.id, currentId));

      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }
      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }
    return parents;
  }

export  function getFiles(folderId: number){
      const filesPromise =  db.select()
    .from(fileSchema)
    .where(eq(fileSchema.parent, folderId));
    return filesPromise
}


export  function getFolders(folderId: number){
        const foldersPromise =  db.select()
    .from(folderSchema)
    .where(eq(folderSchema.parent, folderId));
    return foldersPromise
}