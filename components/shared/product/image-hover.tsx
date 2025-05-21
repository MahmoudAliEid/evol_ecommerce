import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const ImageHover = ({
    src,hoverSrc,alt
}: {
    src: string
    hoverSrc: string
    alt: string
    }) =>
{
    
    const [isHovered, setIsHovered] = React.useState(false)
    const [isLoaded, setIsLoaded] = React.useState(false)


    const handleMouseEnter = () => {
        setTimeout(() =>
        {
            setIsHovered(true)
        }, 1000) // 1 second delay
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

  return (
      <div
            className="relative w-full h-52"
            onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
      >
          <motion.div
                initial={{ filter: 'blur(16px)', scale: 1.05 }}
                animate={{ filter: isLoaded ? 'blur(0px)' : 'blur(16px)', scale: isLoaded ? 1 : 1.05 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full h-full absolute top-0 left-0"
            >
          <Image
              src={src}
              sizes='80vw'
              fill
              alt={alt}
                className={`object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                onLoadingComplete={() => setIsLoaded(true)}
              />
              {
                isHovered && (
                    <Image
                        src={hoverSrc}
                        sizes='80vw'
                        fill
                        alt={alt}
                        className={`object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        onLoadingComplete={() => setIsLoaded(true)}
                    />
                )
              }
          </motion.div>
          </div>
  )
}

export default ImageHover
