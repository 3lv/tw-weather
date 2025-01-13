"use client"

import * as React from "react"

interface TemperatureRangeProps {
  currentMin: number
  currentMax: number
  totalMin?: number
  totalMax?: number
}

export function TemperatureRange({
  currentMin,
  currentMax,
  totalMin = 32,
  totalMax = 100
}: TemperatureRangeProps) {
  // Calculate the percentage position for gradient stops
  const minPercent = ((currentMin - totalMin) / (totalMax - totalMin)) * 100
  const maxPercent = ((currentMax - totalMin) / (totalMax - totalMin)) * 100

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white w-fit">
      <span className="text-lg font-medium tabular-nums">{currentMin}°</span>
      <div className="relative w-12 h-1 bg-white/20 rounded-full">
        <div 
          className="absolute h-full bg-white/80 rounded-full"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`
          }}
        />
      </div>
      <span className="text-lg font-medium tabular-nums">{currentMax}°</span>
    </div>
  )
}
