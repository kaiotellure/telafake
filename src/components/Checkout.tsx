
import Input from '../components/Input';
import Tab from '../components/Tab';

import { IconBoleto, IconCard, IconDoubt, IconPix, IconSecurity } from './Icons';

function CardView() {
	const currentYear = new Date().getFullYear();

	return <div>
		<div className='p-4 space-y-2 border rounded bg-zinc-50'>
			<Input name='Número de Cartão de Crédito' max={19} formatter='cc'>
				<IconSecurity className="absolute right-3 top-[50%] transform -translate-y-1/2" />
			</Input>
			<div className='flex gap-2'>
				<select className='w-5/12 px-4 py-2 rounded border bg-white text-zinc-500'>
					<option value="" disabled selected>Mês</option>
					{Array.from({ length: 12 }, (_, i) => (
						<option value={i + 1}>{i + 1}</option>
					))}
				</select>

				<select className='w-7/12 px-4 py-2 rounded border bg-white text-zinc-500'>
					<option value="" disabled selected>Ano</option>
					{Array.from({ length: 12 }, (_, i) => (
						<option value={currentYear + i}>{currentYear + i}</option>
					))}
				</select>

				<Input name='Cód. segurança' formatter='cvv' max={4}>
					<IconDoubt className="absolute right-3 top-[50%] transform -translate-y-1/2" />
				</Input>
			</div>

			<select className='w-full px-4 py-2 rounded border bg-white text-zinc-700'>
				{Array.from({ length: 12 }, (_, i) => {

					const times = 12 - i;

					if (times == 1) {
						return <option value={times}>
							R$ {(97).toFixed(2).replace('.', ',')}
						</option>
					}

					return <option selected={times == 12} value={times}>
						{times}x de R$ {price(97, 2.9956 / 100, times).toFixed(2).replace('.', ',')}
					</option>
				})}
			</select>
		</div>

		<div className='mt-2 p-2 flex flex-col gap-4'>
			<div className='flex gap-2 items-center mx-[2.5px]'>
				<input checked type="checkbox" />
				<span className='text-sm'>Salvar dados para as próximas compras</span>
			</div>
			<div className='flex gap-2 items-center text-gray-500'>
				<IconSecurity />
				<span className='text-xs'>Nós protegemos seus dados de pagamento usando encriptação para prover segurança no nível de bancos.</span>
			</div>
		</div>
	</div>
}

function price(total: number, tax: number, slices: number) {
	return total * tax / (1 - (1 + tax) ** -slices)
}

function BoletoView() {
	return <div className='p-4 bg-zinc-50 rounded border'>
		<div className='p-4 bg-zinc-100 border rounded'>
			<b>Informações sobre o pagamento via boleto:</b>
			<ul className='list-disc list-inside my-4'>
				<li className='leading-relaxed'>Valor à vista: <b>R$ 97,00</b>.</li>
				<li className='leading-relaxed'>Não podemos parcelar Boleto.</li>
				<li className='leading-relaxed'>Pode levar até 2 dias úteis para compensar.</li>
			</ul>
		</div>
	</div>
}

function PixView() {
	return <div className='p-4 bg-zinc-50 rounded border'>
		<div className='p-4 bg-zinc-100 rounded'>
			<b>Informações sobre o pagamento via pix:</b>
			<ul className='list-disc list-inside my-4'>
				<li className='leading-relaxed'>Valor à vista: <b>R$ 97,00</b>.</li>
				<li className='leading-relaxed'>Liberação imediata!</li>
				<li className='leading-relaxed'>É simples, só usar o aplicativo de seu banco para pagar PIX.</li>
				<li className='leading-relaxed'>Super seguro. O pagamento PIX foi desenvolvido pelo Banco Central para facilitar pagamentos.</li>
			</ul>
		</div>
	</div>
}

interface CheckoutProps {
	name: string;
	image: string;
}

export default function Checkout({ name, image }: CheckoutProps) {
	return <div className="flex flex-col gap-8 w-[700px] font-opensans">
		{/* The product headline infos */}
		<div className="flex items-center gap-4 px-4">
			<img className="max-w-[128px] max-h-[128px] rounded" src={image} />
			<span className="text-2xl font-bold">{name}</span>
		</div>
		{/* The billing and payment infos */}
		<div className="flex flex-col gap-2 bg-white rounded p-6 border border-zinc-300 shadow">
			<Input name='Nome completo' formatter='empty' />
			<Input name='Email' formatter='email' />
			<Input name='Confirmar email' formatter='email' />
			<div className="flex gap-2 mb-6">
				<Input name='CPF' formatter='cpf' />
				<Input name='Celular com DDD' formatter='empty' />
			</div>
			<Tab options={[
				{ name: "Cartão", Icon: IconCard, View: CardView },
				{ name: "Boleto", Icon: IconBoleto, View: BoletoView },
				{ name: "Pix", Icon: IconPix, View: PixView }
			]} />

			<div className='flex flex-col gap-2 flex-col items-center'>
				<button className='w-full rounded bg-[#46c900] p-4 text-white text-lg font-semibold hover:opacity-75'>PAGAR AGORA</button>
				<a target='_blank' href="https://www.kiwify.com.br">
					<img width="80" src="https://assets.kiwify.com.br/extra/footer-kiwify-gray.png" className="w-20 my-2"></img>
				</a>
				<select className='mb-2 px-4 py-1 text-sm text-zinc-400 rounded border bg-transparent'>
					<option value="brazil">🇧🇷 Brasil</option>
					<option value="intl">🌎 Internacional</option>
				</select>
				<article className='opacity-50 flex flex-col space-y-1 text-[.65rem] text-gray-500 text-center'>
					<div>
						Ao clicar em 'Pagar Agora', eu declaro que (i) estou ciente que a Kiwify está processando essa compra em nome de <b>Leandro de Oliveira Soares</b> e que não possui responsabilidade pelo conteúdo, oferta, e nem faz controle prévio do infoproduto; (ii) que li e concordo com os <b>Termos de Compra</b>, <b>Termos de Uso</b>, e <b>Política de Privacidade</b>.
					</div>
					<a href=""><b>Denunciar esse produto.</b></a>
					<span>*Parcelamento com acréscimo.</span>
					<div className=''>
						<span>Este site está protegido pelo Google reCAPTCHA.</span>
						<br />
						<a href=""><b>Política de Privacidade</b></a> e <a href=""><b>Termos de Serviço</b></a>.
					</div>
				</article>
			</div>
		</div>
	</div>
}
