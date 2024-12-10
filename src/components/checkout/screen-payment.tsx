import { useState } from "react";
import type { Product } from "../../services/mercadopago/purchase";
import { IconBoleto, IconCard, IconPix } from "../Icons";
import NewInput from "../NewInput";
import NewSubmit from "../NewSubmit";
import Tab from "../Tab";
import validators from "../validators";
import { BoletoView, CardView, PixView } from "./screen-payment-views";

export default function (props: {
  receive: (field: string, value: string) => void;
  proceed: () => void;
  product: Product;
}) {
  const [tabIndex, setTabIndex] = useState(0);

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
      {/* The billing and payment infos */}
      <div className="flex flex-col gap-3 bg-white rounded p-2 md:p-6 border border-zinc-300 shadow">
        <NewInput
          report={props.receive}
          id="name"
          name="Nome completo"
          mask={(value) => value.slice(0, 125)}
          validate={(value) => value.length > 10}
          initialValue="Cleber Mendes del Rey"
        />

        <NewInput
          report={props.receive}
          id="email"
          initialValue="cleber.mendes.del.rey@gmail.com"
          name="Email"
          mask={validators.email.mask}
          validate={validators.email.validate}
        />
        <NewInput
          report={props.receive}
          id="confirm_email"
          name="Confirmar email"
          initialValue="cleber.mendes.del.rey@gmail.com"
          mask={validators.email.mask}
          validate={validators.email.validate}
        />

        <div className="flex flex-wrap md:flex-nowrap gap-2 mb-6">
          <NewInput
            report={props.receive}
            initialValue="12345678909"
            id="cpf"
            name="CPF"
            mask={validators.cpf.mask}
            validate={validators.cpf.validate}
          />
          <NewInput
            select={[
              { name: "🇧🇷 +55", value: "brazil" },
              { name: "🇺🇸 +1", value: "usa" },
            ]}
            report={props.receive}
            id="phone"
            initialValue="21994837873"
            mask={validators.phone.mask}
            validate={validators.phone.validate}
            name="Celular com DDD"
          />
        </div>

        <Tab
          report={props.receive}
          selected={tabIndex}
          setSelected={setTabIndex}
          options={[
            {
              name: "Cartão",
              Icon: IconCard,
              View: () => (
                <CardView product={props.product} receive={props.receive} />
              ),
            },
            {
              name: "Boleto",
              Icon: IconBoleto,
              View: () => <BoletoView product={props.product} />,
            },
            {
              name: "Pix",
              Icon: IconPix,
              View: () => <PixView product={props.product} />,
            },
          ]}
        />

        <div className="flex gap-2 flex-col items-center">
          {/* The pay now button */}
          <NewSubmit onClick={props.proceed} />
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
          {bullshitFooter}
        </div>
      </div>
    </div>
  );
}

const bullshitFooter = (
  <article className="opacity-50 flex flex-col space-y-1 text-[.65rem] text-gray-500 text-center">
    <div>
      Ao clicar em 'Pagar Agora', eu declaro que (i) estou ciente que a Kiwify
      está processando essa compra em nome de
      <b>Leandro de Oliveira Soares</b> e que não possui responsabilidade pelo
      conteúdo, oferta, e nem faz controle prévio do infoproduto; (ii) que li e
      concordo com os <b>Termos de Compra</b>, <b>Termos de Uso</b>, e{" "}
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
);
