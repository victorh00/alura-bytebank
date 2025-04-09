class Coisa {
    #priv;
    constructor(pub, priv) {
        this.pub = pub;
        this.#priv = priv;
    }
    set priv(valor) {
        this.#priv = valor;
    }
    get priv() {
        return this.#priv;
    }
}

let c = 1;
const teste = new Coisa(10);
console.log(c++, teste);
teste.priv = 50;
console.log(c++, teste.priv);
const teste2 = new Coisa(11, 55);
console.log(c++, teste2.pub, teste2.priv);
