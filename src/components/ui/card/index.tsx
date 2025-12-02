import React from 'react'

export const Card = ({ image, title, description, price }: { image: string, title: string, description: string, price: number }) => {
  return (
    <div className="bg-base rounded-xl shadow-md p-4 w-64 h-80 flex flex-col transition-transform hover:scale-105 hover:shadow-lg">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-36 object-cover rounded-lg mb-3"
        loading="lazy"
      />
      <h3 className="text-md font-semibold mb-1 truncate w-full text-center text-base-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mb-2 line-clamp-2 text-center">{description}</p>
      <div className="mt-auto flex justify-center">
        <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
      </div>
    </div>
  )
}
