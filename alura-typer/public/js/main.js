var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

//li
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text(numPalavras);

console.log(tamanhoFrase)
console.log(frase)