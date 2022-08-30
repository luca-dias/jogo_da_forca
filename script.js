//Seletores e variáveis

var palavras = ['TECNOLOGIA', 'TRABALHO', 'FILME', 'COMIDA', 'FERIAS', 'MUSICA', 'ELEFANTE'];
const letrasPossiveis = ['A','B','C','D','E','F','G','H','I','J','L','M','N','O','P','Q','R','S','T','U','V','X','Z']
var letras;
var palavraCorreta;
var palavraSecreta;
var erros;

function salvarPalavra() {

    const input = document.getElementById("entrada-palavra");
    const palavraAdicionada = input.value.toUpperCase();

    if (palavraAdicionada.length >=5 && palavraAdicionada.length <=9){
        if (palavras.includes(palavraAdicionada)) {
            input.value = '';
            alert("Esta palavra já está incusa no jogo, por favor tente outra palavra!");
        } else {
            palavras.push(palavraAdicionada);
            input.value = '';
            console.log(palavras)
            alert("A palavra foi salva com sucesso!")

        }
    } else {
        alert("Digite uma palavra de 5 a 8 caracteres.")
        input.value = ''
    }
}
// escolher palavras aleatórias
function escolherPalavraSecreta() {
    var palavra = palavras[Math.floor(Math.random() * palavras.length)]
    palavraSecreta = palavra;
    return palavra
}

//desenhando traços com canvas
function escreverTracinhos() {
    var tabuleiro = document.getElementById('forca').getContext('2d');
    tabuleiro.clearRect(0, 0, 1200, 400);
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = 'round';
    tabuleiro.lineJoin = 'round';
    tabuleiro.strokeStyle = '#0A3871';
    tabuleiro.beginPath();

    var eixo = 600/palavraSecreta.length;
    for(let i = 0; i < palavraSecreta.length; i++) {
        tabuleiro.moveTo(500 + (eixo * i), 300);
        tabuleiro.lineTo(550 + (eixo * i), 300);
    }
    tabuleiro.stroke();
    tabuleiro.closePath();
}

function jogar() {
    letras = [];
    palavraCorreta = '';
    erros = 9;

    escolherPalavraSecreta();
    escreverTracinhos();
    document.addEventListener("keydown", (e) => {
        var letraClicada = e.key.toUpperCase();
        verificarLetraCorreta(letraClicada);
        letras.push(letraClicada)
    });
}

function escreverLetraCorreta(index) {
    var tabuleiro = document.getElementById('forca').getContext('2d');
    tabuleiro.font = 'bold 52px Inter';
    tabuleiro.lineWidth = 6;
    tabuleiro.lineJoin = 'round';
    tabuleiro.lineCap = 'round'
    tabuleiro.strokeStyle = '#0A3871';

    var eixo = 600/palavraSecreta.length;
    tabuleiro.fillText(palavraSecreta[index], 505 + (eixo * index), 290);
    tabuleiro.stroke()
}

function escreverLetraIncorreta(letra, errorsLeft){
    var tabuleiro = document.getElementById('forca').getContext('2d');
    tabuleiro.font = 'bold 40px Inter';
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = 'round';
    tabuleiro.Join = 'round';
    tabuleiro.strokeStyle = '#0A3871';
    tabuleiro.fillText(letra, 535+(40*(10-errorsLeft)), 350, 40);
}

function verificarLetraCorreta(key) {
    if (erros > 1 && palavraCorreta.length != palavraSecreta.length) {
        if(letrasPossiveis.includes(key) && !letras.includes(key)) {
            if (palavraSecreta.includes(key)) {
                for (let i = 0; i < palavraSecreta.length; i ++) {
                    if (palavraSecreta[i] === key) {
                        escreverLetraCorreta(i);
                        adicionarLetraCorreta(palavraSecreta.indexOf(key))
                    }
                }
            } 
            else {
                adicionarLetraIncorreta(key);
                escreverLetraIncorreta(key, erros)
            }
        }
    }
}

function adicionarLetraCorreta(i) {
    palavraCorreta += palavraSecreta[i]
    setTimeout(function () {
        if(palavraCorreta.length == palavraSecreta.length) {
            desenhaVoceGanhou();
        }
    }, 500);
}

function adicionarLetraIncorreta(letter) {
    if(palavraSecreta.indexOf(letter) <=0) {
        erros -= 1;
        desenhaForca(erros);
    }
}

function desenhaVoceGanhou() {
    var tabuleiro = document.getElementById('forca').getContext('2d');
    var frase = "Você Ganhou!"
    tabuleiro.font = "bold 42px Inter";
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.fillStyle = "#0A3871";
    tabuleiro.fillText(frase, 125, 250)
}

 function desenhaVocePerdeu() {
    var tabuleiro = document.getElementById('forca').getContext('2d');
    var frase = "Você Perdeu!";
    tabuleiro.font = "bold 42px Inter";
    tabuleiro. lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.fillStyle = "#0A3871";
    tabuleiro.fillText(frase, 125, 250);
 }

function desenha(x, y, x2, y2) {
    var tabuleiro = document.getElementById('forca').getContext('2d');
    tabuleiro.moveTo(x, y);
    tabuleiro.lineTo(x2, y2);
    tabuleiro.stroke();
    tabuleiro.closePath();
}

function desenhaForca(erros) {
    var tabuleiro = document.getElementById('forca').getContext('2d');
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = 'round';
    tabuleiro.Join = 'round';
    tabuleiro.strokeStyle = '#0A3871';
    tabuleiro.beginPath();

    if (erros == 8) {
        desenha(490, 290, 490, 10);
    }
    if (erros == 7) {
        desenha(490, 10, 630, 10);
    }
    if (erros == 6) {
        tabuleiro.arc(630, 50, 30, 0, 2*Math.PI);
        tabuleiro.stroke();
        tabuleiro.closePath();
    }
    if (erros == 5) {
        desenha(630, 80, 630, 185);
    }
    if (erros == 4) {
        desenha(630, 105, 580, 135);
    }
    if (erros == 3) {
        desenha(630, 105, 680, 135);
    }
    if (erros == 2){
        desenha(630, 185, 680, 215);
    }
    if (erros == 1 ){
        desenha(630, 185, 580, 215);

        setTimeout(function () {
            desenhaVocePerdeu();
        }, 500)
    }
    
}
