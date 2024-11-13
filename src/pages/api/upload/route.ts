// pages/api/upload.ts

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dtjp7zckx",
  api_key: "788124521195121",
  api_secret: "788124521195121",
});

export async function POST(request: NextRequest) {
  console.log("HOLA :DDDDDDDDDDDDD");
  const data = await request.formData();
  const image = data.get("image");

  if (!image || !(image instanceof File)) {
    return NextResponse.json("No se ha subido ninguna imagen", { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const response = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        })
        .end(buffer);
    });

    console.log(response);

    return NextResponse.json({
      message: "Imagen subida",
      url: response.secure_url,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json("Error subiendo la imagen", { status: 500 });
  }
}
