$("#botao-placar").click(mostraPlacar);
$("#botao-frase-sync").click(sincronizaPlacar);
 
function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Welligton";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>"
    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    console.log(posicaoPlacar)
    $("html").animate(
    {
        scrollTop: posicaoPlacar+"px"
    },1000)
}

function novaLinha(usuario, palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    // Icone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    return linha;
}
function removeLinha(event){
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    },1000) 
}

function mostraPlacar(){
    $(".placar").stop().slideToggle(600);
}

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        var score = {
            usuario:usuario,
            pontos:palavras, 
        };
        placar.push(score); 
    })

    var dados={
        placar: placar
    }; 

    $.post({
        url: 'http://localhost:3000/placar', 
        cache: false,
        method: 'POST', 
        data:dados,
        success: salvouPlacarNoServidor
    }).fail(
        function(){
            $("#erro").toggle();
            setTimeout(function(){
                $("#erro").toggle();
            },2500);
             
        }
    ).always(function(){
        $("#spinner").toggle();
    })
}
function salvouPlacarNoServidor(){
     alert("Dados Salvos!!")
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos)
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha)
        })
    })
}