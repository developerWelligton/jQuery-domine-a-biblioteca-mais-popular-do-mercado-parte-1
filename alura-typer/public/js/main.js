var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

//li
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text(numPalavras);


var campo = $(".campo-digitacao")
campo.on("input", function(){
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    var qtdCaracteres = conteudo.length;
    $("#contador-palavras").text(qtdPalavras)
    $("#contador-caracteres").text(qtdCaracteres);
})
console.log(campo)
 