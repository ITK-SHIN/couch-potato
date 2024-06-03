import React from "react";
import bg from "/public/imgs/lotation.jpg";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <Image
        src={bg}
        alt="background Image"
        className="block mr-10 h-screen  bg-cover  bg-center object-cover"
        sizes="100vw "
      />
    </div>
  );
};

export default page;
