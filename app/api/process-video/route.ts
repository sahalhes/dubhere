import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
try {
    const supabase = createClient()
    const {
    data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { videoUrl, language } = await req.json()

    // Create a new job in the database
    const { data: job, error } = await supabase
    .from("video_jobs")
    .insert({
        user_id: user.id,
        video_url: videoUrl,
        target_language: language,
        status: "processing",
        steps: [
        { step: "Extracting audio", progress: 0, status: "pending" },
        { step: "Transcribing", progress: 0, status: "pending" },
        { step: "Translating", progress: 0, status: "pending" },
        { step: "Generating speech", progress: 0, status: "pending" },
        { step: "Merging audio", progress: 0, status: "pending" },
        ],
    })
    .select()
    .single()

    if (error) throw error

    // Start the processing pipeline
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/process-video/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobId: job.id }),
    })

    return NextResponse.json({ jobId: job.id })
} catch (error) {
    console.error("Error processing video:", error)
    return NextResponse.json({ error: "Failed to process video" }, { status: 500 })
}
}

