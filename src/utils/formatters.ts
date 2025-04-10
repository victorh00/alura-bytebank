import { FormatoData } from "../types/FormatoData.js";

export function formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    });
}

export function formatarData(data: Date, formato: FormatoData = FormatoData.PADRAO): string {
    if (formato === FormatoData.DIASEMANA_DIA_MES_ANO) {
        return data.toLocaleDateString('pt-br', {
            weekday: 'long',
            day: '2-digit', 
            month: '2-digit',
            year: 'numeric',
        });
    } else if (formato === FormatoData.DIA_MES) {
        return data.toLocaleDateString('pt-br', {
            day: '2-digit',
            month: '2-digit',
        });
    } else if (formato === FormatoData.MES_ANO) {
        return capitalizeString(data.toLocaleDateString('pt-br', { month: 'long'}) + ' ' + data.getFullYear());
    } else {
        return data.toLocaleDateString('pt-br');
    }
}

function capitalizeString(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

