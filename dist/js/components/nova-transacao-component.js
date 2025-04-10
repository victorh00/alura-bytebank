import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
import ExtratoComponent from "./extrato-component.js";
const elementoForm = document.querySelector(".block-nova-transacao form");
elementoForm.addEventListener('submit', (event) => {
    try {
        event.preventDefault();
        if (!elementoForm.checkValidity()) {
            alert("Por favor, preencha todos os campos da transação.");
            return;
        }
        const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao');
        const inputValor = elementoForm.querySelector('#valor');
        const inputData = elementoForm.querySelector('#data');
        let tipoTransacao = inputTipoTransacao.value;
        let data = new Date(inputData.value); // cria data em UTC local
        let valor = inputValor.valueAsNumber;
        data.setHours(data.getHours() + 3); // converte para UTC-3 brasilia
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        };
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoForm.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});
