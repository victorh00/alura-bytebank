import { TipoTransacao } from "./TipoTransacao.js";
import { formatarData } from "../utils/formatters.js";
import { FormatoData } from "./FormatoData.js";
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
        const copiaTransacoes = structuredClone(Conta.transacoes);
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
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error('Selecione uma transação válida.');
        }
        Conta.transacoes.push(novaTransacao);
        localStorage.setItem('transacoes', JSON.stringify(Conta.transacoes));
    }
};
Conta.getGruposTransacoes();
export default Conta;
