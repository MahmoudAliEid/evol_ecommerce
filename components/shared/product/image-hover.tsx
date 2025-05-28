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
      onMouseLeave={handleMouseLeave}>
      <motion.div
        initial={{ filter: "blur(16px)", scale: 1.05 }}
        animate={{
          filter: isLoaded ? "blur(0px)" : "blur(16px)",
          scale: isLoaded ? 1 : 1.05,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-full absolute bottom-0 right-0 top-0 left-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="80vw"
          onLoad={() => setIsLoaded(true)}
          className={`object-contain transition-opacity duration-500 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src={hoverSrc}
          alt={alt}
          fill
          sizes="80vw"
          className={`absolute inset-0 object-contain transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>
    </div>
  );
}

export default ImageHover
