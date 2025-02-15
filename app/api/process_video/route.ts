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

    // Try first endpoint (artificialguybr/video-dubbing)
    try {
      console.log("Trying Gradio Client: artificialguybr/video-dubbing");
      client = await Client.connect("artificialguybr/video-dubbing");
      result = await client.predict("/process_video", {
        video: { video: blob, subtitles: null },
        target_language: language,
        use_wav2lip: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.warn("First endpoint failed:", error.message);
      } else {
        console.warn("First endpoint failed:", error);
      }

      // Try second endpoint (Google Colab Gradio)
      try {
        console.log("Falling back to Gradio Client: https://gradio.live/");
        client = await Client.connect("https://0b5e96bf239e022c98.gradio.live/");
        result = await client.predict("/process_video", {
          video: { video: blob, subtitles: null },
          target_language: language,
          use_wav2lip: false,
        });
      } catch (fallbackError) {
        if (fallbackError instanceof Error) {
          console.error("Both endpoints failed:", fallbackError.message);
        } else {
          console.error("Both endpoints failed:", fallbackError);
        }
        return NextResponse.json({ error: "Failed to process video from both sources" }, { status: 500 });
      }
    }

    if (!result) {
      return NextResponse.json({ error: "No response from video processing service" }, { status: 500 });
    }

    const videoUrl = (result.data as { video: { url: string } }[])[0]?.video?.url;

    if (!videoUrl) {
      return NextResponse.json({ error: "No video URL in response" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      jobId: Date.now().toString(),
      videoUrl,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to process video", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "50mb",
  },
};