import { formatarData, formatarMoeda } from "../utils/formatters.js"; 
import { FormatoData } from "../types/FormatoData.js";

let saldo: number = 3000;

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;

if (elementoDataAcesso != null) {
    const dataAcesso: Date = new Date();
    elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIASEMANA_DIA_MES_ANO);
}

export function getSaldo(): number {
    return saldo;
}

setSaldo(saldo);
export function setSaldo(novoSaldo: number): void {
    saldo = novoSaldo;
    if(elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(saldo);
    }
}