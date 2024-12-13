import { useRef, useState, type FC } from "react";

import ScreenBoletoConfirming from "./screen-boleto-confirming";
import ScreenPayment from "./screen-payment";
import ScreenPixConfirming from "./screen-pix-confirming";
import ScreenPixScanning from "./screen-pix-scanning";

import type { PostBoletoResponse } from "../../pages/api/boleto";
import type { Payment } from "../../services/mercadopago/lib";
import type { Product } from "../../services/mercadopago/purchase";
import type { PostPixResponse } from "../../pages/api/pix";

interface AvailablePayments {
  boleto?: PostBoletoResponse;
  pix?: PostPixResponse;
  card?: BasicPayment;
}

export interface ScreenProps {
  product: Product;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  paymentDataRef: React.MutableRefObject<AvailablePayments>;
  formValuesRef: React.MutableRefObject<{ [id: string]: any }>;
  receiveFormValues: (field: string, value: any) => void;
}

export interface BasicPayment {
  id: number;
  kind: "card" | "pix";
  status: Payment["status"];
  interactions?: {
    code: string;
    qrcode: string;
  };
}

export default function (props: { product: Product }) {
  const [screen, setScreen] = useState("payment");

  const formValuesRef = useRef<{ [id: string]: any }>({});
  const paymentDataRef = useRef<AvailablePayments>({});

  const receiveFormValues = (field: string, value: any) => {
    formValuesRef.current[field] = value;
  };

  const screens: { [id: string]: FC<ScreenProps> } = {
    payment: ScreenPayment,
    boleto_confirming: ScreenBoletoConfirming,
    pix_scanning: ScreenPixScanning,
    pix_confirming: ScreenPixConfirming,
  };

  const CurrentScreen = screens[screen];

  return (
    <CurrentScreen
      setScreen={setScreen}
      product={props.product}
      formValuesRef={formValuesRef}
      paymentDataRef={paymentDataRef}
      receiveFormValues={receiveFormValues}
    />
  );
}
