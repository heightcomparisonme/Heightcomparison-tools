'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useHeight } from '@/contexts/HeightContext'
import { ColorPicker } from './ColorPicker'

const colors = [
  '#f0a530', // orange
  '#c44144', // red
  '#20afe2', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#6b46c1', // violet
]

export function PersonForm() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [name, setName] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [unit, setUnit] = useState<'ft' | 'cm'>('ft')

  const { addPerson } = useHeight()

  const convertToHeight = () => {
    if (unit === 'cm') {
      return parseInt(heightCm) || 0
    } else {
      const feet = parseInt(heightFt) || 0
      const inches = parseInt(heightIn) || 0
      return Math.round((feet * 12 + inches) * 2.54)
    }
  }

  const handleSubmit = () => {
    const height = convertToHeight()
    if (height > 0) {
      addPerson({
        name: name || `Person ${Date.now()}`,
        height,
        gender,
        color: selectedColor
      })

      // Reset form
      setName('')
      setHeightFt('')
      setHeightIn('')
      setHeightCm('')
    }
  }

  return (
    <div className="space-y-4">
      {/* Gender Selection */}
      <Tabs value={gender} onValueChange={(value) => setGender(value as 'male' | 'female')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="male">Male</TabsTrigger>
          <TabsTrigger value="female">Female</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Name Input */}
      <div>
        <Input
          placeholder="Name (Optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Height Input */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-700">Height</div>
        <Tabs value={unit} onValueChange={(value) => setUnit(value as 'ft' | 'cm')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ft">ft</TabsTrigger>
            <TabsTrigger value="cm">cm</TabsTrigger>
          </TabsList>

          <TabsContent value="ft" className="mt-2">
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="-"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value.replace(/\D/g, ''))}
                className="text-center"
              />
              <div className="text-center text-sm text-gray-500 flex items-center justify-center">ft</div>
              <Input
                placeholder="-"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value.replace(/\D/g, ''))}
                className="text-center"
              />
              <div></div>
              <div></div>
              <div className="text-center text-sm text-gray-500 flex items-center justify-center">inch</div>
            </div>
          </TabsContent>

          <TabsContent value="cm" className="mt-2">
            <Input
              placeholder="Height in cm"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value.replace(/\D/g, ''))}
              className="w-full"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Color Picker */}
      <div className="space-y-2">
        <div className="grid grid-cols-6 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColor === color ? 'border-gray-400 scale-110' : 'border-gray-200'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Avatar Selection Placeholder */}
      <div className="text-center">
        <Button variant="ghost" className="text-blue-600">
          Choose Avatar ▼
        </Button>
      </div>

      {/* Add Person Button */}
      <Button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={convertToHeight() === 0}
      >
        + Add Person
      </Button>
    </div>
  )
}
