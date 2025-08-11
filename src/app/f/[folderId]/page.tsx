import { db } from "~/server/db";
import DriveContents from "../../drive-contents";
import { files as fileSchema, folders as folderSchema } from "~/server/db/schema";
import { eq } from "drizzle-orm";


export default async function GoogleDriveClone( props: 
    {params : Promise<{
        folderId: string
    }>}
) {

    const params = await props.params

    const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }
    
  const files = await db.select().from(fileSchema);
  const folders = await db.select()
    .from(folderSchema)
    .where(eq(folderSchema.parent, parsedFolderId));
  return(<DriveContents files={files} folders={folders} />)
}