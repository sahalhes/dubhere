export type VideoMetadata = {
    duration: number
    resolution: string
    format: string
  }
  
  export type ProcessingStatus = "idle" | "uploading" | "processing" | "completed" | "error"
  
  export type ProcessingStep = {
    step: string
    progress: number
    status: "pending" | "processing" | "completed" | "error"
  }
  
  export type VideoJob = {
    id: string
    userId: string
    videoUrl: string
    targetLanguage: string
    status: ProcessingStatus
    steps: ProcessingStep[]
    metadata?: VideoMetadata
    outputUrl?: string
    error?: string
    createdAt: string
    updatedAt: string
  }
  
  