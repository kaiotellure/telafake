const ENDPOINT = "https://api.mercadopago.com";

interface MercadoPagoConfig {
  accessToken: string;
  publicKey: string;
}

interface Expiration {
  expiration_month: string | number;
  expiration_year: string | number;
}

type CardInfos = Expiration & {
  card_number: string;
  security_code: string;
};

interface WithCardHolder {
  cardholder: {
    name: string;
    identification: {
      type: "CPF" | string;
      number: string;
    };
  };
}

export type CardToken = (Expiration & WithCardHolder) & {
  id: string;
  public_key: string;
  first_six_digits: string;
  last_four_digits: string;
  status: string;
  date_created: string;
  date_last_updated: string;
  date_due: string;
  luhn_validation: boolean;
  live_mode: boolean;
  require_esc: boolean;
  card_number_length: number;
  security_code_length: number;
};

interface PaymentOptions {
  transaction_amount: number;
  installments: number;
  description?: string;
  payment_method_id?: "pix";
  token?: string;
  payer: {
    first_name?: string;
    last_name?: string;
    email: string;
  };
}

export interface Payment {
  id: number;
  payment_method_id: string;
  status: "pending" | "approved" | "authorized" | "rejected";
  point_of_interaction: {
    transaction_data: {
      qr_code_base64: string;
      qr_code: string;
    };
  };
}

interface Error {
  message: string;
  error: string;
  // status: number;
  cause: {
    code: number;
    description: string;
    data: string;
  }[];
}

export class MercadoPago {
  config: MercadoPagoConfig;

  constructor(config: MercadoPagoConfig) {
    this.config = config;
  }

  async fetch<T>(options: {
    method: "GET" | "POST" | "DELETE";
    idempotencyKey?: string;
    path: string;
    body?: object;
  }) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.config.accessToken}`,
    };

    if (options.idempotencyKey)
      headers["X-Idempotency-Key"] = options.idempotencyKey;

    const response = await fetch(ENDPOINT + options.path, {
      body: options.body && JSON.stringify(options.body),
      method: options.method,
      headers,
    });

    return (await response.json()) as T & Error;
  }

  async createCardToken(
    card: CardInfos & WithCardHolder,
    idempotencyKey?: string,
  ) {
    return await this.fetch<CardToken>({
      path: `/v1/card_tokens?public_key=${this.config.publicKey}`,
      method: "POST",
      idempotencyKey,
      body: card,
    });
  }

  async createPayment(options: PaymentOptions, idempotencyKey: string) {
    return await this.fetch<Payment>({
      path: `/v1/payments`,
      method: "POST",
      body: options,
      idempotencyKey,
    });
  }

  async fetchPayment(id: number) {
    return await this.fetch<Payment>({
      path: `/v1/payments/${id}`,
      method: "GET",
    });
  }
}
