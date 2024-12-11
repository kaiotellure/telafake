import { useEffect, useRef, useState } from "react";
import { cn, money, prettyMinutes } from "../utils";

import Confetti from "react-confetti";
import type { ScreenProps } from ".";
import type { Payment } from "../../services/mercadopago/lib";

export default function (props: ScreenProps) {
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<HTMLSpanElement>(null);

  async function checkPaymentStatus(interval: NodeJS.Timeout) {
    const response = await fetch(
      "/api/status?id=" + props.paymentDataRef.current?.id,
    );

    const updated: { status: Payment["status"]; finished: boolean } =
      await response.json();

    if (updated.status == "approved") {
      setFinished(true);
    } else if (updated.status == "rejected") {
      setTimeout(() => location.reload(), 5000);
      clearInterval(interval);

      alert(
        "Seu pagamento foi recusado pelo banco, por-favor, tente novamente!",
      );
    }
  }

  useEffect(() => {
    var secondsRemaining = 120;

    const interval = setInterval(() => {
      secondsRemaining--;
      if (secondsRemaining <= 0 || finished) clearInterval(interval);

      if (timerRef.current)
        timerRef.current.innerText = prettyMinutes(secondsRemaining);

      secondsRemaining % 5 == 0 && checkPaymentStatus(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-8 w-[672px] font-opensans">
      {finished && <Confetti />}
      {/* The product headline infos */}
      <div className="flex items-center gap-4 px-4">
        <img
          className="max-w-[128px] max-h-[128px] rounded"
          src={props.product.image}
        />
        <span className="text-2xl font-bold">{props.product.name}</span>
      </div>
      {/* The pix infos */}
      <div className="flex flex-col gap-2 bg-white rounded p-4 border border-zinc-300 shadow">
        <div className="flex justify-center">
          <img className="w-32" src="/pix-bc-logo.webp" />
        </div>
        <h3
          className={cn(
            "text-2xl text-center px-12 mt-8 font-bold",
            finished ? "text-green-500" : "text-orange-500",
          )}
        >
          {finished ? "Pagamento Autorizado!" : "Pagamento em análise!"}
        </h3>

        {finished ? (
          <>
            <div className="p-4">
              <div className="leading-tight space-y-4 rounded border p-4 py-6 text-lg">
                <p className="font-bold">
                  Seu pagamento foi confirmado pelo banco. O acesso ao produto
                  deverá chegar no email cadastrado nos próximos 5 minutos.
                </p>{" "}
                <p>
                  Por-favor verifique a caixa de spam do seu email antes de
                  entrar em contato com a equipe de suporte ao cliente.
                </p>
              </div>
            </div>
            <div>
              <div className="text-center text-lg text-gray-700">
                ID: {props.paymentDataRef.current?.id}
              </div>{" "}
              <a
                href="mailto:suporte@kiwify.com.br"
                className="flex hover:no-underline relative justify-center w-full text-blue-700 underline font-bold p-3 text-base rounded text-center"
              >
                FALE COM O SUPORTE
              </a>
            </div>
            <div className="px-4">
              <div className="flex text-xl font-bold border-t flex-row p-4 mt-4">
                <div className="flex-1">TOTAL</div>{" "}
                <div className="flex-1 text-right">
                  {money(props.product.price)}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-200 p-4">
              <div className="text-lg text-center">
                Tempo restante para aprovação:
              </div>{" "}
              <div className="flex justify-center items-center">
                <div className="border p-2 w-full text-xl text-center shadow-inner font-bold rounded-lg bg-white">
                  <span ref={timerRef}>00:00</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="rounded border p-4 py-6 text-lg">
                <p className="font-bold">
                  Estamos aguardando a confirmação do pagamento pelo banco. Isso
                  pode levar 1-2 minutos.
                </p>{" "}
                <p>
                  Quando o pagamento for identificado, essa tela atualizará
                  automaticamente, e você também vai receber um email.
                </p>
              </div>
            </div>
            {props.paymentDataRef.current?.kind == "pix" && (
              <div>
                <div className="text-center text-lg text-gray-700">
                  Ainda não fez o pagamento?
                </div>{" "}
                <a
                  onClick={() => props.setScreen("pix_scanning")}
                  className="cursor-pointer flex hover:no-underline relative justify-center w-full text-blue-700 underline font-bold p-3 text-base rounded text-center"
                >
                  PAGUE AGORA COM PIX
                </a>
              </div>
            )}
            <div className="px-4">
              <div className="flex text-xl font-bold border-t flex-row p-4 mt-4">
                <div className="flex-1">TOTAL</div>{" "}
                <div className="flex-1 text-right">
                  {money(props.product.price)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
