'use client'

import Image, { ImageProps } from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'

type NextImageProps = {
  useSkeleton?: boolean
  imgClassName?: string
  serverStaticImg?: boolean
  blurClassName?: string
  alt: string
} & (
  | { width: number; height: number; fill?: false }
  | { fill: true; width?: undefined; height?: undefined }
) &
  Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
    src: string
  }

export default function NextImage({
  useSkeleton = false,
  serverStaticImg = false,
  src,
  width,
  height,
  fill,
  alt,
  className,
  imgClassName,
  blurClassName,
  ...rest
}: NextImageProps) {
  const [isLoading, setIsLoading] = React.useState(useSkeleton)

  const finalSrc = serverStaticImg ? src : src

  return (
    <figure
      className={cn('relative', className)}
      style={!className?.includes('w-') && width ? { width } : undefined}
    >
      <Image
        src={finalSrc}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        sizes={fill ? '100vw' : undefined}
        className={cn(
          imgClassName,
          isLoading && useSkeleton && 'animate-pulse',
          isLoading && useSkeleton && blurClassName,
        )}
        onLoadingComplete={() => setIsLoading(false)}
        loading='lazy'
        placeholder='blur'
        blurDataURL='/placeholder.png'
        {...rest}
      />
    </figure>
  )
}
