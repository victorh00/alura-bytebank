import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { formatarData } from "../utils/formatters.js";
import { FormatoData } from "./FormatoData.js";

const Conta = {
    saldo: (JSON.parse(localStorage.getItem('saldo')) || 0) as number,

    transacoes: (JSON.parse(localStorage.getItem('transacoes'), (key: string, value: string) => {
        if (key === 'data') {
            return new Date(value);
        }
        return value;
    }) || []) as Transacao[],

    getSaldo(): number {
        return Conta.saldo;
    },

    getDataDeAcesso(): Date {
        return new Date();
    },

    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const copiaTransacoes: Transacao[] = structuredClone(Conta.transacoes);
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
    },

    debitar(valor: number): void {
        if (valor <= 0) {
            throw new Error('O valor a debitar deve ser maior que zero.');
        }
        if (valor > Conta.saldo) {
            throw new Error(`Saldo insuficiente: ${Conta.saldo}`);
        }
        Conta.saldo -= valor;
        localStorage.setItem('saldo', Conta.saldo.toString());
    },

    depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error('O valor a debitar deve ser maior que zero.');
        }
        Conta.saldo += valor;
        localStorage.setItem('saldo', Conta.saldo.toString());
    },

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        } else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PGTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        } else {
            throw new Error('Selecione uma transação válida.');
        }
        Conta.transacoes.push(novaTransacao);
        localStorage.setItem('transacoes', JSON.stringify(Conta.transacoes));
    }
};

Conta.getGruposTransacoes();
export default Conta; 