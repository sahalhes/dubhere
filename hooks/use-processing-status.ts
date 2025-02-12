"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import type { VideoJob } from "@/types/video"

export function useProcessingStatus(jobId: string | null) {
  const [job, setJob] = useState<VideoJob | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!jobId) return

    // Initial fetch
    const fetchJob = async () => {
      const { data } = await supabase.from("video_jobs").select("*").eq("id", jobId).single()

      if (data) setJob(data)
    }
    fetchJob()

    // Subscribe to changes
    const channel = supabase
      .channel(`job-${jobId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "video_jobs",
          filter: `id=eq.${jobId}`,
        },
        (payload) => {
          setJob(payload.new as VideoJob)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [jobId, supabase])

  return job
}

