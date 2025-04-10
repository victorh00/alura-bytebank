import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";

const Conta = {
    saldo: 3000 as number,

    transacoes: (JSON.parse(localStorage.getItem('transacoes'), (key: string, value: string) => {
        
    }) || []) as Transacao[],

    getSaldo(): number {
        return this.saldo;
    },

    getDataDeAcesso(): Date {
        return new Date();
    },

    debitar(valor: number): void {
        if(valor <= 0) {
            throw new Error('O valor a debitar deve ser maior que zero.');
        }
        if(valor > this.saldo) {
            throw new Error('Saldo insuficiente.');
        }
        this.saldo -= valor;
    },

    depositar(valor: number): void {
        if(valor <= 0) {
            throw new Error('O valor a debitar deve ser maior que zero.');
        }
        this.saldo += valor;
    },

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PGTO_BOLETO) {
            this.debitar(novaTransacao.valor);
        } else {
            throw new Error('Selecione uma transação válida.');
        }
        this.transacoes.push(novaTransacao);
        console.log(novaTransacao);
        localStorage.setItem('transacoes', JSON.stringify(this.transacoes));
    }
};

export default Conta;