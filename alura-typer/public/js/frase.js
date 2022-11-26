$("#botao-frase").click(fraseAleatoria); 

function fraseAleatoria(){ 

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
    );
}
 


function trocaFraseAleatoria(data){
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length)
    frase.text(data[numeroAleatorio].texto)
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}