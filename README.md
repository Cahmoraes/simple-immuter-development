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
  Esse projeto surgiu por meio de uma motivação da biblioteca <a href="https://immerjs.github.io/immer/">Immer</a>.<br>
  Ao longo das últimas semanas estive estudando a fundo o desenvolvimento de uma função de cloneDeep, capaz de realizar clonagem profunda de objetos e arrays. Tendo como inspiração a função cloneDeep da biblioteca <a href="https://lodash.com/docs/4.17.15">lodash</a>.<br>
  Para isso precisei me aprofundar no desenvolvimento de funções recursivas, para me auxiliar em descer os níveis de profundidade dos objetos e mantendo uma fácil interpretação e manutenibilidade das mesmas.
</p>
<p>
  Inspirado na função produce da biblioteca Immer, o Simple Immuter opera de modo semelhante.<br>
  A ideia básica é que você aplicará todas as suas alterações a um draftState temporário, que é uma cópia profunda do currentState. Assim que todas as suas mutações forem concluídas, o Simple Immuter produzirá o nextState com base nas mutações do draftState em cima do currentState. Isso significa que você pode interagir com os seus dados simplesmente modificando-os e mantendo todos os benefícios dos dados imutáveis, isto é, o nextState será um cópia profunda e imutável do currentState.
</p>
<h3>Exemplo 1</h3>
<img width="500" src="https://github.com/Cahmoraes/simple-immuter/blob/main/src/assets/images/example-1.png">
<h3>Resultado</h3>
<img src="https://github.com/Cahmoraes/simple-immuter/blob/main/src/assets/images/result-1.png">

<p>
  O baseState não será alterado, mas o nextState será uma nova árvore imutável que reflete todas as alterações feitas no draftState (e compartilhando estruturalmente as coisas que não foram alteradas).
</p>

<h3>produce</h3>
<p>produce(currentState[, object | array | producer: (draftState) => void]): nextState</p>
<ul>
  <li>
    <strong>currentState</strong>: Object | Array
  </li>
  <li>
    <strong>object</strong>: Se for passado um objeto, currentState deverá ser um objeto. O nextState será o resultado do merge entre currentState e object. 
  </li>
  <li>
    <strong>array</strong>: Se for passado um array, currentState deverá ser um array. O nextState será o resultado do merge entre currentState e array. 
  </li>
  <li>
    <strong>producer</strong>: Se for passado uma função, currentState pode ser um objeto ou um array. O draftState é um clone do currentState onde será alterado dentro da função producer. O nextState será o resultado do draftState em cima do currentState.
  </li>
  <li>
    Se o segundo parâmetro de produce for omitido, o nextState será um deepClone de currentState.
  </li>
</ul>

<h3>Exemplo 2</h3>
<p>
  Utilizando objetos criados a partir de classes e funções construtoras, os prototipos são herdados para os objetos criados a partir do produce.
</p>
<img width="500" src="https://github.com/Cahmoraes/simple-immuter/blob/main/src/assets/images/example-2.png">

<h3>Clonagem profunda de Array</h3>
<img src="https://github.com/Cahmoraes/simple-immuter/blob/main/src/assets/images/example-clone-array.png">

<h3>Clonagem profunda de Objeto</h3>
<p>baseState (objeto a ser clonado)</p>
<img src="https://github.com/Cahmoraes/simple-immuter/blob/main/src/assets/images/example-clone-object.png">
<p>nextState: (objeto clonado)</p>
<img src="https://github.com/Cahmoraes/simple-immuter/blob/main/src/assets/images/example-result-clone-object.png">
<p>
<strong>Observação:</strong> Estruturas de dados como Map e Set, possuem métodos para inserção, limpeza e remoção de elementos. Para garantir a imutabilidade do clone resultante, esses métodos são sobrescritos no processo de imutabilidade, que ocorre logo após o merge entre o baseState com o draftState.<br>
  Para refletir a remoção, adição ou limpeza dessas estruturas no nextState, é necessário realizá-la dentro da função producer.
</p>
## :computer: Tecnologias utilizadas

- [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
