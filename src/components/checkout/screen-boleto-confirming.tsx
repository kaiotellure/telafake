import { money } from "../utils";

import type { ScreenProps } from ".";

export default function (props: ScreenProps) {
  const boleto = props.paymentDataRef.current.boleto;

  if (!boleto) {
    props.setScreen("payment");
    return <></>;
  }

  return (
    <div className="flex flex-col gap-8 w-[672px] font-opensans">
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
        <h3 className="text-2xl text-center px-12 mt-8 font-bold text-orange-500">
          Aguardando Pagamento!
        </h3>

        <>
          <div className="bg-gray-200 p-4">
            <div className="text-lg text-center">Linha digitável:</div>{" "}
            <div className="flex justify-center items-center">
              <div className="border p-2 w-full text-xl text-center shadow-inner font-bold rounded-lg bg-white">
                <span>{boleto.details.digitable}</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-col rounded border p-4 py-4 gap-2 text-lg">
              <p className="leading-tight font-bold">
                Estamos aguardando a confirmação do pagamento pelo banco. Isso
                pode levar 1-2 horas.
              </p>{" "}
              <p className="leading-tight text-sm">
                Em finais de semana, o pagamento talvez poderá ser processado
                apenas no próximo dia útil (Segunda-Feira). Quando o pagamento
                for identificado, você vai receber um email.
              </p>
            </div>
          </div>

          <div>
            <div className="text-center text-lg text-gray-700">
              Deseja imprimir o documento?
            </div>{" "}
            <a
              target="_blank"
              href={boleto.details.pdf_url}
              className="cursor-pointer flex hover:no-underline relative justify-center w-full text-blue-700 underline font-bold p-3 text-base rounded text-center"
            >
              BOLETO EM PDF (DOCUMENTO)
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
      </div>
    </div>
  );
}
