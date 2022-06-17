// Desafio 1
function compareTrue(value1, value2) {
  return value1 && value2;
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(string) {
  let stringSeparada = string.split(' ');
  return stringSeparada;
}
// console.log(splitSentence('be Trybe'));

// Desafio 4
function concatName(array) {
  return array[array.length - 1] + ", " + array[0];
}

// console.log(concatName(['Foguete', 'Nao', 'Tem', 'Ré']));

// Desafio 5
function footballPoints(wins, ties) {
  return wins * 3 + ties;
}

// Desafio 6
function highestCount(numbers) {
  let highNumber = Math.max.apply(null, numbers);
  let allRepeats = 0;

  for (let index in numbers) {
    if (highNumber === numbers[index]) {
      allRepeats += 1;
    }
  }
  return allRepeats;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  if (Math.abs(mouse - cat1) < Math.abs(mouse - cat2)) {
    return "cat1"
  } else if (Math.abs(mouse - cat1) > Math.abs(mouse - cat2)) {
    return "cat2"
  } else if (Math.abs(mouse - cat1) === Math.abs(mouse - cat2)) {
    return "os gatos trombam e o rato foge";
  }
}

// Desafio 8
function fizzBuzz(array) {
  let resultArray = []
  for (let number of array) {
    if (number % 3 === 0 && number % 5 != 0) {
      resultArray.push("fizz")
    } else if (number % 3 != 0 && number % 5 === 0) {
      resultArray.push("buzz")
    } else if (number % 3 === 0 && number % 5 === 0) {
      resultArray.push("fizzBuzz")
    } else {
      resultArray.push("bug!")
    }
  }
  return resultArray;
}

/// Desafio 9
function encode(string) {
  
  let palavra1 = string.replace(/[a]/g, '1');
  let palavra2 = string.replace(/[e]/g, '2');
  let palavra3 = string.replace(/[i]/g, '3');
  let palavra4 = string.replace(/[o]/g, '4');
  let palavrafinal = palavra4.replace(/[u]/g, '5');
  return palavraFinal;
}
// console.log(enconde('hi there!'));

function decode(string) {

  let palavra1 = string.replace(/[1]/g, 'a');
  let palavra2 = palavra1.replace(/[2]/g, 'e');
  let palavra3 = palavra2.replace(/[3]/g, 'i');
  let palavra4 = palavra3.replace(/[4]/g, 'o');
  let palavraFinal = palavra4.replace(/[5]/g, 'u');
  return palavraFinal;
}
console.log(decode('h3 th2r2!'));


// Desafio 10
function techList() {
  // seu código aqui
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
