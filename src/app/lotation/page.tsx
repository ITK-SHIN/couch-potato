import React from "react";
// import bg from "../../../../public/imgs/lotation.jpg";
import Image from "next/image";

const page = () => {
  return (
    <div className="relative">
      <Image
        src="/imgs/lotation.jpg"
        alt="background Image"
        className="block mr-10 h-screen  bg-cover  bg-center object-cover"
        fill
        sizes="100vw"
        style={{objectFit: 'cover'}}
      />
    </div>
  );
};

export default page;
