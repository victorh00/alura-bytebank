import { TipoTransacao } from "./TipoTransacao.js";
const Conta = {
    saldo: (JSON.parse(localStorage.getItem('saldo')) || 0),
    transacoes: (JSON.parse(localStorage.getItem('transacoes'), (key, value) => {
        if (key === 'data') {
            return new Date(value);
        }
        return value;
    }) || []),
    getSaldo() {
        return Conta.saldo;
    },
    getDataDeAcesso() {
        return new Date();
    },
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(Conta.transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((a, b) => a.data.getTime() - b.data.getTime());
        let labelGrupoAtual = '';
        transacoesOrdenadas.forEach((transacao) => {
            // console.log(`transacao.data >>> ${transacao.data}`);
            let labelTransacaoAtual = transacao.data.toLocaleDateString('pt-br', { month: 'long', year: 'numeric' });
            // console.log(`labelTransacaoAtual >>> ${labelTransacaoAtual}`);
            if (labelTransacaoAtual !== labelGrupoAtual) {
                labelGrupoAtual = labelTransacaoAtual;
                gruposTransacoes.push({
                    label: labelGrupoAtual,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        });
        // console.log(gruposTransacoes);
        return gruposTransacoes;
    },
    debitar(valor) {
        if (valor <= 0) {
            throw new Error('O valor a debitar deve ser maior que zero.');
        }
        if (valor > Conta.saldo) {
            throw new Error(`Saldo insuficiente: ${Conta.saldo}`);
        }
        Conta.saldo -= valor;
        localStorage.setItem('saldo', Conta.saldo.toString());
    },
    depositar(valor) {
        if (valor <= 0) {
            throw new Error('O valor a debitar deve ser maior que zero.');
        }
        Conta.saldo += valor;
        localStorage.setItem('saldo', Conta.saldo.toString());
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
export default Conta;
