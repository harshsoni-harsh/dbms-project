import Image from "next/image";
import car from "@/public/images/car.png";
import Link from "next/link";

export default function Home() {
  const about = "Welcome to Motor Insurance, where we specialize in providing peace of mind through our comprehensive insurance coverage. With years of experience and a commitment to customer satisfaction, we're here to safeguard what matters most to you";
  const heading = "Insure Your Journey: Navigate Life's Roads Safely with Our Vehicle Insurance!"
  return (
    <div className="flex max-md:flex-col items-center justify-center text-justify w-full h-full p-8">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 gap-8 rounded-md max-md:order-2">
        <span
          className="text-3xl font-extrabold justify-self-start mb-4 opacity-80 text-left"
        >
          {heading}
        </span>
        <p className="text-xl text-left">
          {about}
        </p>
        <Link
          href={'./about'}
          className="w-fit p-2 min-h-10 flex items-center justify-center font-medium text-center rounded-md text-background bg-foreground opacity-80"
        >
          About Us
        </Link>
      </div>
      <div className="invert opacity-80 max-md:order-1 my-6 flex-shrink max-w-80">
        <Image src={car} alt="Car Image" />
      </div>
    </div >
  );
}
