import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Heart, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { useFavorites } from '../hooks/useFavorites'
import { toast } from 'sonner'

interface ProductImage {
  url: string
  alt: string
}

interface ProductCardProps {
  id: number
  name: string
  category: string
  images: ProductImage[]
  description: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  images,
  description
}) => {
  console.log(`ProductCard ${id} rendered - ${name}`)
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const { isFavorite, toggleFavorite } = useFavorites()
  const isProductFavorite = isFavorite(id)

  // Garantir que sempre temos pelo menos uma imagem
  const productImages = images && images.length > 0 ? images : [{ url: '', alt: name }]
  const hasMultipleImages = productImages.length > 1

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
    }
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
    }
  }

  const nextModalImage = () => {
    if (hasMultipleImages) {
      setModalImageIndex((prev) => (prev + 1) % productImages.length)
    }
  }

  const prevModalImage = () => {
    if (hasMultipleImages) {
      setModalImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
    }
  }

  const handleImageSelect = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleModalImageSelect = (index: number) => {
    setModalImageIndex(index)
  }

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const favoriteItem = {
      id,
      name,
      category,
      image: productImages[0]?.url || '',
      description
    }
    
    console.log('Toggling favorite for product:', favoriteItem)
    toggleFavorite(favoriteItem)
    
    if (isProductFavorite) {
      toast.success(`${name} removido dos favoritos`)
    } else {
      toast.success(`${name} adicionado aos favoritos`)
    }
  }

  const openZoomModal = () => {
    setModalImageIndex(currentImageIndex)
    setIsDialogOpen(true)
  }

  const currentImage = productImages[currentImageIndex]
  const modalImage = productImages[modalImageIndex]

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card">
      {/* Main Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted/20">
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-pulse" />
        )}
        
        {/* Main Image */}
        {currentImage?.url && (
          <img
            src={currentImage.url}
            alt={currentImage.alt || name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        
        {/* Navigation Arrows - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Image Counter - Only show if multiple images */}
        {hasMultipleImages && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {currentImageIndex + 1}/{productImages.length}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {/* Zoom Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button 
                onClick={openZoomModal}
                className="w-8 h-8 rounded-full bg-white/90 text-gray-800 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200"
                aria-label="Ampliar imagem"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </DialogTrigger>
            
            {/* Modal */}
            <DialogContent className="max-w-4xl max-h-[95vh] p-0 bg-black/95 border-0">
              <div className="relative">
                {/* Modal Main Image */}
                <div className="relative aspect-square max-h-[75vh] overflow-hidden">
                  {modalImage?.url && (
                    <img
                      src={modalImage.url}
                      alt={modalImage.alt || name}
                      className="w-full h-full object-contain"
                    />
                  )}
                  
                  {/* Modal Navigation - Only show if multiple images */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevModalImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                        aria-label="Imagem anterior"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextModalImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                        aria-label="Próxima imagem"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Modal Thumbnails - Only show if multiple images */}
                {hasMultipleImages && (
                  <div className="p-4 border-t border-white/10">
                    <div className="flex gap-2 justify-center overflow-x-auto">
                      {productImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => handleModalImageSelect(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === modalImageIndex 
                              ? 'border-primary' 
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          {image.url && (
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Product Info */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-sm">
                      {category}
                    </Badge>
                    {hasMultipleImages && (
                      <span className="text-sm text-white/60">
                        {modalImageIndex + 1} de {productImages.length}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-white">{name}</h3>
                  <p className="text-sm text-white/80">{description}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              isProductFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-800 hover:bg-white'
            }`}
            aria-label={isProductFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart className={`h-4 w-4 ${isProductFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Thumbnail Navigation - Only show if multiple images */}
      {hasMultipleImages && (
        <div className="p-3 border-b border-border/50">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageSelect(index)}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {image.url && (
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Card Content */}
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="text-xs font-medium">
            {category}
          </Badge>
          
          <Button
            onClick={handleFavoriteToggle}
            variant="ghost"
            size="sm"
            className={`p-1 h-auto transition-all duration-200 ${
              isProductFavorite 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-muted-foreground hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isProductFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <h3 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export default ProductCard