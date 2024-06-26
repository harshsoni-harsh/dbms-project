import Image from "next/image";
import React from "react";

const Supportpage = () => {
  return (
    <div className="grid justify-center 2xl:mt-40 align-middle grid-rows-2 h-full gap-32 bg-gradient-to-br from-blue-gray-800 via-blue-gray-900 to-black bg-opacity-70">
      <div className="grid grid-cols-2 mt-[32px] h-fit gap-4  ">
        <div className="relative h-full w-full rounded-lg">
          <Image
            src="images/support.svg"
            className="h-[350px]"
            alt="support image"
            width={350}
            height={350}
          />
        </div>
        <div className="text-center text-3xl pt-16 align-text-bottom h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black bg-opacity-50 rounded-lg">
          Need Help? <br></br>
          <br></br>
          <br></br>Reach out to us 24/7
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 h-fit">
        <div className="text-center m-8 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black bg-opacity-75 rounded-lg">
          <p className="text-xl">Manager</p>
          <br></br> Email: manager@email.com<br></br>
          <br />
          Phone: 94567875445{" "}
        </div>
        <div className="text-center m-8 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black bg-opacity-75 rounded-lg">
          <p className="text-xl">Administration</p> <br></br> Email:
          dbadmin@email.com<br></br>
          <br />
          Phone: 900087575{" "}
        </div>
        <div className="text-center m-8 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black bg-opacity-75 rounded-lg ">
          <p className="text-xl">Inspector</p>
          <br></br> Email: inspector@email.com<br></br>
          <br />
          Phone: 7847864867{" "}
        </div>
      </div>
    </div>
  );
};

export default Supportpage;
