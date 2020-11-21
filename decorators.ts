/**
 * Decorators são funções que servem para adicionar funcionalidades extras
 * no momento da declaração de uma classe.
 * 
 * Os decorators podem ser usados em:
 * - classes;
 * - funções;
 * - parâmetros;
 * - propriedades;
 * - acessores;
 */
function logger(target: any): void {
  console.log(target);
}

@logger
class Foo {}

