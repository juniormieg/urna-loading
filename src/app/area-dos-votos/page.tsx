"use client";
import { useState } from "react";
import CardeVoto from "./cardeVoto";
import { marketing, vicePresidente, projetos } from "./constants/cargos";
import direita from "../../../public/direita.svg";
import esquerda from "../../../public/esquerda.svg";
import confirmar from "../../../public/Icon.svg";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface listaDeCardsProps {
  index: number;
  nome: string;
  img: StaticImageData;
  checagem?: boolean;
  nomeDaImagem: string;
  cargo: string;
}

export default function AreaDosVotos() {
  const [estadoAtual, setEstadoAtual] = useState(0);

  const [candidato, setCandidato] = useState<listaDeCardsProps[]>([]);

  const [contagem, setContagem] = useState([]);

  const router = useRouter();

  const passos = [
    {
      index: 0,
      passo: vicePresidente,
      cardName: "Vote para vice-presidente",
      cardDescription: "Escolha o(a) novo(a) vice-presidente para 2024",
    },
    {
      index: 1,
      passo: marketing,
      cardName: "Vote para diretor de marketing e vendas",
      cardDescription:
        "Escolha o(a) novo(a) diretor de marketing e vendas para 2024",
    },
    {
      index: 2,
      passo: projetos,
      cardName: "Vote para diretor de projetos",
      cardDescription: "Escolha o(a) novo(a) diretor de projetos para 2024",
    },
    {
      index: 3,
      passo: candidato,
      cardName: "Confira seus votos antes de confirmar",
      cardDescription: "Confira suas escolhas para o ano de 2025 da nossa EJ",
    },
  ];

  const ultimoEstado = estadoAtual === passos.length - 1;

  const proximoPasso = () => {
    if (!ultimoEstado) {
      setEstadoAtual((prev) => prev + 1);
    }
  };
  const passoAnterior = () => {
    if (estadoAtual > 0) {
      setEstadoAtual((prev) => prev - 1);
    }
  };
  const tocarSomConfirmacao = () => {
    const audio = new Audio("/urna.mp3");
    audio.play().catch((error) => console.error("Erro ao tocar áudio:", error));
  };
  console.log(candidato);

  return (
    <div className="flex items-center max-w-[1000px] mx-auto">
      <button
        className="py-4 px-6 size-[68px] rounded-full bg-primaryPurple flex justify-center items-center hover:bg-secondaryPurple"
        onClick={passoAnterior}
      >
        <Image src={esquerda} alt=""></Image>
      </button>
      <CardeVoto
        cardName={passos[estadoAtual].cardName}
        cardDescription={passos[estadoAtual].cardDescription}
        listaDeCards={passos[estadoAtual].passo}
        setCandidato={setCandidato}
        ultimoEstado={ultimoEstado}
        candidato={candidato}
      ></CardeVoto>
      {ultimoEstado ? (
        <button
          className="py-4 px-6 size-[68px] rounded-full bg-[#00C1B2] flex justify-center items-center hover:opacity-80"
          onClick={() => {
            router.replace("/tela-final");
            tocarSomConfirmacao();
          }}
        >
          {" "}
          <Image src={confirmar} alt=""></Image>
        </button>
      ) : (
        <button
          className="py-4 px-6 size-[68px] rounded-full bg-primaryPurple flex justify-center items-center hover:bg-secondaryPurple"
          onClick={proximoPasso}
        >
          <Image src={direita} alt=""></Image>
        </button>
      )}
    </div>
  );
}
