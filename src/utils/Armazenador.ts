/* Abstrair entradas e saídas da localStorage. Poderia ser usado pra concentrar os critérios de acesso, os tipos de tratamento etc*/
export class Armazenador {
    private constructor() {};

    static salvar(chave: string, valor: any): void {
        const valorComoString = JSON.stringify(valor);
        localStorage.setItem(chave, valorComoString);
    }

    static obter(chave: string, reviver?: (this: any, key: string, value: any) => any): any {
        const valor = localStorage.getItem(chave);
        if (valor === null) { return null };
        if (reviver) { return JSON.parse(chave, reviver)};
        return JSON.parse(valor);
    } 
}