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
            console.log(`transacao.data >>> ${transacao.data}`);
            let labelTransacaoAtual: string = transacao.data.toLocaleDateString('pt-br', { month: 'long', year: 'numeric' });
            console.log(`labelTransacaoAtual >>> ${labelTransacaoAtual}`);
            if (labelTransacaoAtual !== labelGrupoAtual) {
                labelGrupoAtual = labelTransacaoAtual;
                gruposTransacoes.push({
                    label: labelGrupoAtual,
                    transacoes: []
                })
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);

        });
        console.log('aqui')
        console.log(gruposTransacoes);
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
        } else {
            throw new Error('Selecione uma transação válida.');
        }
        Conta.transacoes.push(novaTransacao);
        // console.log(Conta.transacoes)
        // console.log(Conta.getGruposTransacoes());
        localStorage.setItem('transacoes', JSON.stringify(Conta.transacoes));
    }
};

// localStorage.removeItem('transacoes');
// let a: Date = new Date('2025-01-01');
// console.log('Date usando string 2025-01-01 pura')
// console.log(a);

// console.log('data pura to UTC string')
// console.log(a);

// console.log('a.getHours()');
// console.log(a.getHours());
// console.log('a toUTC+3: ');
// a.setHours(a.getHours() + 3);
// console.log(a)
// console.log(formatarData(a, FormatoData.DIASEMANA_DIA_MES_ANO));
// console.log('a toUTC+10');
// a.setHours(a.getHours() + 10);
// console.log(a);


// console.log(formatarData(a, FormatoData.DIASEMANA_DIA_MES_ANO))
Conta.getGruposTransacoes();
export default Conta; 