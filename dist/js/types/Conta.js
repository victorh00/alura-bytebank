var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { formatarData } from "../utils/formatters.js";
import { Armazenador } from "../utils/Armazenador.js";
import { FormatoData } from "./FormatoData.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { validaDebito, validaDeposito } from "./Decorators.js";
export class Conta {
    nome;
    saldo = Armazenador.obter("saldo");
    transacoes = Armazenador.obter("transacoes", (key, value) => {
        if (key === "data") {
            return new Date();
        }
        return value;
    }) || [];
    constructor(nome) { this.nome = nome; }
    ;
    getTitular() { return this.nome; }
    ;
    getSaldo() { return this.saldo; }
    ;
    getDataDeAcesso() { return new Date(); }
    ;
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const copiaTransacoes = structuredClone(this.transacoes);
        const transacoesOrdenadas = copiaTransacoes.sort((t1, t2) => t1.data.getTime() - t2.data.getTime());
        let labelGrupoAtual = '';
        transacoesOrdenadas.forEach((transacao) => {
            let labelTransacaoAtual = formatarData(transacao.data, FormatoData.MES_ANO);
            if (labelTransacaoAtual !== labelGrupoAtual) {
                labelGrupoAtual = labelTransacaoAtual;
                gruposTransacoes.push({
                    label: labelGrupoAtual,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        });
        return gruposTransacoes;
    }
    ;
    debitar(valor) {
        ////// Movido para o decorator @validaDebito
        // if (valor <= 0) {
        //     throw new Error('O valor a debitar deve ser maior que zero.');
        // }
        // if (valor > this.saldo) {
        //     throw new Error(`Saldo insuficiente: ${this.saldo}`);
        // }
        this.saldo -= valor;
        Armazenador.salvar('saldo', this.saldo.toString());
    }
    ;
    depositar(valor) {
        this.saldo += valor;
        Armazenador.salvar('saldo', this.saldo.toString());
    }
    ;
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PGTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error('Selecione uma transação válida.');
        }
        this.transacoes.push(novaTransacao);
        Armazenador.salvar('transacoes', JSON.stringify(this.transacoes));
    }
    ;
}
__decorate([
    validaDebito
], Conta.prototype, "debitar", null);
__decorate([
    validaDeposito
], Conta.prototype, "depositar", null);
export class ContaPremium extends Conta {
    registrarTransacao(transacao) {
        if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            console.log("ganhou um bônus de 0.50 centavos");
            transacao.valor += 0.5;
        }
        super.registrarTransacao(transacao);
    }
}
const conta = new Conta("Joana da Silva Oliveira");
const contaPremium = new ContaPremium("Maria da Silva");
export default conta;
