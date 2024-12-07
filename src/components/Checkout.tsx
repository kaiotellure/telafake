import { useEffect, useRef, useState } from "react";
import Input, { FORMATTERS } from "../components/Input";
import Tab from "../components/Tab";

import {
  BadgeCorrect,
  IconBoleto,
  IconCard,
  IconCopy,
  IconDoubt,
  IconPix,
  IconQRCode,
  IconSecurity,
} from "./Icons";

import type { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import type { CreatePixConfig, Paydata } from "../services/mercadopago";

interface CardViewProps {
  receive: (field: string, value: string) => void;
}

function CardView({ receive }: CardViewProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <div className="p-4 space-y-2 border rounded bg-zinc-50">
        <Input
          report={receive}
          id="cc_number"
          name="Número de Cartão de Crédito"
          max={19}
          formatter="cc"
        >
          <IconSecurity className="absolute right-3 top-[50%] transform -translate-y-1/2" />
        </Input>
        <div className="flex gap-2">
          <select
            defaultValue="mes"
            className="w-5/12 px-4 py-2 rounded border bg-white text-zinc-500"
          >
            <option value="mes" disabled>
              Mês
            </option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            defaultValue="ano"
            className="w-7/12 px-4 py-2 rounded border bg-white text-zinc-500"
          >
            <option value="ano" disabled>
              Ano
            </option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={currentYear + i}>
                {currentYear + i}
              </option>
            ))}
          </select>

          <Input
            report={receive}
            id="cc_cvv"
            name="Cód. segurança"
            formatter="cvv"
            max={4}
          >
            <IconDoubt className="absolute right-3 top-[50%] transform -translate-y-1/2" />
          </Input>
        </div>

        <select
          defaultValue={12}
          className="w-full px-4 py-2 rounded border bg-white text-zinc-700"
        >
          {Array.from({ length: 12 }, (_, i) => {
            const times = 12 - i;

            if (times == 1) {
              return (
                <option key={times} value={times}>
                  R$ {(97).toFixed(2).replace(".", ",")}
                </option>
              );
            }

            return (
              <option key={times} value={times}>
                {times}x de R${" "}
                {price(97, 2.9956 / 100, times)
                  .toFixed(2)
                  .replace(".", ",")}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mt-2 p-2 flex flex-col gap-4">
        <div className="flex gap-2 items-center mx-[2.5px]">
          <input checked readOnly type="checkbox" />
          <span className="text-sm">Salvar dados para as próximas compras</span>
        </div>
        <div className="flex gap-2 items-center text-gray-500">
          <IconSecurity />
          <span className="text-xs">
            Nós protegemos seus dados de pagamento usando encriptação para
            prover segurança no nível de bancos.
          </span>
        </div>
      </div>
    </div>
  );
}

function price(total: number, tax: number, slices: number) {
  return (total * tax) / (1 - (1 + tax) ** -slices);
}

function BoletoView() {
  return (
    <div className="p-4 bg-zinc-50 rounded border">
      <div className="p-4 bg-zinc-100 border rounded">
        <b>Informações sobre o pagamento via boleto:</b>
        <ul className="list-disc list-inside my-4">
          <li className="leading-relaxed">
            Valor à vista: <b>R$ 97,00</b>.
          </li>
          <li className="leading-relaxed">Não podemos parcelar Boleto.</li>
          <li className="leading-relaxed">
            Pode levar até 2 dias úteis para compensar.
          </li>
        </ul>
      </div>
    </div>
  );
}

function PixView() {
  return (
    <div className="p-4 bg-zinc-50 rounded border">
      <div className="p-4 bg-zinc-100 rounded">
        <b>Informações sobre o pagamento via pix:</b>
        <ul className="list-disc list-inside my-4">
          <li className="leading-relaxed">
            Valor à vista: <b>R$ 97,00</b>.
          </li>
          <li className="leading-relaxed">Liberação imediata!</li>
          <li className="leading-relaxed">
            É simples, só usar o aplicativo de seu banco para pagar PIX.
          </li>
          <li className="leading-relaxed">
            Super seguro. O pagamento PIX foi desenvolvido pelo Banco Central
            para facilitar pagamentos.
          </li>
        </ul>
      </div>
    </div>
  );
}

interface CheckoutProps {
  name: string;
  image: string;
  price: number;
}

export default function Checkout({ name, image, price }: CheckoutProps) {
  const [screen, setScreen] = useState("checkout");
  const values = useRef<{ [id: string]: string }>({});

  const proceed = () => {
    if (
      !FORMATTERS.email.validate(values.current.email) ||
      values.current.name.replaceAll(" ", "").length < 10
    )
      return;

    console.log("clicked and passed checks:", values.current);

    if (values.current.tab == "2") {
      return setScreen("pix");
    }
  };

  const receive = (field: string, value: string) => {
    values.current[field] = value;
  };

  return screen == "pix" ? (
    <PixScreen name={name} image={image} price={price} infos={values.current} />
  ) : (
    <PaymentScreen
      name={name}
      image={image}
      proceed={proceed}
      receive={receive}
    />
  );
}

async function createServerPIX(config: CreatePixConfig) {
  const response = await fetch("/api/pix", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(config),
  });

  return response.json();
}

interface PixScreenProps {
  name: string;
  image: string;
  price: number;
  infos: { [id: string]: string };
}

interface PixPayment {
  id?: number;
  qrcode?: string;
  code?: string;
}

function PixScreen(props: PixScreenProps) {
  const [stage, setStage] = useState("scanning");

  const [pixPayment, setPixPayment] = useState<PixPayment>({});

  useEffect(() => {
    createServerPIX({
      price: props.price,
      name: props.infos.name,
      email: props.infos.email,
    }).then((response: PaymentResponse) => {
      setPixPayment({
        id: response.id,
        code: response.point_of_interaction?.transaction_data?.qr_code,
        qrcode: response.point_of_interaction?.transaction_data?.qr_code_base64,
      });
    });
  }, []);

  return stage == "scanning" ? (
    <PixScanningScreen
      {...props}
      payment={pixPayment}
      proceed={() => setStage("confirming")}
    />
  ) : (
    <PixConfirmingScreen {...props} payment={pixPayment} />
  );
}

function PixScanningScreen({
  name,
  image,
  proceed,
  payment,
}: PixScreenProps & { proceed: () => void; payment: PixPayment }) {
  return (
    <div className="flex flex-col gap-8 w-[672px] font-opensans">
      {/* The product headline infos */}
      <div className="flex items-center gap-4 px-4">
        <img className="max-w-[128px] max-h-[128px] rounded" src={image} />
        <span className="text-2xl font-bold">{name}</span>
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
          {payment.qrcode && (
            <img
              className="w-1/3"
              src={"data:image/jpeg;base64," + payment.qrcode}
            />
          )}
          {/* Copy pix code */}
          <a
            onClick={() =>
              payment.code && navigator.clipboard.writeText(payment.code)
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
            onClick={proceed}
            href="javascript:"
            className="flex underline hover:no-underline relative justify-center w-full md:w-3/4 text-blue-700 font-bold p-3 text-base rounded text-center"
          >
            JÁ FIZ O PAGAMENTO
          </a>
        </div>
        <div className="px-4">
          <div className="flex text-xl font-bold border-t flex-row p-4 mt-4">
            <div className="flex-1">TOTAL</div>{" "}
            <div className="flex-1 text-right">R$97,00</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function alwaysTwo(number: number) {
  if (number < 10) return "0" + number;
  return number;
}

function prettyMinutes(seconds: number) {
  return `${alwaysTwo(Math.floor(seconds / 60))}:${alwaysTwo(seconds % 60)}`;
}

import Confetti from "react-confetti";
import { cn } from "./utils";
import NewInput from "./NewInput";

function PixConfirmingScreen({
  name,
  image,
  payment,
}: PixScreenProps & { payment: PixPayment }) {
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<HTMLSpanElement>(null);

  async function checkPaymentStatus() {
    const response = await fetch("/api/pix?id=" + payment.id);
    const result: Paydata = await response.json();

    if (result.finished) setFinished(true);
  }

  useEffect(() => {
    var secondsRemaining = 120;

    const interval = setInterval(() => {
      secondsRemaining--;
      if (secondsRemaining <= 0 || finished) clearInterval(interval);

      if (timerRef.current)
        timerRef.current.innerText = prettyMinutes(secondsRemaining);

      secondsRemaining % 5 == 0 && checkPaymentStatus();
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col gap-8 w-[672px] font-opensans">
      {finished && <Confetti />}
      {/* The product headline infos */}
      <div className="flex items-center gap-4 px-4">
        <img className="max-w-[128px] max-h-[128px] rounded" src={image} />
        <span className="text-2xl font-bold">{name}</span>
      </div>
      {/* The pix infos */}
      <div className="flex flex-col gap-2 bg-white rounded p-4 border border-zinc-300 shadow">
        <div className="flex justify-center">
          <img className="w-32" src="/pix-bc-logo.webp" />
        </div>
        <h3
          className={cn(
            "text-2xl text-center px-12 mt-8 font-bold",
            finished ? "text-green-500" : "text-orange-500"
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
                ID: {payment.id}
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
                <div className="flex-1 text-right">R$97,00</div>
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
            <div>
              <div className="text-center text-lg text-gray-700">
                Ainda não fez o pagamento?
              </div>{" "}
              <a
                href="javascript:"
                className="flex hover:no-underline relative justify-center w-full text-blue-700 underline font-bold p-3 text-base rounded text-center"
              >
                PAGUE AGORA COM PIX
              </a>
            </div>
            <div className="px-4">
              <div className="flex text-xl font-bold border-t flex-row p-4 mt-4">
                <div className="flex-1">TOTAL</div>{" "}
                <div className="flex-1 text-right">R$97,00</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface PaymentScreenProps {
  name: string;
  image: string;
  receive: (field: string, value: string) => void;
  proceed: () => void;
}

function PaymentScreen({ name, image, receive, proceed }: PaymentScreenProps) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="flex flex-col gap-8 w-[700px] font-opensans">
      {/* The product headline infos */}
      <div className="flex items-center gap-4 px-4">
        <img className="max-w-[128px] max-h-[128px] rounded" src={image} />
        <span className="text-2xl font-bold">{name}</span>
      </div>
      {/* The billing and payment infos */}
      <div className="flex flex-col gap-2 bg-white rounded p-6 border border-zinc-300 shadow">
        <Input
          report={receive}
          id="name"
          name="Nome completo"
          initialValue="Cleber Mendes"
          formatter="empty"
        />

        <Input
          report={receive}
          id="email"
          initialValue="test@gmail.com"
          name="Email"
          formatter="email"
        />
        <Input
          report={receive}
          id="confirm_email"
          name="Confirmar email"
          initialValue="test@gmail.com"
          formatter="email"
        />

        <div className="flex gap-2 mb-6">
          <Input
            report={receive}
            initialValue="22222222222"
            id="cpf"
            name="CPF"
            formatter="cpf"
          />
          <NewInput
            report={receive}
            id="phone"
            name="Celular com DDD"
          />
        </div>

        <Tab
          report={receive}
          selected={tabIndex}
          setSelected={setTabIndex}
          options={[
            {
              name: "Cartão",
              Icon: IconCard,
              View: () => <CardView receive={receive} />,
            },
            { name: "Boleto", Icon: IconBoleto, View: BoletoView },
            { name: "Pix", Icon: IconPix, View: PixView },
          ]}
        />

        <div className="flex gap-2 flex-col items-center">
          {/* The pay now button */}
          <button
            onClick={proceed}
            className="w-full rounded bg-[#46c900] p-4 text-white text-lg font-semibold hover:opacity-75"
          >
            PAGAR AGORA
          </button>
          {/* The kiwify logo button */}
          <a target="_blank" href="https://www.kiwify.com.br">
            <img
              width="80"
              src="https://assets.kiwify.com.br/extra/footer-kiwify-gray.png"
              className="w-20 my-2"
            ></img>
          </a>
          {/* The language selection button */}
          <select className="mb-2 px-4 py-1 text-sm text-zinc-400 rounded border bg-transparent">
            <option value="brazil">🇧🇷 Brasil</option>
            <option value="intl">🌎 Internacional</option>
          </select>
          {/* The legal article stuff */}
          <article className="opacity-50 flex flex-col space-y-1 text-[.65rem] text-gray-500 text-center">
            <div>
              Ao clicar em 'Pagar Agora', eu declaro que (i) estou ciente que a
              Kiwify está processando essa compra em nome de
              <b>Leandro de Oliveira Soares</b> e que não possui
              responsabilidade pelo conteúdo, oferta, e nem faz controle prévio
              do infoproduto; (ii) que li e concordo com os{" "}
              <b>Termos de Compra</b>, <b>Termos de Uso</b>, e{" "}
              <b>Política de Privacidade</b>.
            </div>
            <a>
              <b>Denunciar esse produto.</b>
            </a>
            <span>*Parcelamento com acréscimo.</span>
            <div>
              <span>Este site está protegido pelo Google reCAPTCHA.</span>
              <br />
              <a>
                <b>Política de Privacidade</b>
              </a>{" "}
              e{" "}
              <a>
                <b>Termos de Serviço</b>
              </a>
              .
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
