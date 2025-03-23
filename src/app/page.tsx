"use client";
import Image from "next/image";
import { poppins } from "./fonts/fonts";
import urna from "../../public/urna.svg";
import setaDireita from "../../public/setaDireita.svg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className={poppins.className}>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="bg-white w-[473px] h-[464px] border rounded-2xl shadow-lg p-12">
          <div className="flex items-center flex-col gap-2 ">
            <Image src={urna} alt="urna" />
            <h1 className="text-primaryPurple font-bold text-[3rem]">
              PROEL 2025
            </h1>
            <h3 className="text-[1rem] text-primaryGray">
              Eleições Loading Desenvolvimento Jr
            </h3>
          </div>
          <h1 className="text-primaryGray font-extrabold text-center py-6">
            Faça seu voto fazer a diferença
          </h1>
          <div className="flex justify-center">
            <button
              className="bg-primaryPurple px-6 py-4 rounded-full text-white flex items-center gap-2 hover:bg-secondaryPurple"
              onClick={() => router.replace("/area-dos-votos")}
            >
              <span>iniciar</span>
              <Image src={setaDireita} alt="setinha"></Image>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
