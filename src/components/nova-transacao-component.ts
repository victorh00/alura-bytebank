import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
import { formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import ExtratoComponent from "./extrato-component.js";

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
        let data: Date = new Date(inputData.value); // cria data em UTC local
        let valor: number = inputValor.valueAsNumber;
             
        data.setHours(data.getHours() + 3); // converte para UTC-3 brasilia

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        }

        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoForm.reset();

    } catch (erro) {
        alert(erro.message);
    }
});