export class ContaCorrente {
    #saldo = 666;
    
    constructor(agencia, conta, cliente) {
        this.agencia = agencia;
        this.conta = conta;
        this.cliente = this.cliente;
    }
    
    getSaldo() {
        return this.#saldo;
    }
    
    setSaldo(valor) {
        this.#saldo = valor;
    }
    
    sacar(valor) {
        if(this.#saldo >= valor) {
            this.#saldo -= valor;
            return this.#saldo;
        }
    }

    depositar(valor) {
        this.#saldo += valor;
        return this.#saldo;
    }

    transferir(valor, clienteDestino) {
        if(valor > this.#saldo) {
            console.log('Saldo insuficiente.')
            return;
        } else {
            this.sacar(valor);
            clienteDestino.depositar(valor);
        }
    }
}