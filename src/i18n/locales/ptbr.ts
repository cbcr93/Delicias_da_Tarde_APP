export default {
  PAGE: {
    AUTH: {
      REGISTER_SCREEM: {
        TITLE: 'Cadastre',
        FORM: {
          EMAIL: 'E-mail',
          PASSWORD: 'Senha',
          CONFIRM_PASSWORD: 'Confirmar Senha',
          REGISTER: 'REGISTRAR',
          TO_LOGIN: 'Login',
        },
      },
      RECOVE_PASS: {
        FORGOT_PASS_SCREEM: {
          TITLE: 'Recuperar Senha',
          FORM: {
            EMAIL: 'E-mail',
            CODE: 'Enviar código',
            SENDING: 'Enviando...',
            TO_LOGIN: 'Login',
          },
        },
        VERIFY_RECOVERY_CODE_SCREEN: {
          TITLE: 'Redefinir Senha',
          FORM: {
            CODE: 'Código de recuperação',
            RESET_PASS: 'Redefinir senha',
            TO_LOGIN: 'Login',
            SENDING: 'Enviando...',
          },
        },
      },
      LOGIN_SCREEM: {
        TITLE: 'LOGIN',
        FORM: {
          EMAIL: 'E-mail',
          PASSWORD: 'Senha',
          TO_ENTER: 'Entrar',
          TO_REGISTER: 'Cadastre',
          TO_FORGOT_PASS: 'Esqueci minha senha',
        },
        BIOMETRICS: {
          AUTH: 'Autentique-se para continuar',
          BACK: 'Usar senha',
          FAILED: 'Autenticação falhou',
          ALERT: {
            TITLE: 'Ativar biometria?',
            MESSAGE: 'Deseja usar biometria para login automático?',
            CREDENTIALS_NOT_FOUND: 'Credenciais não encontradas',
            ERRO_BIOMETRIC: 'Erro no login biométrico',
          },
        },
      },
    },
    HOME: {
      TEXT: 'Minha Home',
      DETAILS: {
        TEXT: 'Detalhes',
        TEXT_NAME: 'Detalhes da tela: ',
      },
    },
    INFO: {
      TEXT: 'Informações',
    },
    PRODUCT: {
      TEXT: 'Produtos',
      ADD_OR_EDIT_SCREEN: {
        TEXT: 'Cadastrar/Editar produto',
        ADD: 'Cadastrar produto',
        EDIT: 'Editar produto',
      },
      DETAILS: {
        TEXT: 'Detalhes',
        TEXT_NAME: 'Detalhes da tela: ',
      },
      STOCK: {
        TEXT: 'Estoque',
      },
    },
    PROFILE: {
      TEXT: 'Usuário',
      PROFILE_SCREEN: {
        TITLE: 'Perfil do Usuário',
        LABEL: {
          EMAIL: 'E-mail:',
          LAST_LOGIN: 'Ultimo login:',
          TYPE: 'Tipo:',
          STATUS: 'Status:',
        },
      },
      VERIFY_CHANGE_PASS_SCREEN: {
        TITLE: 'Alterar Senha',
        USER: '',
        FORM: {
          OLD_PASSWORD: 'Senha Antiga',
          PASSWORD: 'Senha Nova',
          CONFIRM_PASSWORD: 'Comfirmar Senha Nova',
          RESET_PASS: 'Redefinir senha',
          TO_PROFILE: 'Voltar',
          SENDING: 'Enviando...',
        },
      },
    },
    REPORT: {
      TEXT: 'Relatório',
      DETAILS: {
        TEXT: 'Detalhes',
        TEXT_NAME: 'Detalhes da tela: ',
      },
      GENERAL: {
        TEXT: 'Relatório Geral',
      },
    },
    SETTINGS: {
      TEXT: 'Configuração',
    },
    SALES: {
      TEXT: 'Registro de Compras',
      CART: {
        TEXT: 'Carrinho',
      },
      CONFIRM: {
        TEXT: 'Compra Concluída',
      },
      DETAILS: {
        TEXT: 'Detalhes',
        TEXT_NAME: 'Detalhes da tela: ',
      },
    },
  },
  COMPONENTS: {
    ADAVANCED_MODAL: {
      OPEN: 'Abrir Modal',
    },
    CARD: {
      TEXT_TIMES: 'Horários',
      TEXT_TIME: 'Horário',
    },
    ITEM_LIST: {
      SEARCH: 'Buscar por título...',
      ADD: 'Adicionar item',
      OUT: 'Deseja sair?',
      MODAL_INPUT_TITLE: 'Titulo',
      MODAL_INPUT_DESCRIPTION: 'Discrição',
    },
  },
  ERRORS: {
    GENERIC_ERROR:
      'Não foi possível realizar esta requisição, por favor, tente novamente mais tarde.',
    UNKNOWN_ERROR: 'Erro desconhecido.',
  },
  ROUTER: {
    DETAILS: {
      TEXT: 'Detalhes',
      KEY: 'details',
      TYPE: 'Feather',
      NAME: 'Detalhes',
      HEADER: '',
      ICON: 'archive',
      BUTTON_SEND_NAVIGATION: 'Ir para Detalhes',
    },
    HOME: {
      TEXT: 'Minha Home',
      KEY: 'home',
      TYPE: 'Feather',
      NAME: 'Minha Home',
      HEADER: '',
      ICON: 'home',
      BUTTON_SEND_NAVIGATION: 'Ir para Minha Home',
    },
    HOMESTACK: {
      TEXT: 'Minha Home',
      KEY: 'HomeStack',
      TYPE: 'Feather',
      NAME: 'Minha Home',
      HEADER: '',
      ICON: 'home',
      BUTTON_SEND_NAVIGATION: 'Ir para Minha Home',
    },
    HOMETAB: {
      TEXT: 'Minha Home',
      KEY: 'HomeTab',
      TYPE: 'Feather',
      NAME: 'Minha Home',
      HEADER: '',
      ICON: 'home',
      BUTTON_SEND_NAVIGATION: 'Ir para Minha Home',
    },
    INFO: {
      TEXT: 'Informações',
      KEY: 'info',
      TYPE: 'Feather',
      NAME: 'Informações',
      HEADER: '',
      ICON: 'info',
      BUTTON_SEND_NAVIGATION: 'Ir para Informações',
    },
    PROFILESTACK: {
      TEXT: 'Usuário',
      KEY: 'profile',
      TYPE: 'Feather',
      NAME: 'Usuário',
      HEADER: '',
      ICON: 'user',
      BUTTON_SEND_NAVIGATION: 'Usuário',
    },
    SETTINGS: {
      TEXT: 'Configuração',
      KEY: 'settings',
      TYPE: 'Feather',
      NAME: 'Configuração',
      HEADER: '',
      ICON: 'settings',
      BUTTON_SEND_NAVIGATION: 'Ir para Configuração',
    },
  },
  SHARED: {
    YES: 'Sim',
    NO: 'Não',
    BACK: 'Voltar',
    CONFIRM: 'Confirma',
    CONFIRMED: 'Confirmado',
    CONTINUE: 'Continuar',
    CLOSE: 'Fechar',
    EXIT: 'Sair',
    EDIT: 'Editar',
    FINISH: 'Finalizar',
    NEXT: 'Próximo',
    OPTIONAL: 'Opcional',
    SAVE: 'Salvar',
    SKIP: 'Pular',
    SUBMIT: 'Enviar',
    PASSWORD_CRITERIA: {
      MIN: 'Mínimo 8 caracteres',
      UPPERCASE: '1 letra maiúscula',
      LOWERCASE: '1 letra minúscula',
      NUMBER: '1 número',
      SPECIAL: '1 caractere especial',
      SAME: 'Senhas iguais',
    },
  },
};
