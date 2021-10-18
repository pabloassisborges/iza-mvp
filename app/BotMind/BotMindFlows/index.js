import {
  optionCards,
  selectField,
  tagsField,
  textField,
  disabledFieldText,
  endOfConversation,
} from '../StateFormatter';
import * as RTypes from '../responseTypes';

const common_greetings = /(^hello|^hllo|^hi|^hey|^hola|^sup)\b\s?.*$/i;
const common_greetings_negative = /(?!(^hello|^hi|^hey|^hllo|^sup|^hola)\b)\w+/i;

const p = [
  'Seu paciente está se sentindo triste ou tem relatado sensação de vazio quase que o tempo todo?',
  'O paciente tem relatado dificuldade em suportar suas tristezas ou sensações de vazio ultimamente?',
  'Há algum relato por parte do paciente sobre comentários de seu ciclo social com queixas de que estão percebendo uma acentuada tristeza nele nos últimos tempos?',
  'O paciente tem confiado em si mesmo (a) ou sente que vem perdendo a autoconfiança nos últimos tempos?',
  'Quando o paciente pensa ou relata aspectos de sua autoestima, tem demonstrado pensamentos pessimistas?',
  'As pessoas ao redor do paciente estão notando e comentando sobre um aumento de suas falas pessimistas ultimamente?',
  'Há algum relato do paciente mencionando sentimentos de fraqueza e indisposição para enfrentar os problemas de sua vida? ',
  'Há relatos recentes do paciente acerca da incapacidade de lidar com seus fracassos e conquistas?',
  'Sobre o círculo social deste paciente, as pessoas têm comentado que ele(a) está com sua autoestima baixa demais nos últimos tempos?',
  'Os relatos sobre sentimentos de insatisfação com a vida deste paciente estão aumentando nos últimos tempos?',
  'Na maior parte das vezes o paciente relata aborrecimentos e/ou insatisfações?',
  'As pessoas com quem o paciente convive têm feito relatos sobre o paciente achando-o muito insatisfeito?',
  'O paciente tem se culpado excessivamente por aquilo que têm dado errado em sua vida?',
  'Na maior parte do tempo, o paciente relata sentimentos de culpa, desamparo ou inutilidade?',
  'Há relatos do paciente que amigos e familiares dizem que ele está se sentindo excessivamente culpado ultimamente?',
  'O paciente se sente punido pelas coisas que tem feito ultimamente?',
  'Mesmo que o paciente faça tudo certo, ele tem se sentido punido constantemente?',
  'As pessoas têm relatado que acham que o paciente se pune demais?',
  'O paciente tem relatado decepção consigo mesmo?',
  'O paciente relata que a capacidade de suportar a si mesmo (a) tem diminuído ultimamente?',
  'As pessoas que convivem com o paciente  acham que ele (a) se critica demais ?',
  'O paciente acha que tem errado muito e fracassado demais nas coisas que faz?',
  'O paciente é muito crítico(a) para com relação a si mesmo(a)?',
  'Há relatos de pessoas achando-o(a) crítico(a) demais?',
  'Há relatos do paciente de que seria melhor morrer pra resolver os problemas que tem?',
  'O paciente já relatou ter pensado em morrer em muitas situações?',
  'O paciente relatou ter se pegado pensando em morrer ou se matar?',
  'O paciente tem tido crises frequentes de choro?',
  'O paciente tem chorado muito por pensar na sua vida e em seus fracassos?',
  'Há relatos das pessoas que convivem com esse paciente de que ele(a) está chorando muito ultimamente?',
  'O paciente tem se sentido constantemente inquieto(a) e irritado(a)?  ',
  'O paciente tem se queixado de estar se irritando facilmente e por qualquer coisa nos últimos tempos?',
  'O paciente apresentou algum relato sobre as pessoas estarem percebendo que este anda se irritando demais nos últimos tempos?',
  'O paciente tem relatado que as pessoas não o(a) alegram e ajudam como faziam antes?',
  'O paciente relata em diversas situações que tem preferido ficar sozinho(a) pois sente que as pessoas não o(a) ajudam?',
  'Há relato de que as pessoas se queixam de que o(a) paciente anda se isolando muito ultimamente?',
  'O paciente tem achado muito complicado tomar decisões? Mesmo as mais simples?',
  'O paciente tem relatado sentimento de fracasso ao tomar decisões?',
  'Há queixa do paciente em relação às pessoas pois estas estão dizendo que estão observando uma constante indecisão ultimamente?',
  'Quando o paciente se compara com outras pessoas, tem se sentido feio(a)?',
  'O paciente já relatou não ter nenhum atributo físico que o(a) faça ser atraente para outras pessoas?',
  'O paciente relatou que as pessoas ao seu redor têm percebido mudanças em sua aparência?',
  'Por mais que o paciente se esforce, ele tem apresentado queixa de que não consegue trabalhar ou se concentrar como antes? ',
  'Há relatos de que o trabalho ou atividades que exigem concentração têm sido algo extremamente pesado para o paciente?',
  'O paciente apresentou queixa de que tem sentido perda de interesse em trabalhar ou dificuldade para se concentrar em certas tarefas? ',
  'O paciente tem apresentado queixas de que não está dormindo bem?',
  'O paciente não está conseguindo descansar nem dormir direito nos últimos tempos?',
  'Há queixas de que o paciente está se sentindo mais sonolento(a) ou insone nos últimos tempos?',
  'O paciente tem relatado exaustão em fazer qualquer tipo de atividade nos últimos tempos? ',
  'O paciente tem se queixado de se sentir mais devagar em realizar suas atividades diárias?',
  'Há queixas das pessoas de que o paciente está sendo visto sempre mais cansado nos últimos tempos?',
  'O paciente tem relatado estar comendo menos do que o de costume? ',
  'O paciente tem relatado estar comendo mais do que o habitual?',
  'Há relatos das pessoas próximas percebendo e comentando que os hábitos alimentares do(a) paciente tem mudado ultimamente?',
  'O paciente sente que está emagrecendo ultimamente?',
  'O paciente sente que seu peso tem aumentado bastante nos últimos tempos?',
  'Há relatos de pessoas do círculo social deste paciente percebendo e comentando sobre mudanças no peso dele recentemente?',
  'O paciente tem se queixado de dificuldade de pensar ou se concentrar em tarefas diárias?',
  'O paciente tem se queixado de dores inexplicáveis nos últimos tempos?',
  'O paciente tem apresentado um medo muito grande de ficar doente?',
  'O paciente tem relatado a perda de interesse em várias coisas, inclusive sexo?',
  'O paciente tem relatado perda completa do interesse por sexo e relacionamento?',
  'O paciente tem apresentado queixa de que seu companheiro(a) vem se queixando do seu desinteresse sexual nos últimos tempos?',
  'O paciente tem relatado a perda de interesse em várias coisas, pois acredita que no futuro nada mudará?',
  'O paciente tem relatado perda completa da esperança e da percepção de que as coisas podem melhorar ou se transformarem ?',
  'O paciente tem apresentado queixa de que seus amigos e pessoas próximas têm percebido sua falta de esperança  na possibilidade futura de que as coisas melhorem? ',
]
const questions = {
  start: {
    botPrompt: 'Olá! Eu sou a <strong>IZA</strong>, e sou uma <strong>inteligência artificial</strong> que te auxilia no diagnóstico da depressão em seus pacientes.',
    answers: [
      {
        nextId: 'p1',
      },
    ],
  },
  p1: {
    botPrompt: p[0],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo em parte.', 'Discordo totalmente.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p2',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p2',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p2',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p2',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p2',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p2: {
    botPrompt: p[1],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p3',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p3',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p3',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p3',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p3',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p3: {
    botPrompt: p[2],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p4',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p4',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p4',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p4',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p4',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p4: {
    botPrompt: p[3],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p5',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p5',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p5',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p5',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p5',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p5: {
    botPrompt: p[4],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p6',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p6',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p6',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p6',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p6',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p6: {
    botPrompt: p[5],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p7',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p7',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p7',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p7',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p7',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p7: {
    botPrompt: p[6],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p8',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p8',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p8',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p8',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p8',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p8: {
    botPrompt: p[7],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p9',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p9',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p9',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p9',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p9',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p9: {
    botPrompt: p[8],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p10',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p10',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p10',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p10',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p10',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p10: {
    botPrompt: p[9],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p11',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p11',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p11',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p11',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p11',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p11: {
    botPrompt: p[10],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p12',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p12',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p12',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p12',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p12',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p12: {
    botPrompt: p[11],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo em parte.', 'Discordo totalmente.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p13',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p13',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p13',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p13',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p13',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p13: {
    botPrompt: p[12],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p14',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p14',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p14',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p14',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p14',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p14: {
    botPrompt: p[13],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p15',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p15',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p15',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p15',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p15',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p15: {
    botPrompt: p[14],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p16',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p16',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p16',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p16',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p16',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p16: {
    botPrompt: p[15],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p17',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p17',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p17',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p17',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p17',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p17: {
    botPrompt: p[16],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p18',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p18',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p18',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p18',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p18',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p18: {
    botPrompt: p[17],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p19',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p19',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p19',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p19',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p19',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p19: {
    botPrompt: p[18],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p20',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p20',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p20',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p20',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p20',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p20: {
    botPrompt: p[19],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p21',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p21',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p21',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p21',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p21',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p21: {
    botPrompt: p[20],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p22',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p22',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p22',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p22',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p22',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p22: {
    botPrompt: p[21],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p23',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p23',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p23',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p23',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p23',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p23: {
    botPrompt: p[22],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo em parte.', 'Discordo totalmente.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p24',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p24',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p24',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p24',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p24',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p24: {
    botPrompt: p[23],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p25',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p25',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p25',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p25',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p25',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p25: {
    botPrompt: p[24],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p26',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p26',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p26',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p26',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p26',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p26: {
    botPrompt: p[25],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p27',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p27',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p27',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p27',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p27',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p27: {
    botPrompt: p[26],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p28',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p28',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p28',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p28',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p28',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p28: {
    botPrompt: p[27],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p29',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p29',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p29',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p29',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p29',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p29: {
    botPrompt: p[28],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p30',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p30',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p30',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p30',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p30',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p30: {
    botPrompt: p[29],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p31',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p31',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p31',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p31',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p31',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p31: {
    botPrompt: p[30],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p32',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p32',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p32',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p32',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p32',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p32: {
    botPrompt: p[31],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p33',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p33',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p33',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p33',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p33',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p33: {
    botPrompt: p[32],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p34',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p34',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p34',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p34',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p34',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p34: {
    botPrompt: p[33],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo em parte.', 'Discordo totalmente.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p35',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p35',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p35',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p35',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p35',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p35: {
    botPrompt: p[34],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p36',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p36',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p36',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p36',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p36',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p36: {
    botPrompt: p[35],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p37',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p37',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p37',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p37',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p37',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p37: {
    botPrompt: p[36],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p38',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p38',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p38',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p38',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p38',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p38: {
    botPrompt: p[37],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p39',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p39',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p39',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p39',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p39',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p39: {
    botPrompt: p[38],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p40',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p40',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p40',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p40',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p40',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p40: {
    botPrompt: p[39],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p41',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p41',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p41',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p41',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p41',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p41: {
    botPrompt: p[40],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p42',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p42',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p42',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p42',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p42',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p42: {
    botPrompt: p[41],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p43',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p43',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p43',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p43',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p43',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p43: {
    botPrompt: p[42],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p44',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p44',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p44',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p44',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p44',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p44: {
    botPrompt: p[43],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p45',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p45',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p45',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p45',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p45',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p45: {
    botPrompt: p[44],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p46',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p46',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p46',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p46',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p46',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p46: {
    botPrompt: p[45],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo em parte.', 'Discordo totalmente.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p47',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p47',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p47',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p47',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p47',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p47: {
    botPrompt: p[46],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p48',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p48',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p48',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p48',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p48',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p48: {
    botPrompt: p[47],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p49',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p49',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p49',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p49',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p49',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p49: {
    botPrompt: p[48],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p50',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p50',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p50',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p50',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p50',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p50: {
    botPrompt: p[49],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p51',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p51',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p51',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p51',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p51',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p51: {
    botPrompt: p[50],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p52',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p52',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p52',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p52',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p52',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p52: {
    botPrompt: p[51],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p53',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p53',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p53',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p53',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p53',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p53: {
    botPrompt: p[52],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p54',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p54',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p54',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p54',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p54',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p54: {
    botPrompt: p[53],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p55',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p55',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p55',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p55',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p55',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p55: {
    botPrompt: p[54],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p56',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p56',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p56',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p56',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p56',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p56: {
    botPrompt: p[55],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p57',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p57',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p57',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p57',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p57',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p57: {
    botPrompt: p[56],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo em parte.', 'Discordo totalmente.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p58',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p58',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p58',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p58',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p58',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p58: {
    botPrompt: p[57],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p59',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p59',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p59',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p59',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p59',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p59: {
    botPrompt: p[58],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p60',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p60',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p60',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p60',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p60',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p60: {
    botPrompt: p[59],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p61',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p61',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p61',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p61',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p61',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p61: {
    botPrompt: p[60],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p62',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p62',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p62',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p62',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p62',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p62: {
    botPrompt: p[61],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p63',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p63',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p63',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p63',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p63',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p63: {
    botPrompt: p[62],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p64',
        sumToBags: [
          { name: 'alta', points: 1 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p64',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 1 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p64',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 1 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p64',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 1 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p64',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 1 }
        ],
      },
    ],
  },
  p64: {
    botPrompt: p[63],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p65',
        sumToBags: [
          { name: 'alta', points: 5 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p65',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 5 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p65',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 5 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p65',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 5 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p65',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 5 }
        ],
      },
    ],
  },
  p65: {
    botPrompt: p[64],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p66',
        sumToBags: [
          { name: 'alta', points: 5 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p66',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 5 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p66',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 5 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p66',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 5 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p66',
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 5 }
        ],
      },
    ],
  },
  p66: {
    botPrompt: p[65],
    input: selectField(['Concordo totalmente.', 'Concordo em parte.', 'Não concordo, nem discordo.', 'Discordo totalmente.', 'Discordo em parte.']),
    answers: [
			{ 
        answer: 'Concordo totalmente.',
        nextId: 'p67',
        shouldEstimateRecommendation: true,
        sumToBags: [
          { name: 'alta', points: 5 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Concordo em parte.',
        nextId: 'p67',
        shouldEstimateRecommendation: true,
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 5 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Não concordo, nem discordo.',
        nextId: 'p67',
        shouldEstimateRecommendation: true,
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 5 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo em parte.',
        nextId: 'p67',
        shouldEstimateRecommendation: true,
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 5 },
          { name: 'baixa', points: 0 }
        ],
      },
      { 
        answer: 'Discordo totalmente.',
        nextId: 'p67',
        shouldEstimateRecommendation: true,
        sumToBags: [
          { name: 'alta', points: 0 },
          { name: 'media-alta', points: 0 }, 
          { name: 'media', points: 0 },
          { name: 'media-baixa', points: 0 },
          { name: 'baixa', points: 5 }
        ],
      },
    ],
  },

  alta: {
    botPrompt: "Após análise, acredito que a probabilidade do seu paciente estar com depressão é <strong>alta (90%)</strong>.",
    answers: [
      {
        nextId: 'alta',
        finishConversation: true,
      },
    ],
  },
  media_alta: {
    botPrompt: "Após análise, acredito que a probabilidade do seu paciente estar com depressão é <strong>média-alta (70%)</strong>.",
    answers: [
      {
        nextId: 'media_alta',
        finishConversation: true,
      },
    ],
  },
  media: {
    botPrompt: "Após análise, acredito que a probabilidade do seu paciente estar com depressão é <strong>media (50%)</strong>.",
    answers: [
      {
        nextId: 'media',
        finishConversation: true,
      },
    ],
  },
  media_baixa: {
    botPrompt: "Após análise, acredito que a probabilidade do seu paciente estar com depressão é <strong>média-baixa (30%)</strong>.",
    answers: [
      {
        nextId: 'media_baixa',
        finishConversation: true,
      },
    ],
  },
  baixa: {
    botPrompt: "Após análise, acredito que a probabilidade do seu paciente estar com depressão é <strong>baixa (10%)</strong>.",
    answers: [
      {
        nextId: 'baixa',
        finishConversation: true,
      },
    ],
  },
  finish1:{
    botPrompt: "Agradeço por contar comigo para auxiliar no diagnóstico de seu paciente. Segue um ótimo artigo à respeito de depressão:",
    answers: [
      {
        nextId: 'finish2',
      },
    ], 
  },
  finish2:{
    botPrompt: 'https://www.researchgate.net/profile/Antonio-Nardi/publication/26373093_Depressao_no_Ciclo_da_Vida/links/568d0ab908aec2fdf6f59119/Depressao-no-Ciclo-da-Vida.pdf',
    type: RTypes.LINK,
    answers: [
      {
        nextId: 'finish3',
      },
    ], 
  },
  finish3:{
    botPrompt: "Até logo! (Para recomeçar, recarregue a página)",
    input: endOfConversation(),
    answers: [
      {
        nextId: 'finish3',
      },
    ], 
  }
};

export default questions;
