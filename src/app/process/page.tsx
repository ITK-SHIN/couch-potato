import React from "react";
import bg from "/public/imgs/process1.jpg";
import Image from "next/image";

const page = () => {
  return (
    <div>
      {" "}
      <Image src={bg} alt="background Image" className="block mr-10" />
    </div>
  );
};

export default page;
