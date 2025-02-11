import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function ImageGeneration() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Image Generation</h1>

      <div className="grid gap-6 max-w-xl">
        <div className="space-y-2">
          <label className="text-sm font-medium">Model</label>
          <Select defaultValue="stable-diffusion">
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
              <SelectItem value="dall-e">DALL-E</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Prompt</label>
          <Textarea placeholder="Enter a prompt to generate an image" className="min-h-[100px]" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Width</label>
            <Input type="number" defaultValue={512} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Height</label>
            <Input type="number" defaultValue={512} />
          </div>
        </div>

        <Button className="w-full">Generate</Button>

        <div className="space-y-2">
          <h2 className="text-lg font-medium">History</h2>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">No images generated yet</p>
          </div>
        </div>
      </div>
    </div>
  )
}

