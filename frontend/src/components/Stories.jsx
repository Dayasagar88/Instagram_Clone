import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "./ui/carousel";

const Stories = () => {
  return (
    <Carousel className="w-full">
        <CarouselContent className="px-3">
          {Array.from({ length: 20 }).map((_, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/7">
              <div className="p-1">
                <card>
                  <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 items-center justify-center flex w-14 h-14 rounded-full p-[3px]">
                    <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  </div>
                </card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>
  )
}

export default Stories