// let saldo = 3000;

// const elementoSaldo = document.querySelector(".saldo-valor .valor");
// elementoSaldo.textContent = 3000;

// const elementoForm = document.querySelector(".block-nova-transacao form");
// elementoForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     if(!elementoForm.checkValidity()) {
//         alert("Por favor, preencha todos os campos da transação.");
//         return;
//     }
//     const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao');
//     const inputValor = elementoForm.querySelector('#valor');
//     const inputData = elementoForm.querySelector('#data');

//     let tipoTransacao = inputTipoTransacao.value;
//     let valor = inputValor.value;
//     let data = inputData.value;

//     if(tipoTransacao == 'Depósito') {
//         saldo += valor;
//     } else if (tipoTransacao == 'Transferência' || tipoTransacao == 'Pagamento de Boleto') {
//         saldo -= valor;
//     } else {
//         alert('Selecione uma transação válida.');
//         return;
//     }

//     elementoSaldo.textContent = saldo;

//     const novaTransacao = {
//         tipoTransacao: tipoTransacao,
//         valor: valor,
//         data: data
//     }
//     console.log(novaTransacao);
// });