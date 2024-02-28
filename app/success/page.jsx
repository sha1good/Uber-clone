"use client";

// import { useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ConfettiExplosion from "react-confetti-explosion";
const Success = () => {
  // const searchParams = useSearchParams()
  // const payment_intent = searchParams.get("payment_intent")
  const router = useRouter();
  const bigExplodedProps = {
    force: 0.6,
    duration: 5000,
    particleCount: 500,
    floorHeight: 1600,
    floorWidth: 1600,
  };
  return (
    <div
      className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex flex-col
      justify-center items-center
          text-green-700"
    >
      <h2 className="font-bold text-black m-5">Payment Confirmed</h2>
      <Image
        src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        width={500}
        height={400}
        className="mb-5"
      />

      <p className="font-bold text-black m-5">Uber booked Successfully</p>

      <button
        onClick={() => router.push("/")}
        className="bg-black text-white rounded-lg p-2"
      >
        Go Home
      </button>
      <ConfettiExplosion {...bigExplodedProps} className="absolute m-auto" />
    </div>
  );
};

export default Success;
