/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_MP_KEY: string;
  readonly SECRET_MP_TOKEN: string;
  readonly SECRET_WEBHOOK_PIX: string;
  readonly SECRET_WEBHOOK_CC: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
