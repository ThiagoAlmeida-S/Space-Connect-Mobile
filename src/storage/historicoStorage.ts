let historicoOculto: string[] = [];

export const historicoStorage = {

  adicionarOcultos(chaves: string[]) {
    historicoOculto = [...historicoOculto, ...chaves];
  },

  obterOcultos() {
    return historicoOculto;
  },

  limparTudo() {
    historicoOculto = [];
  }

};