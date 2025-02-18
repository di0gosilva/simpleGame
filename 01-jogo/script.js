const canvas = document.getElementById("jogoCanva")
const context = canvas.getContext("2d")

document.addEventListener("click", (e) => {
    if (gameOver) {
        location.reload()
    } 
})

let gameOver = false

const personagem = {
    posicaox: 35,
    posicaoy: canvas.height - 15,
    width: 15,
    height: 15,
}

function desenhaPersonagem() {
    context.fillStyle = "lightgreen"
    context.fillRect(
        personagem.posicaox, 
        personagem.posicaoy, 
        personagem.width, 
        personagem.height
    )
}

const obstaculo = {
    posicaox: canvas.width - 50,
    posicaoy: canvas.height - 100,
    width: 15,
    height: 100,
    velocidade: 5,
}

function desenhaObstaculo() {
    context.fillStyle = "green"
    context.fillRect(
        obstaculo.posicaox, 
        obstaculo.posicaoy, 
        obstaculo.width, 
        obstaculo.height
    )
}

function atualizaObstaculo() {
    obstaculo.posicaox -= obstaculo.velocidade
}

function verificaColisao() {
    if(
        personagem.posicaox < obstaculo.posicaox + obstaculo.width && personagem.posicaox + personagem.width +2 > obstaculo.posicaox
    ) {
        colidiu()
    }
}

function colidiu() {
    obstaculo.velocidade = 0
    atualizaObstaculo()
    context.fillStyle = 'lightgreen'
    context.fillRect((canvas.width/2)-100, (canvas.height/2)-50, 200, 100)
    context.fillStyle = "black"
    context.font = "25px Arial"
    context.fillText("Game Over", (canvas.width/2)-65, (canvas.height/2)+5)
    gameOver = true
}

function loop() {    
    context.clearRect(0, 0, canvas.width, canvas.height)
    desenhaObstaculo()
    atualizaObstaculo()
    desenhaPersonagem()
    verificaColisao()
    console.log(obstaculo.posicaox)
    requestAnimationFrame(loop)
}

loop()