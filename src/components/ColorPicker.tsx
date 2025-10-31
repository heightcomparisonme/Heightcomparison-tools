'use client'

interface ColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
  colors?: string[]
}

const defaultColors = [
  '#f0a530', // orange
  '#c44144', // red
  '#20afe2', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#6b46c1', // violet
]

export function ColorPicker({ selectedColor, onColorChange, colors = defaultColors }: ColorPickerProps) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onColorChange(color)}
          className={`w-8 h-8 rounded-full border-2 transition-all ${
            selectedColor === color ? 'border-gray-400 scale-110' : 'border-gray-200'
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}
