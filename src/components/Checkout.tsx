import Input from '../components/Input';
import Tab from '../components/Tab';
import { IconBoleto, IconCard, IconPix, IconSecurity } from './Icons';

function CardView() {
	return <div className='p-4'>
		<Input name='Número de Cartão de Crédito' formatter='ccnumber'>
			<IconSecurity className="" />
		</Input>
	</div>
}

function BoletoView() {
	return <div className='p-4 bg-zinc-100 rounded'>
		<b>Informações sobre o pagamento via boleto:</b>
		<ul className='list-disc list-inside my-4'>
			<li className='leading-relaxed'>Valor à vista: <b>R$ 97,00</b>.</li>
			<li className='leading-relaxed'>Não podemos parcelar Boleto.</li>
			<li className='leading-relaxed'>Pode levar até 2 dias úteis para compensar.</li>
		</ul>
	</div>
}

function PixView() {
	return <div className='p-4 bg-zinc-100 rounded'>
		<b>Informações sobre o pagamento via pix:</b>
		<ul className='list-disc list-inside my-4'>
			<li className='leading-relaxed'>Valor à vista: <b>R$ 97,00</b>.</li>
			<li className='leading-relaxed'>Liberação imediata!</li>
			<li className='leading-relaxed'>É simples, só usar o aplicativo de seu banco para pagar PIX.</li>
			<li className='leading-relaxed'>Super seguro. O pagamento PIX foi desenvolvido pelo Banco Central para facilitar pagamentos.</li>
		</ul>
	</div>
}

interface CheckoutProps {
	name: string;
	image: string;
}

export default function Checkout({ name, image }: CheckoutProps) {
	return <div className="flex flex-col gap-4 w-[700px]">
		{/* The product headline infos */}
		<div className="flex items-center gap-4">
			<img className="w-40 aspect-square rounded" src={image} />
			<span className="text-2xl font-bold">{name}</span>
		</div>
		{/* The billing and payment infos */}
		<div className="flex flex-col gap-2 bg-white rounded p-4 border border-zinc-300 shadow">
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

			<div className='flex flex-col items-center'>
				<button className='my-4 w-full rounded bg-[#46c900] p-4 text-white text-lg font-semibold hover:opacity-75'>PAGAR AGORA</button>
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
