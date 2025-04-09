// tipos primitivos
let valor: number = 10;
let texto: string = '';
let isTruth: boolean = true;
let anything: any = 'are you ok?';
anything = 1;


// arrays
const lista: number[] = [];
lista.push(1, 2, 3, 4, 5);
// lista.push('a', 'b', 'c'); // Argument of type 'string' is not assignable to parameter of type 'number'.


// tipos personalizados (alias)
type Transacao = {
    tipoTransacao: string;
    data: Date;
    valor: number;
}

const novaTransacao: Transacao = {
    tipoTransacao: '',
    data: new Date(),
    valor: 0
}
