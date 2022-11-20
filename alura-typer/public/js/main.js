var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao")

$(document).ready (function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
   var frase = $(".frase").text();
var numPalavras = frase.split(" ").length; 
var tamanhoFrase = $("#tamanho-frase"); 
tamanhoFrase.text(numPalavras); 
}



 

function inicializaContadores(){
 campo.on("input", function(){
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    var qtdCaracteres = conteudo.length;
    $("#contador-palavras").text(qtdPalavras)
    $("#contador-caracteres").text(qtdCaracteres);
})   
}


function inicializaCronometro(){
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(cronometroID); 
                finalizaJogo();
            }  
        }, 1000);
    });  
}

function finalizaJogo(){
    campo.attr("disabled",true); 
    campo.addClass("campo-desativado")
    inserePlacar();
}


function inicializaMarcadores(){
    var frase = $(".frase").text();
    campo.on("input",function(){
       var digitado = campo.val();
       var comparavel = frase.substr(0,digitado.length);
       console.log("Digitado:" + digitado);
       console.log("Frase C.:" + comparavel);
       if(digitado == comparavel){
            campo.addClass("borda-verde")
            campo.removeClass("borda-vermelha");
       }else{
           campo.addClass("borda-vermelha")
           campo.removeClass("borda-verde");
       }
    });
}
function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Welligton";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>"
    var linha = "<tr>" +
                    "<td>" + usuario + "</td>"+
                    "<td>" + numPalavras + "</td>"+
                    "<td>" + botaoRemover + "</td>"+
                "</tr>";

    corpoTabela.prepend(linha)
}
$(".botao-remover").click(function(event){
    event.preventDefault();
    $(this).parent().parent().remove();
});
function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    campo.addClass("campo-ativado")
    inicializaCronometro();
    campo.removeClass("borda-vermelha")
    campo.removeClass("borda-verde")
     
} 

 
 
 