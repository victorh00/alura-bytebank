import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import Conta from "../types/Conta.js";
import infoComponent from "./info-component.js";

const elementoForm = document.querySelector(".block-nova-transacao form") as HTMLFormElement;
elementoForm.addEventListener('submit', (event) => {
    try {
        event.preventDefault();
        if (!elementoForm.checkValidity()) {
            alert("Por favor, preencha todos os campos da transação.");
            return;
        }

        const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao') as HTMLSelectElement;
        const inputValor = elementoForm.querySelector('#valor') as HTMLInputElement;
        const inputData = elementoForm.querySelector('#data') as HTMLInputElement;

        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        let data: Date = new Date(inputData.value);
        let valor: number = inputValor.valueAsNumber;

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        }

        Conta.registrarTransacao(novaTransacao);
        infoComponent.atualizar();
        elementoForm.reset();
    } catch (erro) {
        alert(erro.message);
    }
});