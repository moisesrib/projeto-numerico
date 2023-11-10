// let X = [];
// let Y = [];
let X = [2, 3, 6, 10];
let Y = [1, 4, 7, 2];

const A = [
  [54, 14],
  [14,4],
];

const b = [93.85, 23.95];

function calcular(){
  const inputsX = document.querySelectorAll('#minhaTabela input[name="campo1[]"]');
  const inputsY = document.querySelectorAll('#minhaTabela input[name="campo2[]"]');

  // inputsX.forEach((input, index) => {
  //     X[index] = parseFloat(input.value) || 0;
  // });

  // inputsY.forEach((input, index) => {
  //     Y[index] = parseFloat(input.value) || 0;
  // });

  const typeFunction = verificarFuncao(Y);
  

  if(typeFunction == 1){
    console.log("Função de primeiro grau");
    calcPrimaryGrau();
  }else if(typeFunction == 2){
    console.log("Função de segundo grau");
    calcSegundoGrau();
  }else{
    alert("Não é possível determinar ou função de grau superior");
  }
}

function captureValues() {
  const inputsX = document.querySelectorAll('#minhaTabela input[name="campo1[]"]');
  const inputsY = document.querySelectorAll('#minhaTabela input[name="campo2[]"]');

  // Adiciona event listeners para capturar os valores
  inputsX.forEach((input, index) => {
    input.addEventListener('input', function() {
      X[index] = parseFloat(input.value) || 0; // Garante que é um número
    });
  });

  inputsY.forEach((input, index) => {
    input.addEventListener('input', function() {
      Y[index] = parseFloat(input.value) || 0; // Garante que é um número

      console.log(Y);
    });
  });
  
}
// document.addEventListener('DOMContentLoaded', captureValues);

function calcPrimaryGrau(){
  const xy = mergeXY();

  const multiplyXY = calcXY(xy);
  const multiplyX2 = calcX2(xy);

  const sumX = sum(X);
  const sumY = sum(Y);
  const sumXY = sum(multiplyXY);
  const sumX2 = sum(multiplyX2);

  console.table({
    "X": X,
    "Y": Y,
    "X*Y": multiplyXY,
    "X²": multiplyX2,
    "R:": [sumX, sumY, sumXY, sumX2]
  });

  const formulaA = [[sumX2, sumX], [sumX, X.length]];
  const resultados = [sumXY, sumY];

  const solveTest = numeric.solve(formulaA, resultados);

  console.log(solveTest);

}

function calcSegundoGrau(){
  const xy = mergeXY();

  const multiplyXY = calcXY(xy);
  const multiplyX2 = calcX2(xy);
  const multiplyX2Y = calcX2Y(xy);
  const multiplyX3 = calcX3(xy);
  const multiplyX4 = calcX4(xy);

  const sumX = sum(X);
  const sumY = sum(Y);
  const sumXY = sum(multiplyXY);
  const sumX2 = sum(multiplyX2);
  const sumX2Y =  sum(multiplyX2Y);
  const sumX3 = sum(multiplyX3);
  const sumX4 = sum(multiplyX4);

  console.table({
    "X": X,
    "Y": Y,
    "X*Y": multiplyXY,
    "X²": multiplyX2,
    "X²*Y": multiplyX2Y,
    "X³": multiplyX3,
    "X⁴": multiplyX4,
    "R:": [sumX, sumY, sumXY, sumX2, sumX2Y, sumX3, sumX4]
  });

  const formulaA = [[sumX2, sumX, X.length], [sumX3, sumX2, sumX], [sumX4, sumX3, sumX2]];

  const resultados = [sumY, sumXY, sumX2Y];

  const solveTest = numeric.solve(formulaA, resultados);

  console.log(solveTest);

}

function mergeXY() {
  const xy = X.map((value, index) => [value, Y[index]]);
  return xy;
}

const xy = [
  [1, 6],
  [2, 4.9],
  [3, 7.1],
  [4, 8.95]
];

const splitDefault = (xy, num) => {
  return xy.map(value => value[num]);
}

const calcXY = (xy) => {
  return xy.map(value => value[0] * value[1]);
};


const calcX2 = (xy) => {
  return xy.map(value => value[0] * value[0]);
};

const calcX2Y = (xy) => {
  return xy.map(value => value[0] * value[0] * value[1]);
};

const calcX3 = (xy) => {
  return xy.map(value => value[0] * value[0] * value[0]);
}

const calcX4 = (xy) => {
  return xy.map(value => value[0] * value[0] * value[0] * value[0]);
}

