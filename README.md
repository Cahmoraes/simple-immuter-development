<h3 align="center">
  <a href="https://github.com/Cahmoraes/simple-immuter/blob/main/src/si.js" target="_blank">Simple Immuter</a>
</h3>

---

## :rocket: Sobre
  <img style="max-width: 100%;" src="https://github.com/Cahmoraes/simple-immuter/blob/main/src/assets/images/immuter-cycle.png" alt="Simple Observable">
  <p align="center">by: Immer</p>

## Descrição
<p>Desenvolvimento da biblioteca Simple Immuter.</p>
<p>
  Esse projeto surgiu por meio de uma inspiração da biblioteca <a href="https://immerjs.github.io/immer/">Immer</a>.<br>
  Ao longo das últimas semanas estive estudando a fundo o desenvolvimento de uma função de cloneDeep, capaz de realizar clonagem profunda de objetos e arrays. Tendo como inspiração a função cloneDeep da biblioteca <a href="https://lodash.com/docs/4.17.15">lodash</a>.<br>
  Para isso precisei me aprofundar no desenvolvimento de funções recursivas, para me auxiliar em descer os níveis de profundidade dos objetos e mantendo uma fácil interpretação e manutenibilidade das funções.
</p>
<p>
  Inspirado na função produce da biblioteca immer, o Simple Immuter opera de modo semelhante.<br>
  A ideia básica é que você aplicará todas as suas alterações a um draftState temporário, que uma cópia profunda do currentState. Assim que todas as suas mutações forem concluídas, o Simple Immuter produzirá o nextState com base nas mutações do estado de draftState. Isso significa que você pode interagir com seus dados simplesmente modificando-os, mantendo todos os benefícios dos dados imutáveis, isto é, o nextState é um cópia profunda e imutável do currentState.
</p>
<h3>Exemplo de uso</h3>
<img width="500" src="https://github.com/Cahmoraes/simple-immuter/blob/main/src/assets/images/example-1.png">
<h3>Resultado</h3>
<img src="https://github.com/Cahmoraes/simple-immuter/blob/main/src/assets/images/result-1.png">

## :computer: Tecnologias utilizadas

- [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
