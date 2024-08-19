const icrs = [
  {
    id: 1,
    name: "Boas vindas",
    message: "Bem vindo! Sou um robot de chat! Em que posso ajudar?",
    fallbackMessage: "Desculpe não entendi",
    matchAndRoute: [
      {
        texts: [
          "Boas",
          "Ora muito bom dia",
          "Bom dia",
          "Boa tarde",
          "Boa noite",
          "Viva",
          "Olá"
        ],
        response: {
          text: "Olá! Em que posso ajudar?",
        },
      },
      {
        context: "saldo",
        texts: [
          "dinheiro",
          "saldo",
          "ver o meu saldo",
          "plafond de telemóvel",
          "Queria saber o meu saldo de telemóvel",
          "Queria saber quanto dinheiro tenho",
          "Quanto saldo tenho no meu cartão",
        ],
        response: {
          text: "Consulta de saldo",
        },
      },
      {
        context: "tarifário",
        texts: [
          "Qual é o meu tarifário",
          "verificar tarifário",
          "consultar tarifário",
          "consultar tarifário atual",
          "consultar plano",
          "consultar plano atual",
        ],
        response: {
          text: "Consulta de tarifário",
        },
      },
      {
        context: "tarifário",
        texts: [
          "alterar tarifário",
          "alterar plano",
          "alteração de tarifário",
          "tarifário está muito caro",
          "Quero alterar o tarifário",
        ],
        response: {
          text: "Alteração de tarifário",
        },
      },
    ],
  },
];

module.exports.getIcrById = async function (icrId) {
  return icrs.find((icr) => icr.id === icrId);
};
