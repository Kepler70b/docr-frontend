"use client";
import { uploadFile } from '@/utils/api';
import { useState } from 'react';

const FileUpload = ({ currfile, onFileChange ,handlenewoptions }) => {
  const [isUploading,setUploading] = useState(false);
  

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0]; // Get the selected file
    onFileChange(file); // Pass file to the parent component
  };
  const handleUpload= async() => {
    try{
      setUploading(true);
      const res=await uploadFile(currfile)
      console.log(res);
      const fileID=res.data.file_id.split("/").at(-1)
      handlenewoptions(fileID); // Pass the new options to the parent component
      setUploading(false);
    }catch(e){
      console.log(e);
      setUploading(false);
    }
  }
  return (
    <>
    {/* <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div> */}
    <div className="flex flex-col items-center justify-center w-full gap-4 mt-4 sm:flex-row">
      <div className=" w-full h-16  duration-150 border rounded sm:w-4/5 hover:border-zinc-100/80 border-zinc-600 focus-within:border-zinc-100/80 focus-within:ring-0 ">
      <label
            className="flex items-center justify-center h-16  text-sm whitespace-no-wrap duration-150 border rounded hover:border-zinc-100/80 border-zinc-600 focus:border-zinc-100/80 focus:ring-0 text-zinc-100 hover:text-white hover:cursor-pointer "
            htmlFor="file_input"
          >
            {currfile? currfile.name :"Upload a file"}
          </label>          
          <input
            onChange={handleFileChange}
            // onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="file_input"
            type="file"/>
             
      </div>
      <div className="relative w-full h-16 px-3 py-2 duration-150 border rounded sm:w-1/5 hover:border-zinc-100/80 border-zinc-600 focus-within:border-zinc-100/80 focus-within:ring-0 ">
      <label htmlFor="uploads_btn" className="sr-only" />
        <button id="uploads_btn" className="h-full w-full bg-transparent border-0 border-transparent rounded text-center text-zinc-500 focus:ring-0 sm:text-sm" onClick={handleUpload} disabled={isUploading}>
        {isUploading ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg> : "Upload"
        }
        {isUploading && "uploading" }
        </button>

      </div>
    </div>
</>
  );
};

export default FileUpload;
