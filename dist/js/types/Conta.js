import { TipoTransacao } from "./TipoTransacao.js";
const Conta = {
    saldo: 3000,
    transacoes: (JSON.parse(localStorage.getItem('transacoes'), (key, value) => {
    }) || []),
    getSaldo() {
        return this.saldo;
    },
    getDataDeAcesso() {
        return new Date();
    },
    debitar(valor) {
        if (valor <= 0) {
            throw new Error('O valor a debitar deve ser maior que zero.');
        }
        if (valor > this.saldo) {
            throw new Error('Saldo insuficiente.');
        }
        this.saldo -= valor;
    },
    depositar(valor) {
        if (valor <= 0) {
            throw new Error('O valor a debitar deve ser maior que zero.');
        }
        this.saldo += valor;
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PGTO_BOLETO) {
            this.debitar(novaTransacao.valor);
        }
        else {
            throw new Error('Selecione uma transação válida.');
        }
        this.transacoes.push(novaTransacao);
        console.log(novaTransacao);
        localStorage.setItem('transacoes', JSON.stringify(this.transacoes));
    }
};
export default Conta;
