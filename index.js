let X = [];
let Y = [];

function captureValues() {
  const inputs = document.querySelectorAll('#minhaTabela input[type="text"]');

  inputs.forEach(function(input) {
    input.addEventListener('input', function() {
      if(this.name === 'campo1[]') {
        X.push(this.value);
      } else {
        Y.push(this.value);
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', captureValues);
const A = [
  [3, 2, -4, 2],
  [2, 3, 3, 4],
  [5, -3, 5, 6],
  [5, -3, 3, 8]
];

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

const sum = (column) => {
  return column.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

const resultX = splitDefault(xy, 0).map(value => +value.toFixed(2)); 
const resultY = splitDefault(xy, 1).map(value => +value.toFixed(2)); 
const resultXY = calcXY(xy).map(value => +value.toFixed(2)); 
const resultX2 = calcX2(xy).map(value => +value.toFixed(2));

const sumX = sum(resultX);
const sumY = sum(resultY);
const sumXY = sum(resultXY);
const sumX2 = sum(resultX2);

const sumFull = [sumX, sumY, sumXY, sumX2];

console.table({
  "X": resultX,
  "Y": resultY,
  "X*Y": resultXY,
  "X²": resultX2,
  "R:": sumFull
});

const formula = `a${sumFull[3]} + b${sumFull[0]} = ${sumFull[2]}`;
console.log(formula);

const b = [1, 1, 2, 3];

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
