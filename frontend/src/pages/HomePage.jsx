import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const HomePage = () => {
  return (
    <div className=" ">
      <Navbar />
      <div className=" flex flex-row  gap-1 ">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default HomePage;
