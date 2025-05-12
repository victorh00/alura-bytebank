/* Abstrair entradas e saídas da localStorage. Poderia ser usado pra concentrar os critérios de acesso, os tipos de tratamento etc*/
export class Armazenador {
    private constructor() {};

    static salvar(chave: string, valor: any): void {
        const valorComoString = JSON.stringify(valor);
        localStorage.setItem(chave, valorComoString);
    };

    static obter<T>(chave: string, reviver?: (this: any, key: string, value: any) => any): T | null {
        const valor = localStorage.getItem(chave);
        if (valor === null) { return null };
        if (reviver) { return JSON.parse(chave, reviver) as T };
        return JSON.parse(valor) as T;
    }; 
}