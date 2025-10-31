'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useHeight } from '@/contexts/HeightContext'
import { PersonForm } from './PersonForm'
import { ColorPicker } from './ColorPicker'
import { SampleData } from './SampleData'
import { CharacterDatabase } from './CharacterDatabase'
import { DataManager } from './DataManager'

export function ControlPanel() {
  const { people, clearAll, removePerson } = useHeight()

  return (
    <div className="space-y-4">
      {/* Sidebar Navigation */}
      <div className="flex flex-col space-y-2">
        <Button variant="ghost" className="justify-start h-12 text-left">
          <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <span>Add Person</span>
        </Button>

        <div className="text-xs font-medium text-gray-600 px-3 py-1">
          Browse Database
        </div>

        <Button variant="ghost" className="justify-start h-12 text-left">
          <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
            </svg>
          </div>
          <span>Entities</span>
        </Button>

        <Button variant="ghost" className="justify-start h-12 text-left">
          <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <span>Add Image</span>
        </Button>
      </div>

      {/* Data Manager */}
      <DataManager />

      {/* Character Database */}
      <CharacterDatabase />

      {/* Sample Data */}
      <SampleData />

      {/* Person Input Form */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-700">Enter Your Details:</CardTitle>
        </CardHeader>
        <CardContent>
          <PersonForm />
        </CardContent>
      </Card>

      {/* People List */}
      {people.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">
                People ({people.length})
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {people.map((person) => (
              <div key={person.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: person.color }}
                  />
                  <span className="text-sm font-medium">{person.name || 'Unnamed'}</span>
                  <Badge variant="secondary" className="text-xs">
                    {person.height}cm
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePerson(person.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  ×
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
