import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";

const elementRegistroTransacoesExtrato: HTMLElement = document.querySelector('.extrato .registro-transacoes');

renderizarExtrato();
function renderizarExtrato(): void {
    const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();
    elementRegistroTransacoesExtrato.innerHTML = '';
    let htmlGruposDeTransacoes: string = '';
    gruposTransacoes.forEach((GrupoTransacao) => {
        let htmlTransacoesDoGrupo: string = '';
        GrupoTransacao.transacoes.forEach((transacao) => {
            htmlTransacoesDoGrupo += `
            <div class="transacao-item">
                <div class="transacao-info">
                    <span class="tipo">${transacao.tipoTransacao}</span>
                    <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                </div>
                <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
            </div>
            `;
        });
        htmlGruposDeTransacoes += `
        <div class="transacoes-group">
            <strong class="mes-group">${GrupoTransacao.label}</strong>
            ${htmlTransacoesDoGrupo}
        </div>
        `
    });
    if(htmlGruposDeTransacoes === '') {
        htmlGruposDeTransacoes = '<div>Não há transações registradas.</div>';
    }
    elementRegistroTransacoesExtrato.innerHTML = htmlGruposDeTransacoes;
}

const ExtratoComponent = {
    atualizar(): void {
        renderizarExtrato();
    }
}

export default ExtratoComponent;