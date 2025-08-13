'use client'
import {  ChevronRight } from "lucide-react"
import { Button } from "~/components/ui/button"
import { FileRow, FolderRow } from "./folder-row"
import type { files_table, folders_table } from "~/server/db/schema"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { UploadButton } from "~/components/UploadthingButton"
export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[],
  folders: (typeof folders_table.$inferSelect)[],
  parents: (typeof folders_table.$inferSelect)[],

  currentFolderId: number
}) {
  const Breadcrumbs: unknown[] = [];
/*
  const Breadcrumbs = useMemo(() => {
    const breadcrumbs = []
    let currentId = currentFolder

    while (currentId !== 1) {
      const folder = props.folders.find((folder) => folder.id === currentId)
      if (folder) {
        breadcrumbs.unshift(folder)
        currentId = folder.parent ?? 1
      } else {
        break
      }
    }

    return breadcrumbs
  }, [currentFolder, props.folders]);
*/

  const navigate = useRouter()
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href={`/`}>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-black mr-2"
            >
              My Drive
            </Button>
            </Link>
            {props.parents.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link href={`/f/${folder.id}`}>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-black"
                >
                  {folder.name}
                </Button>
                </Link>
              </div>
            ))}
          </div>
           <SignedOut>
              <SignInButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl">
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}

            {props.files.map((file) => (
              <FileRow key={file.id} file={file}/>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <UploadButton endpoint={"driveUploader"} input={{
              folderId: props.currentFolderId
            }} onClientUploadComplete={
              () => {
                navigate.refresh()
                }}>
                
          </UploadButton>
        </div>
      </div>
    </div>
  )
}

