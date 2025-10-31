import { supabase, DbCharacter, DbCategory } from './supabase'

// Convert database character to app character format
export interface AppCharacter {
  id: string
  name: string
  height: number // in cm (converted from meters)
  category: string
  subcategory?: string
  gender: 'male' | 'female' | 'other'
  imageUrl: string
  thumbnailUrl?: string
  color?: string
  colorCustomizable?: boolean
  description?: string
  source?: string
}

export interface AppCategory {
  id: number
  name: string
  path: string
  parentId?: number
  characters?: AppCharacter[]
}

// Convert meters to centimeters
function metersToUm(meters: number): number {
  return Math.round(meters * 100)
}

// Convert database character to app character
function dbCharacterToAppCharacter(dbChar: DbCharacter, categories: DbCategory[]): AppCharacter {
  // Find primary category
  const primaryCategoryId = dbChar.cat_ids[0]
  const primaryCategory = categories.find(cat => cat.id === primaryCategoryId)

  // Find subcategory if exists
  let subcategory: string | undefined
  if (dbChar.cat_ids.length > 1) {
    const subCategoryId = dbChar.cat_ids[1]
    const subCategory = categories.find(cat => cat.id === subCategoryId)
    subcategory = subCategory?.name
  }

  return {
    id: dbChar.id,
    name: dbChar.name,
    height: metersToUm(dbChar.height),
    category: primaryCategory?.name || 'Unknown',
    subcategory,
    gender: (dbChar.gender?.toLowerCase() as 'male' | 'female' | 'other') || 'other',
    imageUrl: dbChar.media_url || '',
    thumbnailUrl: dbChar.thumbnail_url || undefined,
    color: dbChar.color || undefined,
    colorCustomizable: dbChar.color_customizable,
    description: dbChar.description || undefined,
    source: dbChar.source || undefined
  }
}

// Fetch all categories
export async function fetchCategories(): Promise<AppCategory[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id')

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return data.map(cat => ({
      id: cat.id,
      name: cat.name,
      path: cat.path,
      parentId: cat.pid || undefined
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Fetch all characters
export async function fetchAllCharacters(): Promise<AppCharacter[]> {
  try {
    const [charactersResponse, categoriesResponse] = await Promise.all([
      supabase
        .from('characters')
        .select('*')
        .order('name'),
      supabase
        .from('categories')
        .select('*')
    ])

    if (charactersResponse.error) {
      console.error('Error fetching characters:', charactersResponse.error)
      return []
    }

    if (categoriesResponse.error) {
      console.error('Error fetching categories:', categoriesResponse.error)
      return []
    }

    const categories = categoriesResponse.data || []
    return charactersResponse.data.map(char =>
      dbCharacterToAppCharacter(char, categories)
    )
  } catch (error) {
    console.error('Error fetching characters:', error)
    return []
  }
}

// Fetch characters by category
export async function fetchCharactersByCategory(categoryId: number): Promise<AppCharacter[]> {
  try {
    const [charactersResponse, categoriesResponse] = await Promise.all([
      supabase
        .from('characters')
        .select('*')
        .contains('cat_ids', [categoryId])
        .order('name'),
      supabase
        .from('categories')
        .select('*')
    ])

    if (charactersResponse.error) {
      console.error('Error fetching characters by category:', charactersResponse.error)
      return []
    }

    if (categoriesResponse.error) {
      console.error('Error fetching categories:', categoriesResponse.error)
      return []
    }

    const categories = categoriesResponse.data || []
    return charactersResponse.data.map(char =>
      dbCharacterToAppCharacter(char, categories)
    )
  } catch (error) {
    console.error('Error fetching characters by category:', error)
    return []
  }
}

// Fetch celebrity characters (category ID 2)
export async function fetchCelebrities(): Promise<AppCharacter[]> {
  return fetchCharactersByCategory(2)
}

// Fetch generic human characters (category ID 1)
export async function fetchGenericHumans(): Promise<AppCharacter[]> {
  return fetchCharactersByCategory(1)
}

// Search characters by name
export async function searchCharacters(query: string): Promise<AppCharacter[]> {
  try {
    const [charactersResponse, categoriesResponse] = await Promise.all([
      supabase
        .from('characters')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('name')
        .limit(20),
      supabase
        .from('categories')
        .select('*')
    ])

    if (charactersResponse.error) {
      console.error('Error searching characters:', charactersResponse.error)
      return []
    }

    if (categoriesResponse.error) {
      console.error('Error fetching categories:', categoriesResponse.error)
      return []
    }

    const categories = categoriesResponse.data || []
    return charactersResponse.data.map(char =>
      dbCharacterToAppCharacter(char, categories)
    )
  } catch (error) {
    console.error('Error searching characters:', error)
    return []
  }
}

// Get random characters
export async function getRandomCharacters(limit: number = 10): Promise<AppCharacter[]> {
  try {
    const [charactersResponse, categoriesResponse] = await Promise.all([
      supabase
        .from('characters')
        .select('*')
        .limit(limit),
      supabase
        .from('categories')
        .select('*')
    ])

    if (charactersResponse.error) {
      console.error('Error fetching random characters:', charactersResponse.error)
      return []
    }

    if (categoriesResponse.error) {
      console.error('Error fetching categories:', categoriesResponse.error)
      return []
    }

    const categories = categoriesResponse.data || []
    const characters = charactersResponse.data.map(char =>
      dbCharacterToAppCharacter(char, categories)
    )

    // Shuffle the results
    return characters.sort(() => Math.random() - 0.5)
  } catch (error) {
    console.error('Error fetching random characters:', error)
    return []
  }
}

// Get character statistics
export async function getCharacterStats() {
  try {
    const { data, error } = await supabase
      .from('characters')
      .select('height, gender, cat_ids')

    if (error) {
      console.error('Error fetching character stats:', error)
      return null
    }

    const stats = {
      total: data.length,
      heightRange: {
        min: Math.min(...data.map(c => metersToUm(c.height))),
        max: Math.max(...data.map(c => metersToUm(c.height))),
        average: Math.round(data.reduce((sum, c) => sum + metersToUm(c.height), 0) / data.length)
      },
      byGender: data.reduce((acc, char) => {
        const gender = char.gender || 'unknown'
        acc[gender] = (acc[gender] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      byCategory: data.reduce((acc, char) => {
        const primaryCat = char.cat_ids[0]
        acc[primaryCat] = (acc[primaryCat] || 0) + 1
        return acc
      }, {} as Record<number, number>)
    }

    return stats
  } catch (error) {
    console.error('Error fetching character stats:', error)
    return null
  }
}
