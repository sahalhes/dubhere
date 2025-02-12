import { createClient } from "@/utils/supabase/client"

interface VideoMetadata {
  duration: number
  resolution: string
  format: string
}

export async function uploadVideoToStorage(file: File, userId: string) {
  const supabase = createClient()
  const fileExt = file.name.split(".").pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`
  const { data, error } = await supabase.storage.from("videos").upload(fileName, file)

  if (error) throw error

  const {
    data: { publicUrl },
  } = supabase.storage.from("videos").getPublicUrl(fileName)

  return publicUrl
}

export async function getVideoMetadata(file: File): Promise<VideoMetadata> {
  return new Promise((resolve) => {
    const video = document.createElement("video")
    video.preload = "metadata"
    video.onloadedmetadata = () => {
      resolve({
        duration: video.duration,
        resolution: `${video.videoWidth}x${video.videoHeight}`,
        format: file.type,
      })
    }
    video.src = URL.createObjectURL(file)
  })
}

