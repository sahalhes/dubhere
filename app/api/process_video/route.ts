import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const language = formData.get("language") as string;

    if (!file || !language) {
      return NextResponse.json({ error: "Missing file or language" }, { status: 400 });
    }

    // Convert File to Blob
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });

    console.log("Uploading file:", file.name);
    console.log("Target Language:", language);

    // Connect to Gradio client
    const client = await Client.connect("artificialguybr/video-dubbing");
    console.log("Connected to Gradio API");

    // Make prediction
    const result = await client.predict(
      "/process_video",
      {
        video: { video: blob, subtitles: null },
        target_language: language,
        use_wav2lip: false,
      }
    );

    if (!result) {
      throw new Error("No response from video processing service");
    }

    const videoUrl = (result.data as { video: { url: string } }[])[0]?.video?.url;

    return NextResponse.json({
      success: true,
      jobId: Date.now().toString(),
      videoUrl, // Add this field for the frontend
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to process video" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "50mb",
  },
};
