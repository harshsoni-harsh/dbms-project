import Image from "next/image";
import car from "@/public/images/car-broken.jpg";
import Link from "next/link";

export default function Home() {
  const about = "Welcome to ########, where we specialize in providing peace of mind through our comprehensive insurance coverage. With years of experience and a commitment to customer satisfaction, we're here to safeguard what matters most to you";
  const heading = "Insure Your Journey: Navigate Life's Roads Safely with Our Vehicle Insurance!"
  return (
    <div className="flex items-center justify-start text-center w-full h-full overflow-hidden">
      <div className="flex flex-col items-center justify-between w-1/2 gap-2 h-1/2 rounded-md p-2">
        <span
          className="text-3xl font-extrabold justify-self-start mb-4"
        >
          {heading}
        </span>
        <p className="text-xl text-justify">
          {about}
        </p>
        <Link
          href={'./about'}
          className="w-fit p-2 min-h-10 flex items-center justify-center font-medium text-center rounded-md text-background bg-foreground"
        >
          About Us
        </Link>
      </div>

      <div className="absolute -z-10">
        <Image src={car} alt={"Car Image"} />
      </div>
    </div >
  );
}
