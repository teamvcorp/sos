// // app/api/upload
// import { connectToDb, fileExists } from "@/lib/mongo";
// import { NextResponse } from "next/server";
// import { Readable } from "stream";

// export async function POST(req: Request) {
//   const { bucket } = await connectToDb();
//   // get the form data
//   const data = await req.formData();
// console.log(data)
//   // map through all the entries
//   for (const entry of Array.from(data.entries())) {
//     const [key, value] = entry;
//     // FormDataEntryValue can either be type `Blob` or `string`
//     // if its type is object then it's a Blob
//     const isFile = typeof value == "object";

//     if (isFile) {
//       const file = value as File;
//       const filename = file.name;

//       const existing = await fileExists(filename);
//       if (existing) {
//         // If file already exists, let's skip it.
//         // If you want a different behavior such as override, modify this part.
//         continue;
//       }

//       //conver the blob to stream
//       const buffer = Buffer.from(await file.arrayBuffer());
//       const stream = Readable.from(buffer);

//       const uploadStream = bucket.openUploadStream(filename, {
//         // make sure to add content type so that it will be easier to set later.
//         contentType: file.type,
//         metadata: {}, //add your metadata here if any
//       });

//       // pipe the readable stream to a writeable stream to save it to the database
//       await stream.pipe(uploadStream);
//     }
//   }

//   // return the response after all the entries have been processed.
//   return NextResponse.json({ success: true });
// }
import { connectToDb, fileExists } from "@/lib/mongo";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: Request) {
  const { bucket } = await connectToDb();
  const data = await req.formData();

  let uploadedFiles = []; // Array to store the uploaded filenames or URLs

  for (const entry of Array.from(data.entries())) {
    const [key, value] = entry;
    const isFile = typeof value == "object";

    if (isFile) {
      const file = value as File;
      const filename = file.name;

      const existing = await fileExists(filename);
      if (existing) {
        // Skip existing files
        continue;
      }

      // Convert the Blob to a stream
      const buffer = Buffer.from(await file.arrayBuffer());
      const stream = Readable.from(buffer);

      const uploadStream = bucket.openUploadStream(filename, {
        contentType: file.type,
        metadata: {}, // Add metadata here if needed
      });

      // Pipe the readable stream to a writable stream to save it to the database
      await stream.pipe(uploadStream);

      // Construct the URL or just the filename for the response
      // Assuming you're serving files from /api/uploads/
      const fileUrl = `/api/uploads/${filename}`;
      uploadedFiles.push({ filename, fileUrl });
    }
  }

  // Return a JSON response with the list of uploaded files (filenames and URLs)
  return NextResponse.json({ success: true, files: uploadedFiles });
}
