import React from "react";
// import bg from "../../../../public/imgs/bg1.jpg";
import Image from "next/image";

const page = () => {
  return (
    <div className="relative">
      {" "}
      <Image
        src="/imgs/bg1.jpg"
        alt="background Image"
        className="block mr-10 h-screen object-cover"
        fill
        style={{objectFit: 'cover'}}
      />
    </div>
  );
};

export default page;
