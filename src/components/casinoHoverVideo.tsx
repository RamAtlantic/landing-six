"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface CasinoHoverVideoProps {
  onRegistration: () => void
  isLoading: boolean
  children: React.ReactNode
}

export function CasinoHoverVideo({ onRegistration, isLoading, children }: CasinoHoverVideoProps) {
  const [isCasinoHovered, setIsCasinoHovered] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleCasinoMouseEnter = () => {
    setIsCasinoHovered(true)
    setShowVideo(true)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Start video playback
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(console.error)
    }

    // Set timeout to hide video after 5 seconds
    timeoutRef.current = setTimeout(() => {
      setShowVideo(false)
      setIsCasinoHovered(false)
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }, 5000)
  }

  const handleCasinoMouseLeave = () => {
    setIsCasinoHovered(false)
    setShowVideo(false)

    // Clear timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    // Pause video
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="bg-black rounded-lg p-4 border border-gray-700 cursor-pointer hover:border-yellow-500 hover:shadow-lg transition-all duration-500 ease-in-out"
      onMouseEnter={handleCasinoMouseEnter}
      onMouseLeave={handleCasinoMouseLeave}
      onClick={onRegistration}
    >
      <div className="grid grid-cols-1 gap-4 items-center lg:grid-cols-2">
        {children}

        <div className="flex justify-center relative">
          {/* Static Image */}
          <img
            src="https://nic5.mooneymaker.io/img/casino.webp"
            className={`w-full max-w-xs transition-opacity duration-300 ${showVideo ? "opacity-0" : "opacity-100"}`}
            alt="Casino"
          />

          {/* Hover Video */}
          <video
            ref={videoRef}
            src="/video.mp4"
            className={`w-full max-w-xs absolute top-0 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${showVideo ? "opacity-100" : "opacity-0"}`}
            muted
            playsInline
            loop={false}
            preload="metadata"
          />
        </div>
      </div>
    </div>
  )
}
