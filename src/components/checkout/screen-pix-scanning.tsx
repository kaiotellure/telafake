import type { ScreenProps } from ".";
import { IconCopy, IconQRCode } from "../Icons";
import { money } from "../utils";

export default function (props: ScreenProps) {
  const pix = props.paymentDataRef.current.pix;

  if (!pix) {
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
        <h3 className="text-2xl text-center px-12 mt-8 font-bold text-green-600">
          Pedido gerado! Agora finalize o pagamento
        </h3>
        <div className="block text-black text-left px-12 mt-8">
          1. Abra o app do seu banco e entre na opção <b>Pix</b>. <br />
          2. Escolha a opção <b>Pagar / Pix copia e cola</b>. <br />
          3. Escaneie o QR code. Se preferir, copie e cole o código. <br />
          4. Depois, confirme o pagamento.
        </div>
        <div className="text-center text-black mt-2">
          A aprovação leva no máximo 2 minutos.
        </div>
        <div className="text-center flex flex-col items-center justify-center w-full px-4 md:px-16 mt-8">
          {/* QR code image */}
          {pix.interactions.qrcode && (
            <img
              className="w-1/3"
              src={"data:image/jpeg;base64," + pix.interactions.qrcode}
            />
          )}
          {/* Copy pix code */}
          <a
            onClick={() =>
              pix.interactions.code &&
              navigator.clipboard.writeText(pix.interactions.code)
            }
            className="cursor-pointer flex relative justify-center w-full md:w-3/4 border text-white bg-gray-800 font-bold p-3 text-sm rounded text-center"
          >
            <div>
              <div className="flex justify-center items-center">
                <IconCopy />
                COPIAR CÓDIGO PIX
              </div>
            </div>
          </a>
          {/* Show qr code */}
          <a className="flex md:hidden relative text-gray-800 justify-center w-full md:w-3/4 border border-gray-800 font-bold p-3 text-sm rounded text-center mt-2">
            <div className="flex justify-center items-center">
              <IconQRCode />
              MOSTRAR O QR Code
            </div>
          </a>
          {/* Already made payment */}
          <a
            onClick={() => props.setScreen("pix_confirming")}
            className="flex cursor-pointer underline hover:no-underline relative justify-center w-full md:w-3/4 text-blue-700 font-bold p-3 text-base rounded text-center"
          >
            JÁ FIZ O PAGAMENTO
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
      </div>
    </div>
  );
}
