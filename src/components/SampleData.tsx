'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useHeight } from '@/contexts/HeightContext'
import { getRandomCharacters, AppCharacter } from '@/lib/supabaseService'

export function SampleData() {
  const { addPerson, clearAll, people } = useHeight()
  const [sampleCharacters, setSampleCharacters] = useState<AppCharacter[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadSampleCharacters = async () => {
      try {
        const characters = await getRandomCharacters(8)
        setSampleCharacters(characters)
      } catch (error) {
        console.error('Error loading sample characters:', error)
      }
    }

    loadSampleCharacters()
  }, [])

  const loadSampleData = async () => {
    setLoading(true)
    try {
      clearAll()
      const characters = await getRandomCharacters(5)
      characters.forEach(character => {
        addPerson({
          name: character.name,
          height: character.height,
          gender: character.gender,
          color: character.color || getRandomColor(),
          imageUrl: character.imageUrl
        })
      })
    } catch (error) {
      console.error('Error loading sample data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addRandomPerson = async () => {
    try {
      if (sampleCharacters.length > 0) {
        const randomCharacter = sampleCharacters[Math.floor(Math.random() * sampleCharacters.length)]
        addPerson({
          name: randomCharacter.name,
          height: randomCharacter.height,
          gender: randomCharacter.gender,
          color: randomCharacter.color || getRandomColor(),
          imageUrl: randomCharacter.imageUrl
        })
      }
    } catch (error) {
      console.error('Error adding random person:', error)
    }
  }

  const getRandomColor = () => {
    const colors = ['#f0a530', '#c44144', '#20afe2', '#8b5cf6', '#ec4899', '#6b46c1']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-700">Quick Start</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          onClick={loadSampleData}
          variant="outline"
          size="sm"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load Sample Data'}
        </Button>
        <Button
          onClick={addRandomPerson}
          variant="outline"
          size="sm"
          className="w-full"
          disabled={sampleCharacters.length === 0}
        >
          Add Random Person
        </Button>
        {people.length > 0 && (
          <Button
            onClick={clearAll}
            variant="outline"
            size="sm"
            className="w-full text-red-600 hover:text-red-700"
          >
            Clear All ({people.length})
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
