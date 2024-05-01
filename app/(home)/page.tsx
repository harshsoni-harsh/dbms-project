"use client"
import Image from "next/image";
import car3 from "@/public/images/car3.png"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
export default function Home() {
  const about = "Welcome to ########, where we specialize in providing peace of mind through our comprehensive insurance coverage. With years of experience and a commitment to customer satisfaction, we're here to safeguard what matters most to you";
  const heading = "Insure Your Journey: Navigate Life's Roads Safely with Our Vehicle Insurance!"
  return (
    <div className="flex items-center bg-cars bg-cover bg-center justify-center text-center w-full h-full overflow-hidden">

      <Carousel className="flex items-center backdrop-blur-md p-4 w-fit max-w-6xl h-1/2 rounded-md">
        <CarouselContent>
          <CarouselItem className="flex flex-col gap-4 w-fit items-center h-1/2 justify-evenly">
            <span
              className="text-3xl font-extrabold justify-self-start mb-4"
            >
              {heading}
            </span>
            <p className="text-xl">
              {about}
            </p>
            <Link
              href={'./about'}
              className="w-fit p-2 min-h-10 flex items-center justify-center font-medium text-center rounded-md text-background bg-foreground"
            >
              About Us
            </Link>
          </CarouselItem>
          <CarouselItem className="flex bg-transparent flex-col w-fit h-1/2 gap-4 items-center justify-center justify-self-start">
            <Link
              href={'./login'}
              className="min-w-28 min-h-10 flex items-center justify-center font-medium text-center rounded-md text-background bg-foreground"
            >
              Login
            </Link>
            <Link
              href={'./register'}
              className="min-w-28 min-h-10 flex items-center justify-center font-medium text-center rounded-md text-background bg-foreground"
            >
              Register
            </Link>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Card >

      </Card>
    </div >
  );
}
