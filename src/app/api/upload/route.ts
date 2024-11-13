import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

export async function POST(request: Request) {
  const data = await request.formData();
  const image = data.get("image");

  console.log("HOLA :DDDDDDDDDDDDD");

  if (!image || !(image instanceof File)) {
    return NextResponse.json("No se ha subido ninguna imagen", { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64Image = buffer.toString("base64");

  try {
    const response = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64Image}`,
      {
        resource_type: "auto", // Automatically determine resource type
      }
    );

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
