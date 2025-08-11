import { db } from "~/server/db";
import DriveContents from "../../drive-contents";
import { files_table as fileSchema, folders_table as folderSchema } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { getAllParents, getFiles, getFolders } from "~/server/db/queries";



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
  const [folders, files, parents] = await Promise.all(
    [getFolders(parsedFolderId),
      getFiles(parsedFolderId),
      getAllParents(parsedFolderId)])
  return(<DriveContents files={files} folders={folders} parents={parents} />)
}