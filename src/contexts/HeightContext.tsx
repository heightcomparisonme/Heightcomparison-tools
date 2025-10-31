'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export interface Person {
  id: string
  name: string
  height: number // in cm
  gender: 'male' | 'female' | 'other'
  color: string
  imageUrl?: string
}

export interface HeightContextType {
  people: Person[]
  addPerson: (person: Omit<Person, 'id'>) => void
  removePerson: (id: string) => void
  clearAll: () => void
  updatePerson: (id: string, updates: Partial<Person>) => void
  unit: 'cm' | 'ft' | 'auto'
  setUnit: (unit: 'cm' | 'ft' | 'auto') => void
  displayUnit: 'cm' | 'ft' | 'm' | 'km'
  scaleRange: { min: number; max: number }
  autoScale: boolean
  setAutoScale: (enabled: boolean) => void
}

const HeightContext = createContext<HeightContextType | undefined>(undefined)

export function HeightProvider({ children }: { children: React.ReactNode }) {
  const [people, setPeople] = useState<Person[]>([])
  const [unit, setUnit] = useState<'cm' | 'ft' | 'auto'>('auto')
  const [autoScale, setAutoScale] = useState<boolean>(true)

  const addPerson = useCallback((person: Omit<Person, 'id'>) => {
    const newPerson: Person = {
      ...person,
      id: `person-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
    setPeople(prev => [...prev, newPerson])
  }, [])

  const removePerson = useCallback((id: string) => {
    setPeople(prev => prev.filter(p => p.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setPeople([])
  }, [])

  const updatePerson = useCallback((id: string, updates: Partial<Person>) => {
    setPeople(prev => prev.map(p =>
      p.id === id ? { ...p, ...updates } : p
    ))
  }, [])

  // Calculate optimal display unit and scale range based on current people
  const calculateOptimalSettings = useCallback(() => {
    if (people.length === 0) {
      return {
        displayUnit: 'cm' as const,
        scaleRange: { min: -20, max: 260 }
      }
    }

    const heights = people.map(p => p.height)
    const maxHeight = Math.max(...heights)
    const minHeight = Math.min(...heights)
    const heightRange = maxHeight - minHeight

    let displayUnit: 'cm' | 'ft' | 'm' | 'km'
    let scaleRange: { min: number; max: number }

    if (unit === 'auto') {
      // Auto-determine best unit based on height range
      if (maxHeight > 10000) { // > 100m, use km
        displayUnit = 'km'
        scaleRange = {
          min: Math.max(0, Math.floor((minHeight - heightRange * 0.1) / 1000) * 1000),
          max: Math.ceil((maxHeight + heightRange * 0.1) / 1000) * 1000
        }
      } else if (maxHeight > 1000) { // > 10m, use meters
        displayUnit = 'm'
        scaleRange = {
          min: Math.max(0, Math.floor((minHeight - heightRange * 0.1) / 100) * 100),
          max: Math.ceil((maxHeight + heightRange * 0.1) / 100) * 100
        }
      } else if (maxHeight > 300 || heightRange < 50) { // Normal human range or small range
        displayUnit = 'cm'
        scaleRange = {
          min: Math.max(-20, minHeight - Math.max(20, heightRange * 0.1)),
          max: Math.min(1000, maxHeight + Math.max(20, heightRange * 0.1))
        }
      } else {
        displayUnit = 'ft'
        const maxFt = maxHeight / 30.48
        const minFt = minHeight / 30.48
        const rangeFt = maxFt - minFt
        scaleRange = {
          min: Math.max(-1, (minFt - rangeFt * 0.1)) * 30.48,
          max: (maxFt + rangeFt * 0.1) * 30.48
        }
      }
    } else {
      // Manual unit selection
      displayUnit = unit === 'ft' ? 'ft' : 'cm'
      if (unit === 'ft') {
        const maxFt = maxHeight / 30.48
        const minFt = minHeight / 30.48
        const rangeFt = maxFt - minFt
        scaleRange = {
          min: Math.max(-1, (minFt - Math.max(1, rangeFt * 0.1))) * 30.48,
          max: (maxFt + Math.max(1, rangeFt * 0.1)) * 30.48
        }
      } else {
        scaleRange = {
          min: Math.max(-20, minHeight - Math.max(20, heightRange * 0.1)),
          max: Math.min(2000, maxHeight + Math.max(20, heightRange * 0.1))
        }
      }
    }

    return { displayUnit, scaleRange }
  }, [people, unit])

  const { displayUnit, scaleRange } = calculateOptimalSettings()

  const value: HeightContextType = {
    people,
    addPerson,
    removePerson,
    clearAll,
    updatePerson,
    unit,
    setUnit,
    displayUnit,
    scaleRange,
    autoScale,
    setAutoScale
  }

  return (
    <HeightContext.Provider value={value}>
      {children}
    </HeightContext.Provider>
  )
}

export function useHeight() {
  const context = useContext(HeightContext)
  if (context === undefined) {
    throw new Error('useHeight must be used within a HeightProvider')
  }
  return context
}
