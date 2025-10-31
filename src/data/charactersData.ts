import { supabase, DbCharacter, DbCategory } from '@/lib/supabase'

export type CharacterCategory =
  | 'celebrity'
  | 'anime'
  | 'fictional_characters'
  | 'animals'
  | 'objects'
  | 'plants'
  | 'microorganisms'
  | 'generic'

export interface Character {
  id: string
  name: string
  height: number // in cm
  category: CharacterCategory
  gender?: string
  description?: string
  source?: string
  imageUrl?: string
  thumbnailUrl?: string
}

export const CHARACTER_CATEGORIES: Record<CharacterCategory, string> = {
  celebrity: 'Celebrities',
  anime: 'Anime Characters',
  fictional_characters: 'Fictional Characters',
  animals: 'Animals',
  objects: 'Objects',
  plants: 'Plants',
  microorganisms: 'Microorganisms',
  generic: 'Generic'
}

// Cache for characters
let characterCache: Character[] = []
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Convert DB character to Character interface
function dbCharacterToCharacter(dbChar: DbCharacter): Character {
  return {
    id: dbChar.id,
    name: dbChar.name,
    height: dbChar.height * 100, // Convert meters to cm
    category: getCategoryFromIds(dbChar.cat_ids),
    gender: dbChar.gender || undefined,
    description: dbChar.description || undefined,
    source: dbChar.source || undefined,
    imageUrl: dbChar.media_url || undefined,
    thumbnailUrl: dbChar.thumbnail_url || undefined
  }
}

// Map category IDs to category names (you may need to adjust these based on your database)
function getCategoryFromIds(catIds: number[]): CharacterCategory {
  if (catIds.includes(2)) return 'celebrity'
  if (catIds.includes(3)) return 'anime'
  if (catIds.includes(4)) return 'fictional_characters'
  if (catIds.includes(5)) return 'animals'
  if (catIds.includes(6)) return 'objects'
  if (catIds.includes(7)) return 'plants'
  if (catIds.includes(8)) return 'microorganisms'
  return 'generic'
}

// Fetch all characters from Supabase
export async function fetchAllCharacters(): Promise<Character[]> {
  const now = Date.now()

  // Return cached data if it's still fresh
  if (characterCache.length > 0 && (now - cacheTimestamp) < CACHE_DURATION) {
    return characterCache
  }

  try {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching characters:', error)
      return []
    }

    const characters = (data || []).map(dbCharacterToCharacter)

    // Update cache
    characterCache = characters
    cacheTimestamp = now

    return characters
  } catch (error) {
    console.error('Error fetching characters:', error)
    return []
  }
}

// Search characters by name
export async function searchCharacters(query: string, category?: CharacterCategory): Promise<Character[]> {
  const allCharacters = await fetchAllCharacters()

  const filtered = allCharacters.filter(char => {
    const matchesQuery = char.name.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = !category || char.category === category
    return matchesQuery && matchesCategory
  })

  return filtered
}

// Get characters by category
export async function getCharactersByCategory(category: CharacterCategory): Promise<Character[]> {
  const allCharacters = await fetchAllCharacters()
  return allCharacters.filter(char => char.category === category)
}

// Get random characters
export async function getRandomCharacters(count: number = 10): Promise<Character[]> {
  const allCharacters = await fetchAllCharacters()
  const shuffled = [...allCharacters].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Get character by ID
export async function getCharacterById(id: string): Promise<Character | null> {
  const allCharacters = await fetchAllCharacters()
  return allCharacters.find(char => char.id === id) || null
}
