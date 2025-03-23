import React, { useState } from "react";
import seta from "../../../public/Icon.svg";
import Image, { StaticImageData } from "next/image";

interface listaDeCardsProps {
  index: number;
  nome: string;
  img: StaticImageData;
  checagem?: boolean;
  nomeDaImagem: string;
  cargo: string;
}
interface Props {
  cardName: string;
  cardDescription: string;
  listaDeCards: listaDeCardsProps[];
  setCandidato: (lista: any) => void;
  ultimoEstado: boolean;
  candidato: listaDeCardsProps[];
}

export default function CardeVoto({
  cardName,
  cardDescription,
  listaDeCards,
  setCandidato,
  ultimoEstado,
  candidato,
}: Props) {
  const handleVoto = (lista: listaDeCardsProps) => {
    const jaVotado =
      Array.isArray(candidato) &&
      candidato.some((item: listaDeCardsProps) => item.index === lista.index);

    if (!jaVotado) {
      setCandidato((prev: any) => [...prev, lista]);

      atualizarLocalStorage(lista.cargo, lista.nome);
    }
  };

  const atualizarLocalStorage = (cargo: string, nome: string) => {
    const votosArmazenados = localStorage.getItem("votos");
    const votos = votosArmazenados ? JSON.parse(votosArmazenados) : [];

    const cargoIndex = votos.findIndex((item: any) => item.cargo === cargo);

    if (cargoIndex !== -1) {
      const candidatoIndex = votos[cargoIndex].candidatos.findIndex(
        (candidato: any) => candidato.name === nome
      );

      if (candidatoIndex !== -1) {
        votos[cargoIndex].candidatos[candidatoIndex].votos += 1;
      } else {
        votos[cargoIndex].candidatos.push({ name: nome, votos: 1 });
      }
    } else {
      votos.push({
        cargo,
        candidatos: [{ name: nome, votos: 1 }],
      });
    }

    localStorage.setItem("votos", JSON.stringify(votos));
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="bg-white w-[736px] h-fit border rounded-2xl shadow-lg p-12">
        <div className="grid grid-rows-2 gap-2">
          <h1 className="font-bold text-[1.5rem] text-primaryGray">
            {cardName}
          </h1>
          <h3 className="text-[1rem] text-primaryGray">{cardDescription}</h3>
        </div>
        <div className="w-[640px] h-fit gap-8 flex items-center">
          {listaDeCards.map((lista) => {
            const jaVotado =
              Array.isArray(candidato) &&
              candidato.some(
                (item: listaDeCardsProps) => item.nome === lista.nome
              );

            return (
              <div
                className="border h-full p-4 flex flex-col gap-6 rounded-2xl"
                key={lista.index}
              >
                <div className="flex flex-col gap-[10px]">
                  <Image
                    src={lista.img}
                    alt=""
                    className="size-[160px] object-cover"
                  ></Image>
                  <h2>{lista.nome}</h2>
                </div>
                {!ultimoEstado && (
                  <button
                    className={`px-6 py-4 rounded-full text-white flex items-center gap-2 mx-6 ${
                      jaVotado
                        ? "bg-[#00C1B2] cursor-not-allowed"
                        : "bg-primaryPurple hover:bg-secondaryPurple"
                    }`}
                    onClick={() => !jaVotado && handleVoto(lista)}
                    disabled={jaVotado}
                  >
                    <h1>{jaVotado ? "Votado" : "Votar"}</h1>
                    <Image src={seta} alt="setinha"></Image>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
