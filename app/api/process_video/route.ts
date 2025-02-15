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

    let client;
    let result;

    try {
      console.log("Trying Gradio Client: artificialguybr/video-dubbing");
      client = await Client.connect("artificialguybr/video-dubbing");
      result = await client.predict("/process_video", {
        video: { video: blob, subtitles: null },
        target_language: language,
        use_wav2lip: false,
      });

      console.log("Raw result from Gradio:", JSON.stringify(result));

      if (!result) {
        throw new Error("No response from video processing service");
      }

      const videoUrl = (result.data as { video: { url: string } }[])[0]?.video?.url;

      if (!videoUrl) {
        throw new Error("No video URL in response");
      }

      return NextResponse.json({
        success: true,
        jobId: Date.now().toString(),
        videoUrl,
      });
    } catch (error) {
      console.error("Error in video processing:", error);
      return NextResponse.json({ 
        error: "Failed to process video", 
        details: error instanceof Error ? error.message : String(error) 
      }, { status: 500 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ 
      error: "Failed to process request", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "50mb",
  },
};