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

type CreateCardTokenResponse = (Expiration & WithCardHolder) & {
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

export class MercadoPago {
  config: MercadoPagoConfig;

  constructor(config: MercadoPagoConfig) {
    this.config = config;
  }

  async fetch<T>(options: {
    method: "GET" | "POST" | "DELETE";
    path: string;
    body: object;
  }) {
    const response = await fetch(ENDPOINT + options.path, {
      method: options.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.accessToken}`,
      },
      body: JSON.stringify(options.body),
    });

    return response.json() as T;
  }

  async createCardToken(card: CardInfos & WithCardHolder) {
    return await this.fetch<CreateCardTokenResponse>({
      path: `/v1/card_tokens?public_key=${this.config.publicKey}`,
      method: "POST",
      body: card,
    });
  }
}
