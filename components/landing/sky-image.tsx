import Image from "next/image"
import { cn } from "@/lib/utils"

// Illustrated anime-style sky/field art. Using the same set for both themes
// for now — night-specific counterparts will replace this once picked.
const SKY_COUNT = 8

interface SkyImageProps {
  index: number
  alt?: string
  className?: string
  priority?: boolean
  sizes?: string
}

export function SkyImage({ index, alt = "", className, priority, sizes }: SkyImageProps) {
  const i = ((index - 1) % SKY_COUNT) + 1

  return (
    <Image
      src={`/landing/anime-${i}.jpg`}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  )
}
