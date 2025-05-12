/* Abstrair entradas e saídas da localStorage. Poderia ser usado pra concentrar os critérios de acesso, os tipos de tratamento etc*/
export class Armazenador {
    constructor() { }
    ;
    static salvar(chave, valor) {
        const valorComoString = JSON.stringify(valor);
        localStorage.setItem(chave, valorComoString);
    }
    static obter(chave, reviver) {
        const valor = localStorage.getItem(chave);
        if (valor === null) {
            return null;
        }
        ;
        if (reviver) {
            return JSON.parse(chave, reviver);
        }
        ;
        return JSON.parse(valor);
    }
}
