import type { Product } from "../../services/mercadopago/purchase";
import { IconDoubt, IconSecurity } from "../Icons";
import NewInput from "../NewInput";
import NewSelect from "../NewSelect";
import { alwaysTwo, applyTax, money } from "../utils";
import validators from "../validators";

export function CardView(props: {
  product: Product;
  receive: (field: string, value: string) => void;
}) {
  const currentYear = new Date().getFullYear();
  const dev = import.meta.env.DEV;

  return (
    <div>
      <div className="md:p-4 space-y-2 md:border md:rounded md:bg-zinc-50">
        <NewInput
          report={props.receive}
          id="card_number"
          mask={validators.cardNumber.mask}
          validate={validators.cardNumber.validate}
          name="Número de Cartão de Crédito"
          badge={<IconSecurity />}
          initialValue={dev ? "5031 4332 1540 6351" : ""}
          badgeTooltip="Nós protegemos seus dados de pagamento usando encriptação para prover segurança no nível de bancos."
        />

        <div className="flex flex-wrap md:flex-nowrap gap-2">
          <div className="flex gap-2 w-full">
            <NewSelect
              report={props.receive}
              id="card_month"
              initialValue={dev ? "11" : ""}
              name="Mês"
              options={Array.from({ length: 12 }, (_, i) => ({
                name: alwaysTwo(i + 1),
                value: alwaysTwo(i + 1),
              }))}
            />

            <NewSelect
              report={props.receive}
              id="card_year"
              name="Ano"
              initialValue={dev ? "2025" : ""}
              options={Array.from({ length: 12 }, (_, i) => ({
                name: currentYear + i,
                value: currentYear + i,
              }))}
            />
          </div>

          <NewInput
            report={props.receive}
            id="card_cvv"
            mask={(value) => value.slice(0, 4).replace(/\D/g, "")}
            validate={(value) => value.length > 2}
            name="Cód. segurança"
            initialValue={dev ? "123" : ""}
            badge={<IconDoubt />}
            badgeTooltip="O CVV/Cód. segurança é o código de 3 ou 4 dígitos que aparece atrás do seu cartão"
          />
        </div>

        <NewSelect
          report={props.receive}
          id="installments"
          name="Parcelas"
          initialValue={1}
          options={Array.from({ length: 12 }, (_, i) => {
            const times = 12 - i;

            if (times == 1) {
              return {
                name: "R$" + props.product.price.toFixed(2).replace(".", ","),
                value: times,
              };
            }

            const installmentPrice = applyTax(
              props.product.price,
              2.9956 / 100,
              times,
            )
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
        <div className="brightness-150 flex gap-2 items-center mx-[2.5px]">
          <input checked readOnly type="checkbox" />
          <span className="text-sm">Salvar dados para as próximas compras</span>
        </div>
        <div className="flex gap-2 items-center text-gray-500">
          <IconSecurity className="w-[20px] h-[20px]" />
          <span className="text-xs">
            Nós protegemos seus dados de pagamento usando encriptação para
            prover segurança no nível de bancos.
          </span>
        </div>
      </div>
    </div>
  );
}

export function BoletoView({ product }: { product: Product }) {
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

export function PixView({ product }: { product: Product }) {
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
