'use client'

import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useHeight } from '@/contexts/HeightContext'
import { CharacterAvatar } from '@/components/CharacterAvatar'
import {
  fetchCelebrities,
  fetchGenericHumans,
  fetchCharactersByCategory,
  searchCharacters,
  AppCharacter
} from '@/lib/supabaseService'

type CategoryType = 'celebrity' | 'generic' | 'anime' | 'objects' | 'animals'

export function CharacterDatabase() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('celebrity')
  const [characters, setCharacters] = useState<AppCharacter[]>([])
  const [loading, setLoading] = useState(false)
  const { addPerson } = useHeight()

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true)
      try {
        if (searchQuery.trim()) {
          const results = await searchCharacters(searchQuery)
          setCharacters(results)
        } else {
          let results: AppCharacter[] = []
          switch (selectedCategory) {
            case 'celebrity':
              results = await fetchCelebrities()
              break
            case 'generic':
              results = await fetchGenericHumans()
              break
            case 'anime':
              results = await fetchCharactersByCategory(3) // Anime category ID
              break
            case 'objects':
              results = await fetchCharactersByCategory(9) // Objects category ID
              break
            case 'animals':
              results = await fetchCharactersByCategory(6) // Animals category ID
              break
            default:
              results = []
          }
          setCharacters(results)
          // Debug: Log the first few characters to see their image URLs
          if (results.length > 0) {
            console.log('Characters with image URLs:', results.slice(0, 3).map(c => ({
              name: c.name,
              imageUrl: c.imageUrl,
              hasImage: !!c.imageUrl
            })))
          }
        }
      } catch (error) {
        console.error('Error loading characters:', error)
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }

    loadCharacters()
  }, [searchQuery, selectedCategory])

  const addCharacterToPerson = (character: AppCharacter) => {
    addPerson({
      name: character.name,
      height: character.height,
      gender: character.gender,
      color: character.color || getRandomColor(),
      imageUrl: character.imageUrl
    })
  }

  const getRandomColor = () => {
    const colors = ['#f0a530', '#c44144', '#20afe2', '#8b5cf6', '#ec4899', '#6b46c1']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const getCategoryIcon = (category: CategoryType) => {
    const icons = {
      celebrity: '⭐',
      anime: '🎌',
      animals: '🐾',
      objects: '🏗️',
      generic: '👤'
    }
    return icons[category] || '📊'
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className="text-lg">📚</span>
          Character Database
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="space-y-2">
          <Input
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as CategoryType)}>
          <TabsList className="grid grid-cols-3 gap-1 h-auto p-1">
            <TabsTrigger value="celebrity" className="text-xs py-2">
              {getCategoryIcon('celebrity')} Celebrity
            </TabsTrigger>
            <TabsTrigger value="generic" className="text-xs py-2">
              {getCategoryIcon('generic')} Generic
            </TabsTrigger>
            <TabsTrigger value="anime" className="text-xs py-2">
              {getCategoryIcon('anime')} Anime
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-3">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {loading ? (
                <div className="text-center text-gray-500 py-4">
                  <p className="text-sm">Loading characters...</p>
                </div>
              ) : characters.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  <p className="text-sm">No characters found</p>
                  {searchQuery && (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => setSearchQuery('')}
                      className="text-xs"
                    >
                      Clear search
                    </Button>
                  )}
                </div>
              ) : (
                characters.map((character) => (
                  <div
                    key={character.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <CharacterAvatar
                        name={character.name}
                        imageUrl={character.imageUrl}
                        gender={character.gender}
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">
                            {character.name}
                          </span>
                          {character.gender && (
                            <span className="text-xs text-gray-500">
                              {character.gender === 'male' ? '♂️' : character.gender === 'female' ? '♀️' : '⚧️'}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {character.height}cm
                          </Badge>
                          {character.subcategory && (
                            <span className="text-xs text-gray-500 truncate">
                              {character.subcategory.replace(/_/g, ' ')}
                            </span>
                          )}
                        </div>
                        {character.description && (
                          <p className="text-xs text-gray-600 truncate mt-1">
                            {character.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addCharacterToPerson(character)}
                      className="ml-2 h-8 px-2 text-xs bg-blue-600 hover:bg-blue-700"
                    >
                      Add
                    </Button>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="text-xs text-gray-500 text-center pt-2 border-t">
          Showing {characters.length} {selectedCategory} characters
        </div>
      </CardContent>
    </Card>
  )
}
