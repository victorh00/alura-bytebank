import { TipoTransacao } from "../types/TipoTransacao.js";
import { getSaldo, setSaldo } from "./saldo-component.js";
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
    let saldo = getSaldo();
    if (tipoTransacao == TipoTransacao.DEPOSITO) {
        saldo += valor;
    }
    else if (tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PGTO_BOLETO) {
        saldo -= valor;
    }
    else {
        alert('Selecione uma transação válida.');
        return;
    }
    setSaldo(saldo);
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoForm.reset();
});
