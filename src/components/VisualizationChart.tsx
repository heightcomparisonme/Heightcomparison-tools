'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useHeight } from '@/contexts/HeightContext'

export function VisualizationChart() {
  const { people, addPerson, clearAll, unit, setUnit, displayUnit } = useHeight()
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'))
      addPerson(data)
    } catch (error) {
      console.error('Error adding character from drag and drop:', error)
    }
  }

  // Chart dimensions and settings
  const chartHeight = 600
  const maxHeight = 260 // 260cm = ~8.5ft
  const minHeight = -20 // for ground reference
  const chartWidth = Math.max(800, people.length * 100 + 300) // Wider for PNG display
  const scale = chartHeight / (maxHeight - minHeight)

  // Generate adaptive ruler marks based on display unit and range
  const generateRulerMarks = useMemo(() => {
    const marks = []
    const heightRange = maxHeight - minHeight
    
    let increment: number
    let majorIncrement: number
    
    if (displayUnit === 'km') {
      increment = heightRange > 50000 ? 5000 : heightRange > 20000 ? 2000 : 1000
      majorIncrement = increment * 5
    } else if (displayUnit === 'm') {
      increment = heightRange > 500 ? 50 : heightRange > 200 ? 20 : 10
      majorIncrement = increment * 5
    } else if (displayUnit === 'ft') {
      increment = 30.48 // 1 foot in cm
      majorIncrement = 152.4 // 5 feet in cm
    } else { // cm
      increment = heightRange > 1000 ? 50 : heightRange > 500 ? 25 : 13
      majorIncrement = increment * 2
    }
    
    for (let cm = Math.ceil(minHeight / increment) * increment; cm <= maxHeight; cm += increment) {
      const y = chartHeight - (cm - minHeight) * scale
      const isMainMark = cm % majorIncrement === 0
      
      let primaryLabel: string
      let secondaryLabel: string
      
      if (displayUnit === 'km') {
        primaryLabel = `${(cm / 100000).toFixed(cm >= 100000 ? 0 : 1)}km`
        const ftTotal = cm / 30.48
        const ft = Math.floor(ftTotal)
        const inches = Math.round((ftTotal - ft) * 12)
        secondaryLabel = `${ft}' ${inches}"`
      } else if (displayUnit === 'm') {
        primaryLabel = `${(cm / 100).toFixed(cm >= 1000 ? 0 : 1)}m`
        const ftTotal = cm / 30.48
        const ft = Math.floor(ftTotal)
        const inches = Math.round((ftTotal - ft) * 12)
        secondaryLabel = `${ft}' ${inches}"`
      } else if (displayUnit === 'ft') {
        const ftTotal = cm / 30.48
        const ft = Math.floor(ftTotal)
        const inches = Math.round((ftTotal - ft) * 12)
        primaryLabel = ft >= 0 ? `${ft}' ${inches}"` : `${ft}' -${Math.abs(inches)}"`
        secondaryLabel = `${Math.round(cm)}cm`
      } else { // cm
        primaryLabel = `${Math.round(cm)}`
        const ftTotal = cm / 30.48
        const ft = Math.floor(ftTotal)
        const inches = Math.round((ftTotal - ft) * 12)
        secondaryLabel = ft >= 0 ? `${ft}' ${inches}"` : `${ft}' -${Math.abs(inches)}"`
      }
      
      marks.push({
        cm,
        primaryLabel,
        secondaryLabel,
        y,
        isMainMark
      })
    }
    return marks
  }, [minHeight, maxHeight, scale, chartHeight, displayUnit])

  const rulerMarks = generateRulerMarks
  const groundY = chartHeight - (0 - minHeight) * scale

  return (
    <Card className="h-full">
      {/* Chart Header Controls */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
            </Button>
            <Button variant="ghost" size="sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button variant="ghost" size="sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Button>
            <Button variant="ghost" size="sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </Button>
            <Button variant="ghost" size="sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </Button>
            
            {/* Unit Toggle Buttons */}
            <div className="flex items-center space-x-1 ml-4 border-l pl-4">
              <Button 
                variant={unit === 'auto' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setUnit('auto')}
                className="text-xs"
              >
                Auto
              </Button>
              <Button 
                variant={unit === 'cm' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setUnit('cm')}
                className="text-xs"
              >
                cm
              </Button>
              <Button 
                variant={unit === 'ft' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setUnit('ft')}
                className="text-xs"
              >
                ft
              </Button>
              {displayUnit !== 'cm' && displayUnit !== 'ft' && (
                <span className="text-xs text-gray-500 ml-2">
                  ({displayUnit})
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
            <Button variant="ghost" size="sm">⋯</Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="p-4">
        <div className="relative overflow-x-auto">
          <svg
            width={chartWidth}
            height={chartHeight + 40}
            className={`border border-gray-200 bg-white ${isTransitioning ? 'height-scale-transition' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* Background Grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Left Ruler (Primary Unit) */}
            <g className={`height-unit-transition ${isTransitioning ? 'height-ruler-fade' : ''}`}>
              <text x="10" y="15" className="text-xs font-semibold fill-gray-700">
                {displayUnit === 'km' ? 'km' : displayUnit === 'm' ? 'm' : displayUnit === 'ft' ? 'ft' : 'cm'}
              </text>
              {rulerMarks.map((mark, i) => (
                <g key={`primary-${i}`} className="height-chart-transition">
                  <line
                    x1="30" y1={mark.y}
                    x2={mark.isMainMark ? "50" : "40"} y2={mark.y}
                    stroke="#666"
                    strokeWidth={mark.isMainMark ? "2" : "1"}
                  />
                  {mark.isMainMark && (
                    <text x="55" y={mark.y + 4} className="text-xs fill-gray-700">
                      {mark.primaryLabel}
                    </text>
                  )}
                </g>
              ))}
            </g>

            {/* Right Ruler (Secondary Unit) */}
            <g className={`height-unit-transition ${isTransitioning ? 'height-ruler-fade' : ''}`}>
              <text x={chartWidth - 30} y="15" className="text-xs font-semibold fill-gray-700">
                {displayUnit === 'ft' ? 'cm' : 'ft'}
              </text>
              {rulerMarks.map((mark, i) => (
                <g key={`secondary-${i}`} className="height-chart-transition">
                  <line
                    x1={chartWidth - 50} y1={mark.y}
                    x2={chartWidth - (mark.isMainMark ? 30 : 40)} y2={mark.y}
                    stroke="#666"
                    strokeWidth={mark.isMainMark ? "2" : "1"}
                  />
                  {mark.isMainMark && (
                    <text x={chartWidth - 120} y={mark.y + 4} className="text-xs fill-gray-700">
                      {mark.secondaryLabel}
                    </text>
                  )}
                </g>
              ))}
            </g>

            {/* Ground Line */}
            <line
              x1="60" y1={groundY}
              x2={chartWidth - 60} y2={groundY}
              stroke="#8B4513"
              strokeWidth="3"
            />

            {/* People Figures */}
            {people.map((person, index) => {
              const personX = 100 + index * 100 // More space between characters
              const personHeight = person.height * scale
              const personY = groundY - personHeight
              const figureWidth = 80 // Even wider for better PNG display

              return (
                <g key={person.id} className={`height-chart-transition ${isTransitioning ? 'height-scale-transition' : ''}`}>
                  {/* Character PNG Image or Fallback Figure */}
                  {person.imageUrl ? (
                    <g>
                      {/* Character PNG with proper aspect ratio */}
                      <image
                        href={person.imageUrl}
                        x={personX - figureWidth/2}
                        y={personY}
                        width={figureWidth}
                        height={personHeight}
                        preserveAspectRatio="xMidYMid meet"
                        style={{ opacity: 1 }}
                        onLoad={(e) => {
                          console.log(`✅ 成功加载角色PNG: ${person.name} (${person.height}cm)`);
                          const img = e.target as SVGImageElement;
                          img.style.opacity = '1';
                        }}
                        onError={(e) => {
                          console.log(`❌ PNG加载失败: ${person.name} - ${person.imageUrl}`);
                          // 隐藏失败的图片，显示fallback
                          const img = e.target as SVGImageElement;
                          img.style.opacity = '0';
                          const parentG = img.parentElement;
                          if (parentG) {
                            const fallbackRect = parentG.querySelector('.fallback-figure') as SVGRectElement;
                            const fallbackHead = parentG.querySelector('.fallback-head') as SVGCircleElement;
                            if (fallbackRect) {
                              fallbackRect.style.display = 'block';
                              fallbackRect.style.opacity = '1';
                            }
                            if (fallbackHead) {
                              fallbackHead.style.display = 'block';
                              fallbackHead.style.opacity = '1';
                            }
                          }
                        }}
                      />

                      {/* Fallback geometric figure (hidden by default) */}
                      <rect
                        x={personX - figureWidth/2}
                        y={personY}
                        width={figureWidth}
                        height={personHeight}
                        fill={person.color}
                        stroke="#333"
                        strokeWidth="2"
                        rx="5"
                        style={{ display: 'none', opacity: '0.8' }}
                        className="fallback-figure"
                      />

                      {/* Fallback head */}
                      <circle
                        cx={personX}
                        cy={personY - 15}
                        r="12"
                        fill={person.color}
                        stroke="#333"
                        strokeWidth="2"
                        style={{ display: 'none', opacity: '0.8' }}
                        className="fallback-head"
                      />

                      {/* Fallback label */}
                      <text
                        x={personX}
                        y={personY + personHeight/2}
                        textAnchor="middle"
                        className="text-xs font-bold fill-white fallback-text"
                        style={{ display: 'none' }}
                      >
                        PNG
                      </text>
                    </g>
                  ) : (
                    <g>
                      {/* Default geometric figure when no image URL */}
                      <rect
                        x={personX - figureWidth/2}
                        y={personY}
                        width={figureWidth}
                        height={personHeight}
                        fill={person.color}
                        stroke="#333"
                        strokeWidth="1"
                        rx="3"
                      />

                      <circle
                        cx={personX}
                        cy={personY - 8}
                        r="8"
                        fill={person.color}
                        stroke="#333"
                        strokeWidth="1"
                      />
                    </g>
                  )}

                  {/* Height Label */}
                  <text
                    x={personX}
                    y={personY - 20}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-gray-700"
                  >
                    {(() => {
                      if (displayUnit === 'km') {
                        return `${(person.height / 100000).toFixed(person.height >= 100000 ? 1 : 2)}km`
                      } else if (displayUnit === 'm') {
                        return `${(person.height / 100).toFixed(person.height >= 1000 ? 1 : 2)}m`
                      } else if (displayUnit === 'ft') {
                        const ftTotal = person.height / 30.48
                        const ft = Math.floor(ftTotal)
                        const inches = Math.round((ftTotal - ft) * 12)
                        return `${ft}' ${inches}"`
                      } else {
                        return `${person.height}cm`
                      }
                    })()
                    }
                  </text>

                  {/* Name Label */}
                  <text
                    x={personX}
                    y={groundY + 20}
                    textAnchor="middle"
                    className="text-sm font-medium fill-gray-800"
                  >
                    {person.name}
                  </text>
                </g>
              )
            })}

            {/* Drag and Drop Area or Empty State */}
            {people.length === 0 ? (
              <g>
                <rect
                  x={50}
                  y={groundY - 200}
                  width={chartWidth - 100}
                  height={150}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  strokeDasharray="10,5"
                  rx="10"
                />
                <text
                  x={chartWidth/2}
                  y={groundY - 140}
                  textAnchor="middle"
                  className="text-lg font-medium fill-gray-400"
                >
                  🎯 拖拽角色到这里进行高度比较
                </text>
                <text
                  x={chartWidth/2}
                  y={groundY - 110}
                  textAnchor="middle"
                  className="text-sm fill-gray-400"
                >
                  从数据管理器中拖拽角色，或点击角色直接添加
                </text>
                <text
                  x={chartWidth/2}
                  y={groundY - 85}
                  textAnchor="middle"
                  className="text-xs fill-gray-300"
                >
                  角色PNG图片将按真实高度比例显示
                </text>
              </g>
            ) : (
              <text
                x={chartWidth/2}
                y={groundY - 50}
                textAnchor="middle"
                className="text-lg font-medium fill-gray-400"
              >
                HeightComparison.com
              </text>
            )}
          </svg>
        </div>
      </div>
    </Card>
  )
}
