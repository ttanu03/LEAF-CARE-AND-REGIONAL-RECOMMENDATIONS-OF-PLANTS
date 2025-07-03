"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onImageCapture: (imageData: string) => void
}

export default function ImageUpload({ onImageCapture }: ImageUploadProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = event.target?.result as string
        setPreviewImage(imageData)
        onImageCapture(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const startCamera = async () => {
    try {
      setIsCapturing(true)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setIsCapturing(false)
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw video frame to canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Convert canvas to data URL
      const imageData = canvas.toDataURL("image/jpeg")
      setPreviewImage(imageData)
      onImageCapture(imageData)

      // Stop camera stream
      const stream = video.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())

      setIsCapturing(false)
    }
  }

  const cancelCapture = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream
      if (stream) {
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
    setIsCapturing(false)
  }

  const clearImage = () => {
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        {isCapturing ? (
          <div className="flex flex-col items-center">
            <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover rounded-md mb-4" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-2">
              <Button onClick={captureImage} className="bg-green-600 hover:bg-green-700">
                Capture
              </Button>
              <Button variant="outline" onClick={cancelCapture}>
                Cancel
              </Button>
            </div>
          </div>
        ) : previewImage ? (
          <div className="relative">
            <Image
              src={previewImage || "/placeholder.svg"}
              alt="Plant preview"
              width={400}
              height={300}
              className="w-full h-64 object-contain rounded-md"
            />
            <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={clearImage}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="border-2 border-dashed border-green-300 rounded-md p-8 w-full flex flex-col items-center justify-center bg-green-50">
              <p className="text-green-800 mb-4">Upload or take a photo of your plant</p>
              <div className="flex gap-4">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex items-center gap-2 border-green-600 text-green-700"
                >
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
                <Button
                  onClick={startCamera}
                  variant="outline"
                  className="flex items-center gap-2 border-green-600 text-green-700"
                >
                  <Camera className="h-4 w-4" />
                  Camera
                </Button>
              </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
