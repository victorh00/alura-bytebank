import Endereco from "./Endereco.js";

export default class Cliente {
    #endereco;
    constructor(nome, cpf) {
        this.nome = nome;
        this.cpf = cpf;
    }
    get endereco() {
        return this.#endereco;
    }
    set endereco(valor) {
        if(typeof(valor.numero) == 'number' && 
           typeof(valor.rua) == 'string' && 
           typeof(valor.cidade) == 'string') {
            this.#endereco = valor;
        } else {
            console.log('endereço inválido!!!!');
        }
    }
    detalharCliente() {
       console.log(`Cliente: ${this.nome}`);
       console.log(`CPF: ${this.cpf}`);
    }
}

// testes
const address1 = new Endereco('flores', 10, 'sp');
const cliente1 = new Cliente('Maria', 123123);
console.log(cliente1);
console.log('--------------getter & setter--------------');
const address2 = new Endereco('bobos', 0, 1);
cliente1.endereco = address2;
console.log(cliente1, cliente1.endereco);
