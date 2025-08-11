import { db } from "~/server/db"
import { mockFolders, mockFiles } from "~/lib/mock-data"
import { files, folders } from "~/server/db/schema";
export default function SandboxPage(){
    return(
        <div className="flex flex-col gap-4">
            <h1>Seed function</h1>
            <form action={async () => {
                "use server";

                console.log("sup nerds")
                await db.insert(folders).values(
                mockFolders.map((folder, index) => ({
                    id: index + 1,
                    name: folder.name,
                    parent: index !== 0 ? 1 : null, 
                    ownerId: "mock",
                }))
                );
                await db.insert(files).values(mockFiles.map(
                    (file, index) => ({
                        id: index + 1,
                    name: file.name,
                    size: 12,
                    url: file.url,
                    parent: (index % 3) + 1, 
                    ownerId: "mock",
                    })
                ))
            }}>
                <button type="submit">
                    Seed
                </button>
            </form>
        </div>
    )
}