$("#botao-frase").click(fraseAleatoria); 
$("#botao-frase-id").click(buscaFrase); 

function fraseAleatoria(){ 
    $("#spinner").show();

    $.get({
        url: 'http://localhost:3000/frases',
        contentType: 'application/json',
        cache: false,
        method: 'GET',
        dataType: 'json',
        success: trocaFraseAleatoria
    }).fail(
        function(){
            $("#erro").toggle();
            setTimeout(function(){
                $("#erro").toggle();
            },2500);
             
        }
    ).always(function(){
        $("#spinner").hide();
    })
}

function buscaFrase(){
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val(); 
    var dados = { id: fraseId}

   
    $.get({
        url: 'http://localhost:3000/frases',
        contentType: 'application/json',
        cache: false,
        method: 'GET',
        dataType: 'json',
        data:dados,
        success: trocaFrase
    }).fail(
        function(){
            $("#naoEncontrado").toggle();
            setTimeout(function(){
                $("#naoEncontrado").toggle();
            },2500);
             
        }
    ).always(function(){
        $("#spinner").toggle();
    })
}

function trocaFrase(data){ 
    if(data.length > 1){ 
        $("#EncontradoNaoEspecificado").show(); 
    }else{
        $("#EncontradoNaoEspecificado").hide();
        var frase = $(".frase");
        frase.text(data.texto);
        atualizaTamanhoFrase();
        atualizaTempoInicial(data.tempo); 
    } 
}
 


function trocaFraseAleatoria(data){
 
    var numeroAleatorio = Math.floor(Math.random() * data.length)
    frase.text(data[numeroAleatorio].texto)
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}