import { useState } from 'react'

interface CharacterAvatarProps {
  name: string
  imageUrl?: string
  gender: 'male' | 'female' | 'other'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Celebrity photos from reliable sources
const CELEBRITY_PHOTOS: Record<string, string> = {
  'Ariana Grande': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=face',
  'Taylor Swift': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
  'Benedict Cumberbatch': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'Blake Lively': 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=100&h=100&fit=crop&crop=face',
  'Brad Pitt': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'Jennifer Lawrence': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'Leonardo DiCaprio': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  'Scarlett Johansson': 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100&h=100&fit=crop&crop=face',
  'Dwayne Johnson': 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
  'Gal Gadot': 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face',
  'Johnny Depp': 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
  'Tom Cruise': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
  'Kevin Hart': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
  'Lady Gaga': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face',
  'Zendaya': 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face'
}

export function CharacterAvatar({
  name,
  imageUrl,
  gender,
  size = 'md',
  className = ''
}: CharacterAvatarProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500',
      'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-yellow-500'
    ]
    const index = name.length % colors.length
    return colors[index]
  }

  const getGenderIcon = () => {
    if (gender === 'male') return '👨'
    if (gender === 'female') return '👩'
    return '🧑'
  }

  // Determine the best image URL to use
  const getBestImageUrl = () => {
    // First priority: Celebrity photo mapping
    if (CELEBRITY_PHOTOS[name]) {
      return CELEBRITY_PHOTOS[name]
    }
    // Second priority: provided imageUrl
    if (imageUrl) {
      return imageUrl
    }
    return null
  }

  const finalImageUrl = getBestImageUrl()

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative ${className}`}>
      {finalImageUrl && !imageError ? (
        <>
          <img
            src={finalImageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onLoad={() => {
              console.log(`Successfully loaded image for ${name}: ${finalImageUrl}`)
              setImageLoading(false)
            }}
            onError={() => {
              console.log(`Failed to load image for ${name}: ${finalImageUrl}`)
              setImageError(true)
              setImageLoading(false)
            }}
          />
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-xs text-gray-500">⏳</div>
            </div>
          )}
        </>
      ) : (
        <div className={`w-full h-full flex items-center justify-center text-white font-medium text-xs ${getAvatarColor(name)}`}>
          {imageError && finalImageUrl ? (
            <span className="text-lg">{getGenderIcon()}</span>
          ) : (
            getInitials(name)
          )}
        </div>
      )}
    </div>
  )
}
