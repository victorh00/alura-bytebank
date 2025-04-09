import Cliente from './Cliente.js'
import { ContaCorrente } from './ContaCorrente.js';

const cliente1 = new Cliente('João', 123);
const conta1 = new ContaCorrente(99, 9901, cliente1);

const cliente2 = new Cliente('Maria', 456)
const conta2 = new ContaCorrente(99, 9901, cliente2);

const logs = new Array();

console.log('Cliente 1:')
cliente1.detalharCliente();

console.log('\nCliente 2:');
cliente2.detalharCliente();

conta1.sacar(66);
logs.push(`saque. novo saldo: ${conta1.getSaldo()}`);

conta1.depositar(1000);
logs.push(`depósito. novo saldo: ${conta1.getSaldo()}`);

conta1.transferir(450, conta2);
logs.push(`transferência. novo saldo ${conta1.getSaldo()}`);

console.log();
for(let log of logs) {
    console.log(log);
}