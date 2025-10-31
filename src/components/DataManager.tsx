'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useHeight } from '@/contexts/HeightContext'
import {
  fetchAllCharacters,
  searchCharacters,
  getCharacterStats,
  AppCharacter
} from '@/lib/supabaseService'

export function DataManager() {
  const [allCharacters, setAllCharacters] = useState<AppCharacter[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<{
    total: number
    heightRange?: { min: number; max: number; average: number }
    byCategory?: Record<number, number>
    byGender?: Record<string, number>
  } | null>(null)
  const { addPerson } = useHeight()

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [characters, characterStats] = await Promise.all([
          fetchAllCharacters(),
          getCharacterStats()
        ])
        setAllCharacters(characters)
        setStats(characterStats)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredData = searchQuery
    ? allCharacters.filter(char =>
        char.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allCharacters

  const downloadJSON = () => {
    const dataStr = JSON.stringify(allCharacters, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'characters-data.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const downloadCSV = () => {
    const headers = ['ID', 'Name', 'Height (cm)', 'Category', 'Subcategory', 'Gender', 'Description']
    const rows = allCharacters.map(char => [
      char.id,
      char.name,
      char.height.toString(),
      char.category,
      char.subcategory || '',
      char.gender || '',
      char.description || ''
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    const dataBlob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'characters-data.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className="text-lg">⚙️</span>
          Data Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-blue-50 rounded">
              <div className="text-sm font-medium text-blue-700">Total</div>
              <div className="text-lg font-bold text-blue-900">{stats.total}</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="text-sm font-medium text-green-700">Avg Height</div>
              <div className="text-lg font-bold text-green-900">{stats.heightRange?.average}cm</div>
            </div>
          </div>
        )}

        {/* Category Breakdown */}
        {stats?.byCategory && (
          <div>
            <h4 className="text-xs font-medium text-gray-600 mb-2">By Category</h4>
            <div className="flex flex-wrap gap-1">
              {Object.entries(stats.byCategory).map(([categoryId, count]) => (
                <div key={categoryId} className="flex items-center gap-1">
                  <span className="text-xs text-gray-600">Cat {categoryId}:</span>
                  <Badge variant="secondary" className="text-xs">{String(count)}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gender Breakdown */}
        {stats?.byGender && (
          <div>
            <h4 className="text-xs font-medium text-gray-600 mb-2">By Gender</h4>
            <div className="flex flex-wrap gap-1">
              {Object.entries(stats.byGender).map(([gender, count]) => (
                <div key={gender} className="flex items-center gap-1">
                  <span className="text-xs text-gray-600">{gender}:</span>
                  <Badge variant="secondary" className="text-xs">{String(count)}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="space-y-2">
          <Input
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Character List */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {loading ? (
            <div className="text-center text-gray-500 py-4">
              <p className="text-sm">Loading characters...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              <p className="text-sm">No characters found</p>
            </div>
          ) : (
            filteredData.map((character) => (
              <div
                key={character.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md text-xs hover:bg-blue-50 cursor-pointer transition-colors border-l-4 border-transparent hover:border-blue-400"
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData('application/json', JSON.stringify({
                    name: character.name,
                    height: character.height,
                    gender: character.gender,
                    imageUrl: character.imageUrl,
                    color: character.color || '#' + Math.floor(Math.random()*16777215).toString(16)
                  }));
                  e.dataTransfer.effectAllowed = 'copy';
                }}
                onClick={() => {
                  // 快速添加功能
                  addPerson({
                    name: character.name,
                    height: character.height,
                    gender: character.gender,
                    imageUrl: character.imageUrl,
                    color: character.color || '#' + Math.floor(Math.random()*16777215).toString(16)
                  });
                }}
                title={`拖拽到图表或点击添加 ${character.name} (${character.height}cm)`}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate flex items-center gap-1">
                    <span>📏</span>
                    {character.name}
                  </div>
                  <div className="text-gray-600 truncate">
                    {character.height}cm • {character.category}
                    {character.subcategory && ` • ${character.subcategory}`}
                  </div>
                </div>
                <div className="text-xs text-gray-500 ml-2 flex flex-col items-end">
                  <span>{character.gender}</span>
                  <span className="text-blue-500">+添加</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Export Controls */}
        <div className="space-y-2 pt-2 border-t">
          <Button
            onClick={downloadJSON}
            variant="outline"
            size="sm"
            className="w-full"
            disabled={allCharacters.length === 0}
          >
            Export JSON ({allCharacters.length} characters)
          </Button>
          <Button
            onClick={downloadCSV}
            variant="outline"
            size="sm"
            className="w-full"
            disabled={allCharacters.length === 0}
          >
            Export CSV
          </Button>
        </div>

        {/* Data Info */}
        <div className="text-xs text-gray-500 text-center pt-2 border-t">
          Data loaded from Supabase • {filteredData.length} visible
        </div>
      </CardContent>
    </Card>
  )
}
