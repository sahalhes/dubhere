"use client"

import { useState } from "react"
import { ArrowRight, Upload } from "lucide-react"
import { useProcessingStatus } from "@/hooks/use-processing-status"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function DubPage() {
  const [loading, setLoading] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(undefined)
  const [currentJobId, setCurrentJobId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const job = useProcessingStatus(currentJobId)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setVideoFile(file)
  }

  const handleProcessVideo = async () => {
    if (!videoFile || !selectedLanguage) {
      setError("Please upload a video and select a language.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", videoFile)
      formData.append("language", selectedLanguage)

      const response = await fetch("/api/process_video", {
        method: "POST",
        body: formData,
      })

      const text = await response.text() // Debugging step
      console.log("Raw API Response:", text) // Logs the actual response

      try {
        const data = JSON.parse(text) // Parse JSON
        if (data.error) throw new Error(data.error)
        setCurrentJobId(data.jobId)
      } catch (jsonError) {
        throw new Error("Invalid JSON response from API.")
      }
    } catch (error) {
      console.error("Error processing video:", error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unknown error occurred.")
      }
    } finally {
      setLoading(false)
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
                  <span className="text-sm text-muted-foreground">
                    {videoFile ? videoFile.name : "Drag & drop or click to upload"}
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileUpload}
                    disabled={loading}
                  />
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Target Language</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Target Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Hindu">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleProcessVideo} className="w-full" disabled={!videoFile || !selectedLanguage || loading}>
                Process Video <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mt-4 text-center text-red-600">
          {error}
        </div>
      )}

      {job && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Processing Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {job.steps.map((step, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{step.step}</span>
                    <span className="text-sm text-muted-foreground">
                      {step.status === "completed" ? "100%" : `${step.progress}%`}
                    </span>
                  </div>
                  <Progress value={step.status === "completed" ? 100 : step.progress} className="h-2" />
                </div>
              ))}

              {job.status === "completed" && job.outputUrl && (
                <div className="mt-6 text-center">
                  <Button asChild>
                    <a href={job.outputUrl} target="_blank" rel="noopener noreferrer">
                      Download Dubbed Video
                    </a>
                  </Button>
                </div>
              )}


              {job.status === "error" && (
                <div className="mt-4 text-center text-red-600">
                  {job.error || "An error occurred during processing"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
