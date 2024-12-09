import type { CardTokenResponse } from "mercadopago/dist/clients/cardToken/commonTypes";
import type { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import Tab from "../components/Tab";
import type { PostCreditPayload } from "../pages/api/credit";
import type { PostPixPayload } from "../pages/api/pix";
import type { Paydata } from "../services/mercadopago";
import {
  IconBoleto,
  IconCard,
  IconCopy,
  IconDoubt,
  IconPix,
  IconQRCode,
  IconSecurity,
} from "./Icons";
import NewInput from "./NewInput";
import NewSelect from "./NewSelect";
import { cn, money } from "./utils";
import {
  cardNumberValidator,
  cpfValidator,
  emailValidator,
  phoneValidator,
} from "./validators";

interface CardViewProps {
  product: Product;
  receive: (field: string, value: string) => void;
}

function CardView({ receive, product }: CardViewProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <div className="md:p-4 space-y-2 md:border md:rounded md:bg-zinc-50">
        <NewInput
          report={receive}
          id="card_number"
          mask={cardNumberValidator.mask}
          validate={cardNumberValidator.validate}
          name="Número de Cartão de Crédito"
          badge={<IconSecurity />}
          initialValue="379256003445765"
          badgeTooltip="Nós protegemos seus dados de pagamento usando encriptação para prover segurança no nível de bancos."
        />

        <div className="flex flex-wrap md:flex-nowrap gap-2">
          <div className="flex gap-2 w-full">
            <NewSelect
              report={receive}
              id="card_month"
              initialValue="03"
              name="Mês"
              options={Array.from({ length: 12 }, (_, i) => ({
                name: alwaysTwo(i + 1),
                value: alwaysTwo(i + 1),
              }))}
            />

            <NewSelect
              report={receive}
              id="card_year"
              name="Ano"
              initialValue="2029"
              options={Array.from({ length: 12 }, (_, i) => ({
                name: currentYear + i,
                value: currentYear + i,
              }))}
            />
          </div>

          <NewInput
            report={receive}
            id="card_cvv"
            mask={(value) => value.slice(0, 4).replace(/\D/g, "")}
            validate={(value) => value.length > 2}
            name="Cód. segurança"
            initialValue="4321"
            badge={<IconDoubt />}
            badgeTooltip="O CVV/Cód. segurança é o código de 3 ou 4 dígitos que aparece atrás do seu cartão"
          />
        </div>

        <NewSelect
          report={receive}
          id="installments"
          name="Parcelas"
          initialValue={1}
          options={Array.from({ length: 12 }, (_, i) => {
            const times = 12 - i;

            if (times == 1) {
              return {
                name: "R$" + product.price.toFixed(2).replace(".", ","),
                value: times,
              };
            }

            const installmentPrice = price(product.price, 2.9956 / 100, times)
              .toFixed(2)
              .replace(".", ",");

            return {
              name: `${times}x de R$ ${installmentPrice}`,
              value: times,
            };
          })}
        />
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

function BoletoView({ product }: { product: Product }) {
  return (
    <div className="md:px-4 md:py-3 bg-zinc-50 md:rounded md:border">
      <div className="p-4 bg-zinc-100 rounded">
        <b>Informações sobre o pagamento via boleto:</b>
        <ul className="list-disc list-inside my-4">
          <li className="leading-relaxed">
            Valor à vista: <b>{money(product.price)}</b>.
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

function PixView({ product }: { product: Product }) {
  return (
    <div className="md:px-4 md:py-3 bg-zinc-50 md:rounded md:border">
      <div className="bg-zinc-100 rounded p-4">
        <b>Informações sobre o pagamento via pix:</b>
        <ul className="list-disc list-inside my-4">
          <li className="leading-relaxed">
            Valor à vista: <b>{money(product.price)}</b>.
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

async function createCreditPayment(payload: PostCreditPayload) {
  //@ts-expect-error
  const MP = new MercadoPago(import.meta.env.PUBLIC_MP_KEY);

  const token = (await MP.createCardToken({
    cardNumber: payload.card_number.replace(/\D/g, ""),
    cardholderName: payload.payer_name,
    cardExpirationMonth: payload.card_month,
    cardExpirationYear: payload.card_year,
    securityCode: payload.card_cvv,
    identificationType: "CPF",
    identificationNumber: payload.payer_cpf.replace(/\D/g, ""),
  })) as CardTokenResponse;

  console.log("generated card token:", token);

  const response = await fetch("/api/credit", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      card_token_id: token.id,
    }),
  });

  return response.json();
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface CheckoutProps {
  product: Product;
}

export default function Checkout({ product }: CheckoutProps) {
  const [screen, setScreen] = useState("checkout");
  const values = useRef<{ [id: string]: any }>({});

  const proceed = () => {
    function error(msg: string) {
      console.log(msg);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const form = values.current;
    console.log("[INFO] pay now requested, form values:", values.current);

    if (form.name.length < 10)
      return error("[CHECK-FAILED] full name too short.");

    if (!emailValidator.validate(form.email))
      return error("[CHECK-FAILED] email invalid.");

    if (!cpfValidator.validate(form.cpf))
      return error("[CHECK-FAILED] cpf invalid.");

    if (values.current.tab == 0) {
      if (!cardNumberValidator.validate(form.card_number))
        return error("[CHECK-FAILED] card number invalid.");

      if (form.card_cvv.length < 3)
        return error("[CHECK-FAILED] card cvv invalid.");
    }

    console.log("[OK] pay now form checks passed.");

    switch (values.current.tab.toString()) {
      case "0": // request credit payment creation
        return createCreditPayment({
          product_id: product.id,
          payer_name: form.name,
          payer_email: form.email,
          payer_cpf: form.cpf,
          card_number: form.card_number,
          card_month: form.card_month,
          card_year: form.card_year,
          card_cvv: form.card_cvv,
        });

      case "2": // continue to next pix screen
        return setScreen("pix");

      default:
        break;
    }
  };

  const receive = (field: string, value: any) => {
    values.current[field] = value;
  };

  return screen == "pix" ? (
    <PixScreen product={product} infos={values.current} />
  ) : (
    <PaymentScreen product={product} proceed={proceed} receive={receive} />
  );
}

async function createPIXPayment(payload: PostPixPayload) {
  const response = await fetch("/api/pix", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

interface PixScreenProps {
  product: Product;
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
    createPIXPayment({
      payer_name: props.infos.name,
      payer_email: props.infos.email,
      product_id: props.product.id,
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

function PixScanningScreen(
  props: PixScreenProps & { proceed: () => void; payment: PixPayment },
) {
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
          {props.payment.qrcode && (
            <img
              className="w-1/3"
              src={"data:image/jpeg;base64," + props.payment.qrcode}
            />
          )}
          {/* Copy pix code */}
          <a
            onClick={() =>
              props.payment.code &&
              navigator.clipboard.writeText(props.payment.code)
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
            onClick={props.proceed}
            className="flex underline hover:no-underline relative justify-center w-full md:w-3/4 text-blue-700 font-bold p-3 text-base rounded text-center"
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

function alwaysTwo(number: number) {
  if (number < 10) return "0" + number;
  return number;
}

function prettyMinutes(seconds: number) {
  return `${alwaysTwo(Math.floor(seconds / 60))}:${alwaysTwo(seconds % 60)}`;
}

function PixConfirmingScreen(props: PixScreenProps & { payment: PixPayment }) {
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<HTMLSpanElement>(null);

  async function checkPaymentStatus() {
    const response = await fetch("/api/pix?id=" + props.payment.id);
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
                ID: {props.payment.id}
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
            <div>
              <div className="text-center text-lg text-gray-700">
                Ainda não fez o pagamento?
              </div>{" "}
              <a className="flex hover:no-underline relative justify-center w-full text-blue-700 underline font-bold p-3 text-base rounded text-center">
                PAGUE AGORA COM PIX
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
        )}
      </div>
    </div>
  );
}

interface PaymentScreenProps {
  product: Product;
  receive: (field: string, value: string) => void;
  proceed: () => void;
}

function PaymentScreen({ product, receive, proceed }: PaymentScreenProps) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="flex flex-col gap-8 w-[672px] font-opensans">
      {/* The product headline infos */}
      <div className="flex items-center gap-4 px-4">
        <img
          className="max-w-[128px] max-h-[128px] rounded"
          src={product.image}
        />
        <span className="text-2xl font-bold">{product.name}</span>
      </div>
      {/* The billing and payment infos */}
      <div className="flex flex-col gap-3 bg-white rounded p-2 md:p-6 border border-zinc-300 shadow">
        <NewInput
          report={receive}
          id="name"
          name="Nome completo"
          mask={(value) => value.slice(0, 125)}
          validate={(value) => value.length > 10}
          initialValue="Cleber Mendes del Rey"
        />

        <NewInput
          report={receive}
          id="email"
          initialValue="cleber.mendes.del.rey@gmail.com"
          name="Email"
          mask={emailValidator.mask}
          validate={emailValidator.validate}
        />
        <NewInput
          report={receive}
          id="confirm_email"
          name="Confirmar email"
          initialValue="cleber.mendes.del.rey@gmail.com"
          mask={emailValidator.mask}
          validate={emailValidator.validate}
        />

        <div className="flex flex-wrap md:flex-nowrap gap-2 mb-6">
          <NewInput
            report={receive}
            initialValue="28940393791"
            id="cpf"
            name="CPF"
            mask={cpfValidator.mask}
            validate={cpfValidator.validate}
          />
          <NewInput
            select={[
              { name: "🇧🇷 +55", value: "brazil" },
              { name: "🇺🇸 +1", value: "usa" },
            ]}
            report={receive}
            id="phone"
            initialValue="21994837873"
            mask={phoneValidator.mask}
            validate={phoneValidator.validate}
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
              View: () => <CardView product={product} receive={receive} />,
            },
            {
              name: "Boleto",
              Icon: IconBoleto,
              View: () => <BoletoView product={product} />,
            },
            {
              name: "Pix",
              Icon: IconPix,
              View: () => <PixView product={product} />,
            },
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
