import { formatarData } from "../utils/formatters.js";
import { Armazenador } from "../utils/Armazenador.js";
import { FormatoData } from "./FormatoData.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

/* Mudança de paradigma funcional para POO. */
export class Conta {
    protected nome: string;
    protected saldo: number = Armazenador.obter("saldo");
    private transacoes: Transacao[] = Armazenador.obter("transacoes", (key: string, value: any) => {
        if (key === "data") { return new Date(); }
        return value;
    }) || [];

    constructor(nome: string) { this.nome = nome; };

    public getTitular() { return this.nome; };

    public getSaldo(): number { return this.saldo; };

    public getDataDeAcesso(): Date { return new Date(); };

    public getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const copiaTransacoes: Transacao[] = structuredClone(this.transacoes);
        const transacoesOrdenadas: Transacao[] = copiaTransacoes.sort((t1, t2) => t1.data.getTime() - t2.data.getTime());
        let labelGrupoAtual: string = '';

        transacoesOrdenadas.forEach((transacao) => {
            let labelTransacaoAtual: string = formatarData(transacao.data, FormatoData.MES_ANO);
            if (labelTransacaoAtual !== labelGrupoAtual) {
                labelGrupoAtual = labelTransacaoAtual;
                gruposTransacoes.push({
                    label: labelGrupoAtual,
                    transacoes: []
                })
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);

        });
        return gruposTransacoes;
    };

    private debitar(valor: number): void {
        if (valor <= 0) {
            throw new Error('O valor a debitar deve ser maior que zero.');
        }
        if (valor > this.saldo) {
            throw new Error(`Saldo insuficiente: ${this.saldo}`);
        }
        this.saldo -= valor;
        Armazenador.salvar('saldo', this.saldo.toString());
    };

    private depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error('O valor a debitar deve ser maior que zero.');
        }
        this.saldo += valor;
        Armazenador.salvar('saldo', this.saldo.toString());
    };

    public registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PGTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        } else {
            throw new Error('Selecione uma transação válida.');
        }
        this.transacoes.push(novaTransacao);
        Armazenador.salvar('transacoes', JSON.stringify(this.transacoes));
    };
}

const conta = new Conta("Joana da Silva Oliveira");
export default conta;