const sum = (column) => {
  return column.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

const resultX = splitDefault(xy, 0).map(value => +value.toFixed(2)); 
const resultY = splitDefault(xy, 1).map(value => +value.toFixed(2)); 
const resultXY = calcXY(xy).map(value => +value.toFixed(2)); 
const resultX2 = calcX2(xy).map(value => +value.toFixed(2));

// const sumX = sum(resultX);
// const sumY = sum(resultY);
// const sumXY = sum(resultXY);
// const sumX2 = sum(resultX2);

// const sumFull = [sumX, sumY, sumXY, sumX2];

// console.table({
//   "X": resultX,
//   "Y": resultY,
//   "X*Y": resultXY,
//   "X²": resultX2,
//   "R:": sumFull
// });

// const formula = `a${sumFull[3]} + b${sumFull[0]} = ${sumFull[2]}`;
// console.log(formula);
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

// Desenha o grid
function drawGrid() {
    const step = 50; // espaçamento entre as linhas
    ctx.beginPath();
    for(let i = step; i < canvas.width; i += step) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    ctx.strokeStyle = '#ddd'; // cor das linhas do grid
    ctx.stroke();

    // Desenha os eixos X e Y
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.strokeStyle = '#000'; // cor dos eixos
    ctx.stroke();
}

// Desenha os números nos eixos
function drawAxisNumbers() {
    const step = 50; 
    const scale = 1;  // escala dos números

    for(let i = canvas.width / 2 + step; i < canvas.width; i += step) {
        ctx.fillText((i - canvas.width / 2) / step * scale, i, canvas.height / 2 + 15);
    }
    for(let i = canvas.width / 2 - step; i > 0; i -= step) {
        ctx.fillText(-(canvas.width / 2 - i) / step * scale, i, canvas.height / 2 + 15);
    }
    for(let i = canvas.height / 2 + step; i < canvas.height; i += step) {
        ctx.fillText(-(i - canvas.height / 2) / step * scale, canvas.width / 2 - 20, i);
    }
    for(let i = canvas.height / 2 - step; i > 0; i -= step) {
        ctx.fillText((canvas.height / 2 - i) / step * scale, canvas.width / 2 - 20, i);
    }
}

function plotPoint(x, y, color = 'red') {
  const scale = 50; // escala do gráfico
  ctx.beginPath();
  ctx.arc(canvas.width / 2 + x * scale, canvas.height / 2 - y * scale, 5, 0, 2 * Math.PI);
  ctx.fillStyle = color; 
  ctx.fill();
}

// Desenha uma linha entre dois pontos
function drawLine(x1, y1, x2, y2, color = 'blue') {
  const scale = 50; // escala do gráfico
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 + x1 * scale, canvas.height / 2 - y1 * scale);
  ctx.lineTo(canvas.width / 2 + x2 * scale, canvas.height / 2 - y2 * scale);
  ctx.strokeStyle = color;
  ctx.stroke();
}

drawGrid();
drawAxisNumbers();

// Solução do sistema
const x = numeric.solve(A, b);

x.forEach((value, index, array) => {
  plotPoint(index, value);
  if (index < array.length - 1) {
      drawLine(index, value, index + 1, array[index + 1]);
  }
});

// Agora vamos criar outros pontos baseados em a e b e conectá-los
const points = [
  {x: 4, y: 2, color: 'green'},
  {x: 2, y: 3, color: 'green'},
  {x: 2, y: 6, color: 'green'},
  {x: 2, y: 5, color: 'green'}
  // Você pode adicionar mais pontos aqui se necessário
];

points.forEach((point, index, array) => {
  plotPoint(point.x, point.y, point.color);
  if (index < array.length - 1) {
      drawLine(point.x, point.y, array[index + 1].x, array[index + 1].y, point.color);
  }
});

// Função para adicionar colunas e remover
function adicionarLinha() {
  var table = document.getElementById("minhaTabela");
  var rowCount = table.rows.length;

  // Remove o botão de adição da linha atual
  var lastRow = table.rows[rowCount - 1];
  lastRow.cells[2].innerHTML = '';
  

  // Adiciona a nova linha com o botão de adição
  var newRow = table.insertRow(rowCount);
  newRow.innerHTML = '<td><input type="text" name="campo1[]"></td>' +
                     '<td><input type="text" name="campo2[]"></td>' +
                     '<td><span class="btn-control btn-add" onclick="adicionarLinha()">+</span>' +
                     '<span class="btn-control btn-remove" onclick="removerLinha(this)">-</span></td>';
}

function removerLinha(element) {
  var row = element.parentNode.parentNode;
  var table = document.getElementById("minhaTabela");
  var rowCount = table.rows.length;
  console.log(row.rowIndex)
  // Impede a remoção da primeira linha
  if (row.rowIndex === 0) {
    return; // Não faz nada se for a primeira linha
  }

  // Remove a linha selecionada se não for a única linha da tabela
  table.deleteRow(row.rowIndex);

  // Sempre mantém o botão de adição na última linha após a remoção
  rowCount = table.rows.length; // Atualiza a contagem de linhas após a remoção
  if (rowCount > 4) {
    var lastRow = table.rows[rowCount - 1];
    lastRow.cells[2].innerHTML = '<span class="btn-control btn-add" onclick="adicionarLinha()">+</span>' +
                                 '<span class="btn-control btn-remove" onclick="removerLinha(this)">-</span>';
  } else {
    // Se após a remoção restar apenas uma linha, ela não terá o botão de remoção
    table.rows[3].cells[2].innerHTML = '<span class="btn-control btn-add" onclick="adicionarLinha()">+</span>';
  }
}

function verificarFuncao(y) {

for(let i = 0; i < y.length; i++){
  if(y[i] > y[i+1]){
    console.log(y[i]);
    return 2;
  }
}

for(let j = 0; j < y.length; j++){
  if(y[j] < y[j+1]){
    return 1;
  }
}
 
}
