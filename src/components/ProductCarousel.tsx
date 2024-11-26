// ProductCarousel.tsx
'use client'
import React from 'react'
import Carousel from './Carousel'

const DATA = [
  { image: '/images/producto1.jpg' },
  { image: '/images/producto2.jpg' },
  { image: '/images/producto3.jpg' },
]

const ProductCarousel = () => {
  return (
    <section className="w-full flex items-center justify-center h-screen bg-[#CBF3F0]">
      <div className="text-center w-full max-w-4xl px-6">
        <h2 className="text-4xl font-bold mb-4">Ofertas Actuales</h2>
        <p className="text-lg text-gray-600 mb-8">
          Explora nuestras ofertas especiales en productos artesanales de comunidades locales. ¡Descubre artículos únicos y de calidad!
        </p>
        <div className="relative w-full h-64 content-center items-center">
          <Carousel data={DATA} />
        </div>
      </div>
    </section>
  )
}

export default ProductCarousel
