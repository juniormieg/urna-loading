"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import urna from "../../../public/urna.svg";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/");
    }, 5000);

    // Cleanup para evitar problemas
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <div className="bg-white w-[473px] h-[464px] border rounded-2xl shadow-lg p-12 flex items-center flex-col gap-2 justify-center">
        <Image src={urna} alt="urna" />
        <h1 className="text-primaryPurple font-bold text-[3rem]">PROEL 2025</h1>
        <h3 className="text-[1rem] text-primaryGray">
          Eleições Loading Desenvolvimento Jr
        </h3>
        <h1 className="text-primaryGray text-center py-6 text-2xl">Obrigado</h1>
      </div>
    </div>
  );
}
