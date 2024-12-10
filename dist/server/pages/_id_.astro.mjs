/* empty css                                */
import { c as createComponent, r as renderTemplate, d as renderSlot, e as renderHead, f as renderComponent, b as createAstro } from '../chunks/astro/server_C_TVTMNH.mjs';
import 'kleur/colors';
import 'clsx';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useMemo, useRef } from 'react';
import { c as cn, a as alwaysTwo, b as applyTax, m as money, p as prettyMinutes } from '../chunks/utils_CCIxlDDw.mjs';
import CC from 'card-validator';
import CPF from 'cpf-check';
import Confetti from 'react-confetti';
import { p as products } from '../chunks/products_BQsGa0Z_.mjs';
export { renderers } from '../renderers.mjs';

const $$CenteredLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="pt-br"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body class="bg-[#eff1f3] flex justify-center"> <div class="py-8 w-full h-full flex items-center justify-center"> ${renderSlot($$result, $$slots["default"])} </div> </body></html>`;
}, "/home/user/telafake/src/layouts/CenteredLayout.astro", void 0);

function IconCard() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "far",
      "data-icon": "credit-card",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 576 512",
      className: "svg-inline--fa fa-credit-card fa-w-18 mr-2 w-4 h-4 sm:w-6 sm:h-6",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
        }
      )
    }
  );
}
function IconBoleto() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox: "0 -256 1850 1850",
      id: "svg3013",
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.1",
      className: "mr-2 w-4 h-4 sm:w-6 sm:h-6 fill-current",
      children: /* @__PURE__ */ jsx("g", { transform: "matrix(1,0,0,-1,37.966102,1313.0508)", id: "g3015", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M 672,1408 V -128 h -64 v 1536 h 64 z m 736,0 V -128 h -64 v 1536 h 64 z m 160,0 V -128 h -64 v 1536 h 64 z m -992,0 V -128 h -64 v 1536 h 64 z m 704,0 V -128 h -256 v 1536 h 256 z m -384,0 V -128 H 768 v 1536 h 128 z m -448,0 V -128 H 320 v 1536 h 128 z m 1344,0 V -128 h -128 v 1536 h 128 z m -1536,0 V -128 H 0 v 1536 h 256 z",
          id: "path3017",
          "inkscape:connector-curvature": "0"
        }
      ) })
    }
  );
}
function IconPix() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "166",
      height: "166",
      viewBox: "0 0 166 166",
      xmlns: "http://www.w3.org/2000/svg",
      className: "mr-2 w-4 h-4 sm:w-6 sm:h-6",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M128.886 126.429C122.402 126.429 116.304 123.904 111.719 119.321L86.9305 94.5328C85.1908 92.7877 82.1569 92.7931 80.4173 94.5328L55.5383 119.412C50.9529 123.994 44.8548 126.519 38.3704 126.519H33.4857L64.8802 157.914C74.6853 167.718 90.5823 167.718 100.387 157.914L131.873 126.429H128.886Z",
            fill: "currentColor"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M38.3705 38.7476C44.8549 38.7476 50.953 41.2731 55.5376 45.8562L80.4166 70.739C82.2083 72.5308 85.1342 72.5385 86.9306 70.7367L111.719 45.9464C116.304 41.3633 122.402 38.8385 128.887 38.8385H131.872L100.388 7.35388C90.5824 -2.45126 74.6854 -2.45126 64.8803 7.35388L33.4866 38.7476H38.3705Z",
            fill: "currentColor"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M157.914 64.8806L138.888 45.8541C138.469 46.022 138.015 46.1269 137.537 46.1269H128.887C124.414 46.1269 120.036 47.9404 116.876 51.1026L92.0874 75.8914C89.7686 78.2109 86.7207 79.3722 83.6752 79.3722C80.6273 79.3722 77.5818 78.2109 75.2622 75.8937L50.3809 51.0124C47.2204 47.8503 42.8433 46.0368 38.3705 46.0368H27.7337C27.2805 46.0368 26.8561 45.9295 26.4558 45.7787L7.35385 64.8806C-2.45128 74.685 -2.45128 90.582 7.35385 100.388L26.455 119.489C26.8553 119.338 27.2805 119.231 27.7337 119.231H38.3705C42.8433 119.231 47.2204 117.417 50.3809 114.255L75.2599 89.3763C79.7567 84.8834 87.5952 84.8811 92.0874 89.3787L116.876 114.164C120.036 117.327 124.414 119.141 128.887 119.141H137.537C138.016 119.141 138.469 119.245 138.888 119.413L157.914 100.388C167.719 90.582 167.719 74.685 157.914 64.8806Z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
}
function BadgeCorrect() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: "w-4 h-4 absolute text-green-500 -top-1 -right-2",
      children: /* @__PURE__ */ jsxs("g", { fill: "none", fillRule: "evenodd", children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M16 8c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z",
            fill: "currentColor"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          "path",
          {
            stroke: "#FFF",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M11.092 6L7.003 9.914 5 7.911"
          }
        )
      ] })
    }
  );
}
function IconSecurity({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      viewBox: "0 0 512.005 512.005",
      className: cn("w-[20px] h-[20px] text-current", className),
      "data-tippy-directive": "",
      tabIndex: 0,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "M256.003,234.672c-11.76,0-21.333,9.573-21.333,21.333c0,7.792,4.409,14.329,10.667,18.053v13.947\n				c0,5.896,4.771,10.667,10.667,10.667c5.896,0,10.667-4.771,10.667-10.667v-13.947c6.258-3.724,10.667-10.262,10.667-18.053\n				C277.336,244.245,267.763,234.672,256.003,234.672z"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "M256.003,149.339c-17.646,0-32,14.354-32,32v10.667h64v-10.667C288.003,163.693,273.648,149.339,256.003,149.339z"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "M440.888,64.609l-181.333-64c-2.292-0.813-4.812-0.813-7.104,0l-181.333,64c-4.26,1.51-7.115,5.542-7.115,10.063v128\n				c0,165.646,24.563,226.188,187.198,308.188c1.51,0.76,3.156,1.146,4.802,1.146c1.646,0,3.292-0.385,4.802-1.146\n				c162.635-82,187.198-142.542,187.198-308.188v-128C448.003,70.151,445.148,66.12,440.888,64.609z M352.003,320.005\n				c0,11.76-9.573,21.333-21.333,21.333H181.336c-11.76,0-21.333-9.573-21.333-21.333V213.339c0-11.76,9.573-21.333,21.333-21.333\n				v-10.667c0-41.167,33.5-74.667,74.667-74.667s74.667,33.5,74.667,74.667v10.667c11.76,0,21.333,9.573,21.333,21.333V320.005z"
          }
        )
      ]
    }
  );
}
function IconDoubt({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      className: cn("w-[20px] h-[20px] text-black", className),
      "data-tippy-directive": "",
      tabIndex: 0,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z"
        }
      )
    }
  );
}
function IconQRCode() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      className: "mr-1 w-5",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          d: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
        }
      )
    }
  );
}
function IconCopy() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      className: "mr-1 w-5",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" }),
        " ",
        /* @__PURE__ */ jsx("path", { d: "M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" })
      ]
    }
  );
}
function IconError({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: cn("w-5 h-5 text-red-600", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z"
        }
      )
    }
  );
}
function Spinner(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      className: cn(
        "w-4 h-4 text-zinc-300 animate-spin fill-white",
        props.className
      ),
      viewBox: "0 0 100 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
            fill: "currentFill"
          }
        )
      ]
    }
  );
}

function NewInput(props) {
  const [select, setSelect] = useState(null);
  const [focused, setFocused] = useState(false);
  const [hoveringBadge, setHoveringBadge] = useState(false);
  const initial = props.initialValue || "";
  const [inputValue, setInputValue] = useState(
    props.mask ? props.mask(initial) : initial
  );
  const [selectValue, setSelectValue] = useState("");
  useEffect(() => props.report(props.id, inputValue), []);
  const shouldHang = (
    /* the label should stay lifted when:
        1. the input is being focused
        2. the input is not empty
        3. this input is supposed to have a select, but it didn't rendered yet. */
    focused || inputValue.length > 0 || props.select && !select
  );
  const valid = useMemo(
    () => props.validate ? props.validate(inputValue) : true,
    [inputValue]
  );
  const empty = inputValue.length == 0;
  function updateInputValue(raw) {
    const masked = props.mask ? props.mask(raw) : raw;
    props.report(props.id, masked);
    setInputValue(masked);
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "bg-white cursor-text rounded border w-full h-fit px-2 py-1 flex items-center",
        focused ? "border-blue-500" : valid || empty ? "" : "border-red-500"
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "relative flex flex-col justify-center duration-200 w-full",
              shouldHang ? "pt-4" : "py-2"
            ),
            children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  className: cn(
                    "absolute leading-none duration-200 pointer-events-none",
                    shouldHang ? "top-0 left-0 text-xs" : `top-1/2 -translate-y-1/2`,
                    focused ? "text-blue-500" : valid || empty ? "text-zinc-500" : "text-red-500"
                  ),
                  style: shouldHang ? {} : { left: (select?.offsetWidth || 0) + 8 },
                  children: props.name
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-center items-center w-full", children: [
                props.select && /* @__PURE__ */ jsx(
                  "select",
                  {
                    ref: (element) => setSelect(element),
                    value: selectValue,
                    onChange: (e) => setSelectValue(e.target.value),
                    className: "h-full px-2 bg-transparent text-gray-500",
                    children: props.select.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.name }, option.value))
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    onFocus: () => setFocused(true),
                    onBlur: () => setFocused(false),
                    value: inputValue,
                    onChange: (e) => updateInputValue(e.target.value),
                    className: "w-full h-full outline-none bg-transparent text-gray-800"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            onMouseEnter: () => setHoveringBadge(true),
            onMouseLeave: () => setHoveringBadge(false),
            onTouchStart: () => setHoveringBadge(true),
            onTouchEnd: () => setHoveringBadge(false),
            className: "cursor-default relative h-fit flex justify-center items-center",
            children: [
              props.badgeTooltip && hoveringBadge && /* @__PURE__ */ jsx("div", { className: "text-center w-max max-w-60 text-sm right-0 -top-2 -translate-y-full px-2 py-1 text-white bg-zinc-800 rounded-md absolute", children: props.badgeTooltip }),
              props.badge ? props.badge : !valid && !focused && !empty && /* @__PURE__ */ jsx(IconError, { className: "" })
            ]
          }
        )
      ]
    }
  );
}

function NewSubmit(props) {
  const [loading, setLoading] = useState(false);
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: async () => {
        setLoading(true);
        await props.onClick();
        setLoading(false);
      },
      className: cn(
        "flex justify-center items-center",
        "w-full rounded bg-[#46c900] p-4 text-white text-lg font-semibold hover:opacity-75",
        loading && "cursor-not-allowed pointer-events-none opacity-75"
      ),
      children: loading ? /* @__PURE__ */ jsx(Spinner, { className: "text-green-300" }) : props.children
    }
  );
}

function TabOption({ name, selected, Icon, onClick }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick,
      className: cn(
        "relative flex w-full items-center justify-center px-4 py-4",
        "cursor-pointer rounded border shadow hover:border",
        "border-zinc-200 hover:border-black",
        selected && "border-blue-500 text-blue-500 hover:border-blue-500"
      ),
      children: [
        /* @__PURE__ */ jsx(Icon, {}),
        selected && /* @__PURE__ */ jsx(BadgeCorrect, {}),
        /* @__PURE__ */ jsx("span", { className: "leading-none", children: name })
      ]
    }
  );
}
function Tab(props) {
  const current = props.options[props.selected];
  useEffect(() => props.report("tab", props.selected), []);
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: props.options.map((option, i) => /* @__PURE__ */ jsx(
      TabOption,
      {
        ...option,
        onClick: () => {
          props.setSelected(i);
          props.report("tab", i);
        },
        selected: props.selected == i
      },
      option.name
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(current.View, {}) })
  ] });
}

const phoneValidator = {
  mask(value) {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").replace(/(.{15})(.)/, "$1");
  },
  validate(value) {
    return value.length == 15;
  }
};
const cardNumberValidator = {
  mask(value) {
    return value.replace(/\D/g, "").replace(/(\d{4})(\d)/, "$1 $2").replace(/(\d{4})(\d)/, "$1 $2").replace(/(\d{4})(\d)/, "$1 $2").replace(/(.{19})(.)/, "$1");
  },
  validate(value) {
    return CC.number(value).isValid;
  }
};
const cpfValidator = {
  mask(value) {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1-$2").replace(/(.{14})(.)/, "$1");
  },
  validate(value) {
    return CPF.validate(value);
  }
};
const emailValidator = {
  mask(value) {
    return value.slice(0, 75);
  },
  validate(value) {
    return new RegExp(/[a-zA-Z0-9._]+@.{5,7}\..{3}/g).test(value);
  }
};
const validators = {
  email: emailValidator,
  cpf: cpfValidator,
  phone: phoneValidator,
  cardNumber: cardNumberValidator
};

async function createPIXPayment(payload) {
  const response = await fetch("/api/pix", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return await response.json();
}
async function createCardPayment(payload) {
  const MP = new MercadoPago("TEST-3ad4df97-7039-4672-bc05-dbab6c804b79");
  const token = await MP.createCardToken({
    cardNumber: payload.card_number.replace(/\D/g, ""),
    cardholderName: payload.payer_name,
    cardExpirationMonth: payload.card_month,
    cardExpirationYear: payload.card_year,
    securityCode: payload.card_cvv,
    identificationType: "CPF",
    identificationNumber: payload.payer_cpf.replace(/\D/g, "")
  });
  console.log("generated card token:", token);
  const response = await fetch("/api/card", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      ...payload,
      card_token_id: token.id
    })
  });
  return await response.json();
}

function NewSelect(props) {
  const [focused, setFocused] = useState(false);
  const [selectValue, setSelectValue] = useState(props.initialValue || "");
  useEffect(() => props.report(props.id, selectValue.toString()), []);
  const [hoveringBadge, setHoveringBadge] = useState(false);
  const shouldHang = (
    /* the label should stay lifted when:
        1. the input is being focused
        2. the input is not empty */
    focused || selectValue.toString().length > 0
  );
  const valid = selectValue.toString().length > 0;
  const empty = selectValue.toString() == "";
  function updateSelectValue(raw) {
    setSelectValue(raw);
    props.report(props.id, raw);
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "bg-white cursor-text rounded border w-full h-fit px-2 py-1 flex items-center",
        focused ? "border-blue-500" : valid || empty ? "" : "border-red-500"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col justify-center duration-200 w-full", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              className: cn(
                "absolute leading-none duration-200 pointer-events-none",
                shouldHang ? "top-0 left-0 text-xs" : `top-1/2 -translate-y-1/2`,
                focused ? "text-blue-500" : valid || empty ? "text-zinc-500" : "text-red-500"
              ),
              children: props.name
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2 justify-center items-center w-full", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: selectValue,
              onFocus: () => setFocused(true),
              onBlur: () => setFocused(false),
              onChange: (e) => updateSelectValue(e.target.value),
              className: cn(
                "w-full h-full py-2 bg-transparent text-gray-800",
                shouldHang ? "pt-4 pb-0" : ""
              ),
              children: [
                !props.initialValue && /* @__PURE__ */ jsx("option", { value: "" }, "default"),
                props.options.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.name }, option.value))
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            onMouseEnter: () => setHoveringBadge(true),
            onMouseLeave: () => setHoveringBadge(false),
            onTouchStart: () => setHoveringBadge(true),
            onTouchEnd: () => setHoveringBadge(false),
            className: "cursor-default relative h-fit flex justify-center items-center",
            children: [
              props.badgeTooltip && hoveringBadge && /* @__PURE__ */ jsx("div", { className: "text-center w-max max-w-60 text-sm right-0 -top-2 -translate-y-full px-2 py-1 text-white bg-zinc-800 rounded-md absolute", children: props.badgeTooltip }),
              props.badge && props.badge
            ]
          }
        )
      ]
    }
  );
}

function CardView(props) {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "md:p-4 space-y-2 md:border md:rounded md:bg-zinc-50", children: [
      /* @__PURE__ */ jsx(
        NewInput,
        {
          report: props.receive,
          id: "card_number",
          mask: validators.cardNumber.mask,
          validate: validators.cardNumber.validate,
          name: "Número de Cartão de Crédito",
          badge: /* @__PURE__ */ jsx(IconSecurity, {}),
          initialValue: "",
          badgeTooltip: "Nós protegemos seus dados de pagamento usando encriptação para prover segurança no nível de bancos."
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap md:flex-nowrap gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 w-full", children: [
          /* @__PURE__ */ jsx(
            NewSelect,
            {
              report: props.receive,
              id: "card_month",
              initialValue: "",
              name: "Mês",
              options: Array.from({ length: 12 }, (_, i) => ({
                name: alwaysTwo(i + 1),
                value: alwaysTwo(i + 1)
              }))
            }
          ),
          /* @__PURE__ */ jsx(
            NewSelect,
            {
              report: props.receive,
              id: "card_year",
              name: "Ano",
              initialValue: "",
              options: Array.from({ length: 12 }, (_, i) => ({
                name: currentYear + i,
                value: currentYear + i
              }))
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          NewInput,
          {
            report: props.receive,
            id: "card_cvv",
            mask: (value) => value.slice(0, 4).replace(/\D/g, ""),
            validate: (value) => value.length > 2,
            name: "Cód. segurança",
            initialValue: "",
            badge: /* @__PURE__ */ jsx(IconDoubt, {}),
            badgeTooltip: "O CVV/Cód. segurança é o código de 3 ou 4 dígitos que aparece atrás do seu cartão"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        NewSelect,
        {
          report: props.receive,
          id: "installments",
          name: "Parcelas",
          initialValue: 1,
          options: Array.from({ length: 12 }, (_, i) => {
            const times = 12 - i;
            if (times == 1) {
              return {
                name: "R$" + props.product.price.toFixed(2).replace(".", ","),
                value: times
              };
            }
            const installmentPrice = applyTax(
              props.product.price,
              2.9956 / 100,
              times
            ).toFixed(2).replace(".", ",");
            return {
              name: `${times}x de R$ ${installmentPrice}`,
              value: times
            };
          })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-2 p-2 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "brightness-150 flex gap-2 items-center mx-[2.5px]", children: [
        /* @__PURE__ */ jsx("input", { checked: true, readOnly: true, type: "checkbox" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Salvar dados para as próximas compras" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center text-gray-500", children: [
        /* @__PURE__ */ jsx(IconSecurity, { className: "w-[20px] h-[20px]" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Nós protegemos seus dados de pagamento usando encriptação para prover segurança no nível de bancos." })
      ] })
    ] })
  ] });
}
function BoletoView({ product }) {
  return /* @__PURE__ */ jsx("div", { className: "md:px-4 md:py-3 bg-zinc-50 md:rounded md:border", children: /* @__PURE__ */ jsxs("div", { className: "p-4 bg-zinc-100 rounded", children: [
    /* @__PURE__ */ jsx("b", { children: "Informações sobre o pagamento via boleto:" }),
    /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside my-4", children: [
      /* @__PURE__ */ jsxs("li", { className: "leading-relaxed", children: [
        "Valor à vista: ",
        /* @__PURE__ */ jsx("b", { children: money(product.price) }),
        "."
      ] }),
      /* @__PURE__ */ jsx("li", { className: "leading-relaxed", children: "Não podemos parcelar Boleto." }),
      /* @__PURE__ */ jsx("li", { className: "leading-relaxed", children: "Pode levar até 2 dias úteis para compensar." })
    ] })
  ] }) });
}
function PixView({ product }) {
  return /* @__PURE__ */ jsx("div", { className: "md:px-4 md:py-3 bg-zinc-50 md:rounded md:border", children: /* @__PURE__ */ jsxs("div", { className: "bg-zinc-100 rounded p-4", children: [
    /* @__PURE__ */ jsx("b", { children: "Informações sobre o pagamento via pix:" }),
    /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside my-4", children: [
      /* @__PURE__ */ jsxs("li", { className: "leading-relaxed", children: [
        "Valor à vista: ",
        /* @__PURE__ */ jsx("b", { children: money(product.price) }),
        "."
      ] }),
      /* @__PURE__ */ jsx("li", { className: "leading-relaxed", children: "Liberação imediata!" }),
      /* @__PURE__ */ jsx("li", { className: "leading-relaxed", children: "É simples, só usar o aplicativo de seu banco para pagar PIX." }),
      /* @__PURE__ */ jsx("li", { className: "leading-relaxed", children: "Super seguro. O pagamento PIX foi desenvolvido pelo Banco Central para facilitar pagamentos." })
    ] })
  ] }) });
}

function validateForm(form, flags) {
  if (form.name.length < 10) return;
  if (!validators.email.validate(form.email)) return;
  if (!validators.cpf.validate(form.cpf)) return;
  if (flags.check_card_infos) {
    if (!validators.cardNumber.validate(form.card_number)) return;
    if (form.card_cvv.length < 3) return;
  }
  return true;
}
function ScreenPayment(props) {
  const [tabIndex, setTabIndex] = useState(0);
  async function submit() {
    const form = props.formValuesRef.current;
    const valid = validateForm(form, {
      check_card_infos: form.tab == 0
    });
    if (!valid) return window.scrollTo({ top: 0, behavior: "smooth" });
    if (form.tab == 0) {
      const payment = await createCardPayment({
        payer_name: form.name,
        payer_email: form.email,
        payer_cpf: form.cpf,
        card_number: form.card_number,
        card_month: form.card_month,
        card_year: form.card_year,
        card_cvv: form.card_cvv,
        product_id: props.product.id
      });
      console.log("[SUBMIT] card payment got:", payment);
      props.paymentDataRef.current = payment;
      props.setScreen("pix_confirming");
    } else if (form.tab == 2) {
      const payment = await createPIXPayment({
        payer_name: form.name,
        payer_email: form.email,
        payer_cpf: form.cpf,
        product_id: props.product.id
      });
      props.paymentDataRef.current = payment;
      props.setScreen("pix_scanning");
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 w-[672px] font-opensans", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-4", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "max-w-[128px] max-h-[128px] rounded",
          src: props.product.image
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold", children: props.product.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 bg-white rounded p-2 md:p-6 border border-zinc-300 shadow", children: [
      /* @__PURE__ */ jsx(
        NewInput,
        {
          report: props.receiveFormValues,
          id: "name",
          name: "Nome completo",
          mask: (value) => value.slice(0, 125),
          validate: (value) => value.length > 10,
          initialValue: ""
        }
      ),
      /* @__PURE__ */ jsx(
        NewInput,
        {
          report: props.receiveFormValues,
          id: "email",
          initialValue: "",
          name: "Email",
          mask: validators.email.mask,
          validate: validators.email.validate
        }
      ),
      /* @__PURE__ */ jsx(
        NewInput,
        {
          report: props.receiveFormValues,
          id: "confirm_email",
          name: "Confirmar email",
          initialValue: "",
          mask: validators.email.mask,
          validate: (x) => {
            const email = props.formValuesRef.current.email;
            return email ? email == x : true;
          }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap md:flex-nowrap gap-2 mb-6", children: [
        /* @__PURE__ */ jsx(
          NewInput,
          {
            report: props.receiveFormValues,
            initialValue: "",
            id: "cpf",
            name: "CPF",
            mask: validators.cpf.mask,
            validate: validators.cpf.validate
          }
        ),
        /* @__PURE__ */ jsx(
          NewInput,
          {
            select: [
              { name: "🇧🇷 +55", value: "brazil" },
              { name: "🇺🇸 +1", value: "usa" }
            ],
            report: props.receiveFormValues,
            id: "phone",
            initialValue: "",
            mask: validators.phone.mask,
            validate: validators.phone.validate,
            name: "Celular com DDD"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Tab,
        {
          report: props.receiveFormValues,
          selected: tabIndex,
          setSelected: setTabIndex,
          options: [
            {
              name: "Cartão",
              Icon: IconCard,
              View: () => /* @__PURE__ */ jsx(
                CardView,
                {
                  product: props.product,
                  receive: props.receiveFormValues
                }
              )
            },
            {
              name: "Boleto",
              Icon: IconBoleto,
              View: () => /* @__PURE__ */ jsx(BoletoView, { product: props.product })
            },
            {
              name: "Pix",
              Icon: IconPix,
              View: () => /* @__PURE__ */ jsx(PixView, { product: props.product })
            }
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-col items-center", children: [
        /* @__PURE__ */ jsx(NewSubmit, { onClick: submit, children: "PAGAR AGORA" }),
        /* @__PURE__ */ jsx("a", { target: "_blank", href: "https://www.kiwify.com.br", children: /* @__PURE__ */ jsx(
          "img",
          {
            width: "80",
            src: "https://assets.kiwify.com.br/extra/footer-kiwify-gray.png",
            className: "w-20 my-2"
          }
        ) }),
        /* @__PURE__ */ jsxs("select", { className: "mb-2 px-4 py-1 text-sm text-zinc-400 rounded border bg-transparent", children: [
          /* @__PURE__ */ jsx("option", { value: "brazil", children: "🇧🇷 Brasil" }),
          /* @__PURE__ */ jsx("option", { value: "intl", children: "🌎 Internacional" })
        ] }),
        bullshitFooter
      ] })
    ] })
  ] });
}
const bullshitFooter = /* @__PURE__ */ jsxs("article", { className: "opacity-50 flex flex-col space-y-1 text-[.65rem] text-gray-500 text-center", children: [
  /* @__PURE__ */ jsxs("div", { children: [
    "Ao clicar em 'Pagar Agora', eu declaro que (i) estou ciente que a Kiwify está processando essa compra em nome de",
    /* @__PURE__ */ jsx("b", { children: "Leandro de Oliveira Soares" }),
    " e que não possui responsabilidade pelo conteúdo, oferta, e nem faz controle prévio do infoproduto; (ii) que li e concordo com os ",
    /* @__PURE__ */ jsx("b", { children: "Termos de Compra" }),
    ", ",
    /* @__PURE__ */ jsx("b", { children: "Termos de Uso" }),
    ", e",
    " ",
    /* @__PURE__ */ jsx("b", { children: "Política de Privacidade" }),
    "."
  ] }),
  /* @__PURE__ */ jsx("a", { children: /* @__PURE__ */ jsx("b", { children: "Denunciar esse produto." }) }),
  /* @__PURE__ */ jsx("span", { children: "*Parcelamento com acréscimo." }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("span", { children: "Este site está protegido pelo Google reCAPTCHA." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("a", { children: /* @__PURE__ */ jsx("b", { children: "Política de Privacidade" }) }),
    " ",
    "e",
    " ",
    /* @__PURE__ */ jsx("a", { children: /* @__PURE__ */ jsx("b", { children: "Termos de Serviço" }) }),
    "."
  ] })
] });

function ScreenPixConfirming(props) {
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);
  async function checkPaymentStatus(interval) {
    const response = await fetch(
      "/api/status?id=" + props.paymentDataRef.current?.id
    );
    const result = await response.json();
    if (result.payment_status == "approved") {
      setFinished(true);
    } else if (result.payment_status == "rejected") {
      setTimeout(() => location.reload(), 5e3);
      clearInterval(interval);
      alert(
        "Seu pagamento foi recusado pelo banco, por-favor, tente novamente!"
      );
    }
  }
  useEffect(() => {
    var secondsRemaining = 120;
    const interval = setInterval(() => {
      secondsRemaining--;
      if (secondsRemaining <= 0 || finished) clearInterval(interval);
      if (timerRef.current)
        timerRef.current.innerText = prettyMinutes(secondsRemaining);
      secondsRemaining % 5 == 0 && checkPaymentStatus(interval);
    }, 1e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 w-[672px] font-opensans", children: [
    finished && /* @__PURE__ */ jsx(Confetti, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-4", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "max-w-[128px] max-h-[128px] rounded",
          src: props.product.image
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold", children: props.product.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 bg-white rounded p-4 border border-zinc-300 shadow", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("img", { className: "w-32", src: "/pix-bc-logo.webp" }) }),
      /* @__PURE__ */ jsx(
        "h3",
        {
          className: cn(
            "text-2xl text-center px-12 mt-8 font-bold",
            finished ? "text-green-500" : "text-orange-500"
          ),
          children: finished ? "Pagamento Autorizado!" : "Pagamento em análise!"
        }
      ),
      finished ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "leading-tight space-y-4 rounded border p-4 py-6 text-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Seu pagamento foi confirmado pelo banco. O acesso ao produto deverá chegar no email cadastrado nos próximos 5 minutos." }),
          " ",
          /* @__PURE__ */ jsx("p", { children: "Por-favor verifique a caixa de spam do seu email antes de entrar em contato com a equipe de suporte ao cliente." })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center text-lg text-gray-700", children: [
            "ID: ",
            props.paymentDataRef.current?.id
          ] }),
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:suporte@kiwify.com.br",
              className: "flex hover:no-underline relative justify-center w-full text-blue-700 underline font-bold p-3 text-base rounded text-center",
              children: "FALE COM O SUPORTE"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex text-xl font-bold border-t flex-row p-4 mt-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: "TOTAL" }),
          " ",
          /* @__PURE__ */ jsx("div", { className: "flex-1 text-right", children: money(props.product.price) })
        ] }) })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-200 p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-lg text-center", children: "Tempo restante para aprovação:" }),
          " ",
          /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center", children: /* @__PURE__ */ jsx("div", { className: "border p-2 w-full text-xl text-center shadow-inner font-bold rounded-lg bg-white", children: /* @__PURE__ */ jsx("span", { ref: timerRef, children: "00:00" }) }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "rounded border p-4 py-6 text-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Estamos aguardando a confirmação do pagamento pelo banco. Isso pode levar 1-2 minutos." }),
          " ",
          /* @__PURE__ */ jsx("p", { children: "Quando o pagamento for identificado, essa tela atualizará automaticamente, e você também vai receber um email." })
        ] }) }),
        props.paymentDataRef.current?.payment_method_id == "pix" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-center text-lg text-gray-700", children: "Ainda não fez o pagamento?" }),
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              onClick: () => props.setScreen("pix_scanning"),
              className: "cursor-pointer flex hover:no-underline relative justify-center w-full text-blue-700 underline font-bold p-3 text-base rounded text-center",
              children: "PAGUE AGORA COM PIX"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex text-xl font-bold border-t flex-row p-4 mt-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: "TOTAL" }),
          " ",
          /* @__PURE__ */ jsx("div", { className: "flex-1 text-right", children: money(props.product.price) })
        ] }) })
      ] })
    ] })
  ] });
}

function ScreenPixScanning(props) {
  const pix_key = props.paymentDataRef.current?.point_of_interaction.transaction_data.qr_code;
  const pix_qrcode = props.paymentDataRef.current?.point_of_interaction.transaction_data.qr_code_base64;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 w-[672px] font-opensans", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-4", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "max-w-[128px] max-h-[128px] rounded",
          src: props.product.image
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold", children: props.product.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 bg-white rounded p-4 border border-zinc-300 shadow", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("img", { className: "w-32", src: "/pix-bc-logo.webp" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl text-center px-12 mt-8 font-bold text-green-600", children: "Pedido gerado! Agora finalize o pagamento" }),
      /* @__PURE__ */ jsxs("div", { className: "block text-black text-left px-12 mt-8", children: [
        "1. Abra o app do seu banco e entre na opção ",
        /* @__PURE__ */ jsx("b", { children: "Pix" }),
        ". ",
        /* @__PURE__ */ jsx("br", {}),
        "2. Escolha a opção ",
        /* @__PURE__ */ jsx("b", { children: "Pagar / Pix copia e cola" }),
        ". ",
        /* @__PURE__ */ jsx("br", {}),
        "3. Escaneie o QR code. Se preferir, copie e cole o código. ",
        /* @__PURE__ */ jsx("br", {}),
        "4. Depois, confirme o pagamento."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center text-black mt-2", children: "A aprovação leva no máximo 2 minutos." }),
      /* @__PURE__ */ jsxs("div", { className: "text-center flex flex-col items-center justify-center w-full px-4 md:px-16 mt-8", children: [
        pix_qrcode && /* @__PURE__ */ jsx(
          "img",
          {
            className: "w-1/3",
            src: "data:image/jpeg;base64," + pix_qrcode
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            onClick: () => pix_key && navigator.clipboard.writeText(pix_key),
            className: "cursor-pointer flex relative justify-center w-full md:w-3/4 border text-white bg-gray-800 font-bold p-3 text-sm rounded text-center",
            children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center", children: [
              /* @__PURE__ */ jsx(IconCopy, {}),
              "COPIAR CÓDIGO PIX"
            ] }) })
          }
        ),
        /* @__PURE__ */ jsx("a", { className: "flex md:hidden relative text-gray-800 justify-center w-full md:w-3/4 border border-gray-800 font-bold p-3 text-sm rounded text-center mt-2", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center", children: [
          /* @__PURE__ */ jsx(IconQRCode, {}),
          "MOSTRAR O QR Code"
        ] }) }),
        /* @__PURE__ */ jsx(
          "a",
          {
            onClick: () => props.setScreen("pix_confirming"),
            className: "flex cursor-pointer underline hover:no-underline relative justify-center w-full md:w-3/4 text-blue-700 font-bold p-3 text-base rounded text-center",
            children: "JÁ FIZ O PAGAMENTO"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex text-xl font-bold border-t flex-row p-4 mt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: "TOTAL" }),
        " ",
        /* @__PURE__ */ jsx("div", { className: "flex-1 text-right", children: money(props.product.price) })
      ] }) })
    ] })
  ] });
}

function Checkout(props) {
  const [screen, setScreen] = useState("payment");
  const formValuesRef = useRef({});
  const paymentDataRef = useRef();
  const receiveFormValues = (field, value) => {
    formValuesRef.current[field] = value;
  };
  const screens = {
    payment: ScreenPayment,
    pix_scanning: ScreenPixScanning,
    pix_confirming: ScreenPixConfirming
  };
  const CurrentScreen = screens[screen];
  return /* @__PURE__ */ jsx(
    CurrentScreen,
    {
      setScreen,
      product: props.product,
      formValuesRef,
      paymentDataRef,
      receiveFormValues
    }
  );
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const product = products.find((x) => x.id == id);
  if (!product && true) Astro2.redirect("https://kiwify.com.br");
  const foundProduct = product;
  return renderTemplate(_a || (_a = __template(["", ' <script src="https://sdk.mercadopago.com/js/v2"></script>'])), renderComponent($$result, "CenteredLayout", $$CenteredLayout, {}, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Checkout", Checkout, { "client:load": true, "product": foundProduct, "client:component-hydration": "load", "client:component-path": "/home/user/telafake/src/components/checkout", "client:component-export": "default" })} `, "head": ($$result2) => renderTemplate`<title>${foundProduct.name}</title>` }));
}, "/home/user/telafake/src/pages/[id].astro", void 0);
const $$file = "/home/user/telafake/src/pages/[id].astro";
const $$url = "/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
