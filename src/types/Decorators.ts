/*
Decorators são um recurso experimental do Typescript que permite adicionar anotações e metaprogramação 
às declarações de classe e membros. They run when the method is defined, not when it’s called, 
allowing you to change or augment the method’s behavior during the class definition phase.

Decorators são funções que podem ser aplicadas usando a forma @expressão,
onde expressão deve ser avaliada como uma função que será chamada em tempo de execução com informações 
sobre a declaração decorada. Decorators podem ser usados para modificar o comportamento, adicionar novas
características ou observar as declarações decoradas.

Existem diferentes tipos de decorators, como decorators de classe, decorators de método, decorators 
de propriedade e decorators de parâmetro. Cada tipo de decorator tem uma assinatura específica e recebe
diferentes argumentos. Decorators podem ser compostos ou criados por fábricas de decorators para 
personalizar a sua aplicação.

Hello World:
    function fazAlgo(target) { // do something with 'target' ... }

Decorator de método: 
- target: é a classe à qual o objeto decorado pertence. é o protótipo da classe (para métodos de instância) ou a própria função construtora (para métodos estáticos). 
- propertyKey: é o nome do método decorado, a string que identifica o método dentro da classe.
- descriptor: objeto que contém informações sobre o método decorado, incluindo a função original do método no campo 'value'.
*/

// Decorator de método
export function validaDebito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // Guarda referência ao método original
    const originalMethod = descriptor.value;

    // Substitui o método original pela nova função que quero implementar
    descriptor.value = function (valor: any) {
        // Lógica de validação do débito
        if (valor <= 0) {
            throw new Error('O valor a debitar deve ser maior que zero.');
        }
        if (valor > this.saldo) {
            throw new Error(`Saldo insuficiente: ${this.saldo}`);
        }
        // Chama método original após as verificações
        return originalMethod.apply(this, [valor]);
    }

    // Retorna o descriptor modificado
    return descriptor;
}

export function validaDeposito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = (valor: any) => {
        if (valor <= 0) {
            throw new Error('O valor a debitar deve ser maior que zero.');
        }
        return originalMethod.apply(this, [valor]);
    }
    return descriptor;
}