import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import { getSaldo, setSaldo } from "./saldo-component.js";

const elementoForm = document.querySelector(".block-nova-transacao form") as HTMLFormElement;
elementoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(!elementoForm.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação.");
        return;
    }
    const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao') as HTMLSelectElement;
    const inputValor = elementoForm.querySelector('#valor') as HTMLInputElement;
    const inputData = elementoForm.querySelector('#data') as HTMLInputElement;

    let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
    let data: Date = new Date(inputData.value);
    let valor: number = inputValor.valueAsNumber;
    let saldo: number = getSaldo();

    if(tipoTransacao == TipoTransacao.DEPOSITO) {
        saldo += valor;
    } else if (tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PGTO_BOLETO) {
        saldo -= valor;
    } else {
        alert('Selecione uma transação válida.');
        return;
    }

    setSaldo(saldo);

    const novaTransacao: Transacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    }
    console.log(novaTransacao);
    elementoForm.reset();
});