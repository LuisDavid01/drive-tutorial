import "server-only";

import { db } from "~/server/db";
import { files_table as fileSchema, folders_table as folderSchema, type DB_FileType } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
     getAllParents: async function (folderId: number) {
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
  },

  
    getFiles: function (folderId: number){
        const filesPromise =  db.select()
        .from(fileSchema)
        .where(eq(fileSchema.parent, folderId));
        return filesPromise
    },

    getFolders: function (folderId: number){
            const foldersPromise =  db.select()
        .from(folderSchema)
        .where(eq(folderSchema.parent, folderId));
        return foldersPromise
    },

    getFoldersById: async function(folderId: number ){
      const folder = await db.select()
      .from(folderSchema)
      .where(eq(folderSchema.id, folderId))

      return folder[0];
    },


}

export const MUTATIONS = {
  createFile: async function(input: 
    {file: {
    name: string;
    size: number;
    url: string;
    parent: number;
    ownerId: string;
  };
  userId: string

}){
  return await db.insert(fileSchema).values({...input.file,
    parent: input.file.parent,
  })
  },
}



