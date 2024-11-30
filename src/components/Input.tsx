import { useState } from "react"
import { twMerge as cn } from "tailwind-merge"
import CPF from "cpf-check";

interface Props {
    name: string; formatter: keyof typeof FORMATTERS;
}

const maskCPF = (value: string) => {
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

const maskEmail = (value: string) => {
    console.log(value)
    return value
}

const emailREGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

const FORMATTERS = {
    cpf: {
        mask: maskCPF, validate: (v: string) => CPF.validate(v)
    },
    email: {
        mask: maskEmail, validate: (v:string) => emailREGEX.test(v)
    },
    empty: {
        mask: (v: string) => v, validate: (v: string) => v.replaceAll(` `, ``).length > 0
    }
}

export default function Input({ name, formatter }: Props) {
    const [content, setContent] = useState(``);
    const [error, setError] = useState(``);

    const f = FORMATTERS[formatter];

    const transform = (value: string) => {
        const masked = f.mask(value);
        const valid = f.validate(masked);

        setContent(masked);
        setError(valid ? `` : `${name} inválido`);
    }

    return <div className="relative w-full">
        <input
            value={content} type="text"
            onChange={e => transform(e.target.value)}
            className={cn(
                "px-3 py-2 pt-4 w-full border rounded peer outline-none",
                error ? `border-red-600` : ``
            )}
        />

        <label className={cn(
            "duration-100 text-zinc-500 left-3 transform -translate-y-1/2 absolute pointer-events-none peer-focus:text-xs peer-focus:top-3",
            content == `` ? `top-[50%]` : `text-xs top-3`,
            error ? `text-red-600` : ``
        )}>
            {error ? error : name}
        </label>

        {error && <IconError className="absolute right-3 top-[50%] transform -translate-y-1/2" />}
    </div>
}

function IconError({ className }: { className: string }) {
    return <svg className={cn("w-5 h-5 text-red-600", className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z"></path></svg>
}