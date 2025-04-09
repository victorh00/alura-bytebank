import Conta from "../types/Conta.js";
import infoComponent from "./info-component.js";
const elementoForm = document.querySelector(".block-nova-transacao form");
elementoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!elementoForm.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação.");
        return;
    }
    const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao');
    const inputValor = elementoForm.querySelector('#valor');
    const inputData = elementoForm.querySelector('#data');
    let tipoTransacao = inputTipoTransacao.value;
    let data = new Date(inputData.value);
    let valor = inputValor.valueAsNumber;
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    Conta.registrarTransacao(novaTransacao);
    infoComponent.atualizar();
    elementoForm.reset();
});
