import type { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { useEffect, useRef, useState, type FC } from "react";

import ScreenPayment from "./screen-payment";
import ScreenPixConfirming from "./screen-pix-confirming";
import ScreenPixScanning from "./screen-pix-scanning";

import type { Product } from "../../services/mercadopago/purchase";

interface ScreenProps {
  product: Product;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  formValues: React.MutableRefObject<{ [id: string]: any }>;
  receiveFormValues: (field: string, value: any) => void;
}

export default function Checkout(props: { product: Product }) {
  const [screen, setScreen] = useState("payment");
  const formValues = useRef<{ [id: string]: any }>({});

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

  const receiveFormValues = (field: string, value: any) => {
    values.current[field] = value;
  };

  const screens: { [id: string]: FC<ScreenProps> } = {
    payment: ScreenPayment,
    pix_scanning: ScreenPixScanning,
    pix_confirming: ScreenPixConfirming,
  };

  const CurrentScreen = screens[screen];
  return (
    <CurrentScreen
      setScreen={setScreen}
      product={props.product}
      formValues={formValues}
      receiveFormValues={receiveFormValues}
    />
  );

  return screen == "pix" ? (
    <PixScreen product={product} infos={values.current} />
  ) : (
    <PaymentScreen product={product} proceed={proceed} receive={receive} />
  );
}

function PixScreen(props: PixScreenProps) {
  const [stage, setStage] = useState("scanning");
  const [pixPayment, setPixPayment] = useState<PixPayment>({});

  useEffect(() => {
    createPIXPayment({
      payer_name: props.infos.name,
      payer_email: props.infos.email,
      payer_cpf: props.infos.cpf,
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
