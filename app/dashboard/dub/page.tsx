"use client"

import { useState } from "react"
import { ArrowRight, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function DubPage() {
  const [loading, setLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [processingStatus, setProcessingStatus] = useState<"idle" | "processing" | "completed" | "error">("idle")

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // TODO: Implement file upload logic
    // 1. Upload to storage
    // 2. Get the URL
    // 3. Set the video URL
  }

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoUrl || !selectedLanguage) return

    setProcessingStatus("processing")
    try {
      // TODO: Implement video processing
      // 1. Call ElevenLabs API
      // const response = await fetch('/api/process-video', {
      //   method: 'POST',
      //   body: JSON.stringify({ videoUrl, language: selectedLanguage }),
      // })
      // 2. Handle the response
      // 3. Update processing status
      setProcessingStatus("completed")
    } catch (error) {
      console.error("Error:", error)
      setProcessingStatus("error")
    }
  }

  return (
    <div className="container py-6">
      <h1 className="mb-8 text-3xl font-bold">Dub Video</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Video Card */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Video</CardTitle>
            <CardDescription>Upload a video file from your computer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-[200px] w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 hover:border-primary">
                <label htmlFor="file-upload" className="flex cursor-pointer flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Drag & drop or click to upload</span>
                  <input id="file-upload" type="file" className="hidden" accept="video/*" onChange={handleFileUpload} />
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video URL Card */}
        <Card>
          <CardHeader>
            <CardTitle>Video URL</CardTitle>
            <CardDescription>Enter a URL from YouTube, Instagram, or other platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL</Label>
                <Input
                  id="video-url"
                  placeholder="https://..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Target Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={!videoUrl || !selectedLanguage || loading}>
                Process Video <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {processingStatus !== "idle" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Processing Status</CardTitle>
          </CardHeader>
          <CardContent>
            {processingStatus === "processing" && (
              <div className="flex items-center gap-4">
                <LoadingSpinner />
                <div>
                  <p className="font-medium">Processing your video</p>
                  <p className="text-sm text-muted-foreground">This may take a few minutes...</p>
                </div>
              </div>
            )}
            {processingStatus === "completed" && (
              <div className="text-center">
                <p className="mb-4 font-medium text-green-600">Processing complete!</p>
                <Button>Download Dubbed Video</Button>
              </div>
            )}
            {processingStatus === "error" && (
              <div className="text-center text-red-600">An error occurred. Please try again.</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

