import { useRef, useState, type FC } from "react";

import ScreenPayment from "./screen-payment";
import ScreenPixConfirming from "./screen-pix-confirming";
import ScreenPixScanning from "./screen-pix-scanning";

import type { Payment } from "../../services/mercadopago/lib";
import type { Product } from "../../services/mercadopago/purchase";

export interface ScreenProps {
  product: Product;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  paymentDataRef: React.MutableRefObject<Payment | undefined>;
  formValuesRef: React.MutableRefObject<{ [id: string]: any }>;
  receiveFormValues: (field: string, value: any) => void;
}

export default function (props: { product: Product }) {
  const [screen, setScreen] = useState("payment");

  const formValuesRef = useRef<{ [id: string]: any }>({});
  const paymentDataRef = useRef<Payment>();

  const receiveFormValues = (field: string, value: any) => {
    formValuesRef.current[field] = value;
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
      formValuesRef={formValuesRef}
      paymentDataRef={paymentDataRef}
      receiveFormValues={receiveFormValues}
    />
  );
}
