import { cn } from "./utils";
import type { PropsWithRef, Ref } from "react";

export function IconCard() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="credit-card"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      className="svg-inline--fa fa-credit-card fa-w-18 mr-2 w-4 h-4 sm:w-6 sm:h-6"
    >
      <path
        fill="currentColor"
        d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
      ></path>
    </svg>
  );
}

export function IconBoleto() {
  return (
    <svg
      viewBox="0 -256 1850 1850"
      id="svg3013"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="mr-2 w-4 h-4 sm:w-6 sm:h-6 fill-current"
    >
      <g transform="matrix(1,0,0,-1,37.966102,1313.0508)" id="g3015">
        <path
          d="M 672,1408 V -128 h -64 v 1536 h 64 z m 736,0 V -128 h -64 v 1536 h 64 z m 160,0 V -128 h -64 v 1536 h 64 z m -992,0 V -128 h -64 v 1536 h 64 z m 704,0 V -128 h -256 v 1536 h 256 z m -384,0 V -128 H 768 v 1536 h 128 z m -448,0 V -128 H 320 v 1536 h 128 z m 1344,0 V -128 h -128 v 1536 h 128 z m -1536,0 V -128 H 0 v 1536 h 256 z"
          id="path3017"
          inkscape:connector-curvature="0"
        ></path>
      </g>
    </svg>
  );
}

export function IconPix() {
  return (
    <svg
      width="166"
      height="166"
      viewBox="0 0 166 166"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2 w-4 h-4 sm:w-6 sm:h-6"
    >
      <path
        d="M128.886 126.429C122.402 126.429 116.304 123.904 111.719 119.321L86.9305 94.5328C85.1908 92.7877 82.1569 92.7931 80.4173 94.5328L55.5383 119.412C50.9529 123.994 44.8548 126.519 38.3704 126.519H33.4857L64.8802 157.914C74.6853 167.718 90.5823 167.718 100.387 157.914L131.873 126.429H128.886Z"
        fill="currentColor"
      ></path>{" "}
      <path
        d="M38.3705 38.7476C44.8549 38.7476 50.953 41.2731 55.5376 45.8562L80.4166 70.739C82.2083 72.5308 85.1342 72.5385 86.9306 70.7367L111.719 45.9464C116.304 41.3633 122.402 38.8385 128.887 38.8385H131.872L100.388 7.35388C90.5824 -2.45126 74.6854 -2.45126 64.8803 7.35388L33.4866 38.7476H38.3705Z"
        fill="currentColor"
      ></path>{" "}
      <path
        d="M157.914 64.8806L138.888 45.8541C138.469 46.022 138.015 46.1269 137.537 46.1269H128.887C124.414 46.1269 120.036 47.9404 116.876 51.1026L92.0874 75.8914C89.7686 78.2109 86.7207 79.3722 83.6752 79.3722C80.6273 79.3722 77.5818 78.2109 75.2622 75.8937L50.3809 51.0124C47.2204 47.8503 42.8433 46.0368 38.3705 46.0368H27.7337C27.2805 46.0368 26.8561 45.9295 26.4558 45.7787L7.35385 64.8806C-2.45128 74.685 -2.45128 90.582 7.35385 100.388L26.455 119.489C26.8553 119.338 27.2805 119.231 27.7337 119.231H38.3705C42.8433 119.231 47.2204 117.417 50.3809 114.255L75.2599 89.3763C79.7567 84.8834 87.5952 84.8811 92.0874 89.3787L116.876 114.164C120.036 117.327 124.414 119.141 128.887 119.141H137.537C138.016 119.141 138.469 119.245 138.888 119.413L157.914 100.388C167.719 90.582 167.719 74.685 157.914 64.8806Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function BadgeCorrect() {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 absolute text-green-500 -top-1 -right-2"
    >
      <g fill="none" fill-rule="evenodd">
        <path
          d="M16 8c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
          fill="currentColor"
        ></path>{" "}
        <path
          stroke="#FFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.092 6L7.003 9.914 5 7.911"
        ></path>
      </g>
    </svg>
  );
}

export function IconSecurity({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512.005 512.005"
      className={cn("w-[20px] h-[20px] text-current", className)}
      data-tippy-directive=""
      tabIndex={0}
    >
      <path
        fill="currentColor"
        d="M256.003,234.672c-11.76,0-21.333,9.573-21.333,21.333c0,7.792,4.409,14.329,10.667,18.053v13.947
				c0,5.896,4.771,10.667,10.667,10.667c5.896,0,10.667-4.771,10.667-10.667v-13.947c6.258-3.724,10.667-10.262,10.667-18.053
				C277.336,244.245,267.763,234.672,256.003,234.672z"
      ></path>{" "}
      <path
        fill="currentColor"
        d="M256.003,149.339c-17.646,0-32,14.354-32,32v10.667h64v-10.667C288.003,163.693,273.648,149.339,256.003,149.339z"
      ></path>{" "}
      <path
        fill="currentColor"
        d="M440.888,64.609l-181.333-64c-2.292-0.813-4.812-0.813-7.104,0l-181.333,64c-4.26,1.51-7.115,5.542-7.115,10.063v128
				c0,165.646,24.563,226.188,187.198,308.188c1.51,0.76,3.156,1.146,4.802,1.146c1.646,0,3.292-0.385,4.802-1.146
				c162.635-82,187.198-142.542,187.198-308.188v-128C448.003,70.151,445.148,66.12,440.888,64.609z M352.003,320.005
				c0,11.76-9.573,21.333-21.333,21.333H181.336c-11.76,0-21.333-9.573-21.333-21.333V213.339c0-11.76,9.573-21.333,21.333-21.333
				v-10.667c0-41.167,33.5-74.667,74.667-74.667s74.667,33.5,74.667,74.667v10.667c11.76,0,21.333,9.573,21.333,21.333V320.005z"
      ></path>
    </svg>
  );
}

export function IconDoubt({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={cn("w-[20px] h-[20px] text-black", className)}
      data-tippy-directive=""
      tabIndex={0}
    >
      <path
        fill="currentColor"
        d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z"
      ></path>
    </svg>
  );
}

export function IconQRCode() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="mr-1 w-5"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
      ></path>
    </svg>
  );
}

export function IconCopy() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mr-1 w-5"
    >
      <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"></path>{" "}
      <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path>
    </svg>
  );
}

export function IconError({ className }: { className: string }) {
  return (
    <svg
      className={cn("w-5 h-5 text-red-600", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z"
      ></path>
    </svg>
  );
}
