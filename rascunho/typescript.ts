// // tipos primitivos
// let valor: number = 10;
// let texto: string = '';
// let isTruth: boolean = true;
// let anything: any = 'are you ok?';
// anything = 1;


// // arrays
// const lista: number[] = [];
// lista.push(1, 2, 3, 4, 5);
// // lista.push('a', 'b', 'c'); // Argument of type 'string' is not assignable to parameter of type 'number'.


// // tipos personalizados (alias)
// type Transacao = {
//     tipoTransacao: TipoTransacao; // string;
//     data: Date;
//     valor: number;
// }

// // enums: uso chave para obter algum valor correto/fixo/constante. código mais modular.
// enum TipoTransacao {
//     DEPOSITO = 'Depósito', 
//     TRANSFERENCIA = 'Transferência',
//     PGTO_BOLETO = 'Pagamento de Boleto'
// }

// const novaTransacao: Transacao = {
//     tipoTransacao: TipoTransacao.DEPOSITO,  // Type '""' is not assignable to type 'TipoTransacao'.ts(2322)
//     data: new Date(),
//     valor: 0
// }
