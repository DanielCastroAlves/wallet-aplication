export const GUARDAR_EMAIL = 'GUARDAR_EMAIL';
export const ADICIONAR_DESPESAS = 'ADICIONAR_DESPESAS';
export const DELETAR_DESPESAS = 'DELETAR_DESPESAS';
export const CAPTURA_DESPESAS_EDIT = 'CAPTURA_DESPESAS_EDIT';
export const EDITAR_DESPESAS = 'EDITAR_DESPESAS';
export const GUARDAR_MOEDAS = 'GUARDAR_MOEDAS';
export const guardarEmail = (email) => (
  {
    type: GUARDAR_EMAIL,
    email,
  });

export const adicionarDespesas = (despesas) => (
  {
    type: ADICIONAR_DESPESAS,
    despesas,
  }
);

export const deletarDespesas = (payload) => (
  {
    type: DELETAR_DESPESAS,
    payload,
  }
);

export const capturaDespesasEdit = (payload) => (
  {
    type: CAPTURA_DESPESAS_EDIT,
    payload,
  }
);

export const editarDespesas = (payload) => (
  {
    type: EDITAR_DESPESAS,
    payload,
  }
);

export const guardarMoedas = (despesas) => (
  {
    type: GUARDAR_MOEDAS,
    despesas,
  }
);
