import React from 'react'

export default function ImageOverlay({images, overlay}) {

  return (
    <div className={`fixed inset-0 w-full h-full header-style z-[10000] top-[100%] ${overlay ? "top-[0%]" : "top-[100%]"} transition-all`}>
      
    </div>
  )
}
