"use strict";
let saldo = 3000;
const elementoSaldo = document.querySelector(".saldo-valor .valor");
if (elementoSaldo != null) {
    elementoSaldo.textContent = saldo.toString();
}
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
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    if (tipoTransacao == 'Depósito') {
        saldo += valor;
    }
    else if (tipoTransacao == 'Transferência' || tipoTransacao == 'Pagamento de Boleto') {
        saldo -= valor;
    }
    else {
        alert('Selecione uma transação válida.');
        return;
    }
    elementoSaldo.textContent = saldo.toString();
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoForm.reset();
});
