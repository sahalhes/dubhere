import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { jobId } = await req.json()
    const supabase = createClient()

    // Fetch job details
    const { data: job, error: jobError } = await supabase
      .from("video_jobs")
      .select("*")
      .eq("id", jobId)
      .single()

    if (jobError || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Simulate processing (update steps)
    const updatedSteps = job.steps.map((step: any) => ({
      ...step,
      progress: 100,
      status: "completed",
    }))

    // Update job in database
    const { error: updateError } = await supabase
      .from("video_jobs")
      .update({ steps: updatedSteps, status: "completed" })
      .eq("id", jobId)

    if (updateError) throw updateError

    return NextResponse.json({ message: "Processing completed", jobId })
  } catch (error) {
    console.error("Error in processing:", error)
    return NextResponse.json({ error: "Processing failed" }, { status: 500 })
  }
}
