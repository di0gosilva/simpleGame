const canvas = document.getElementById("jogoCanva")
const context = canvas.getContext("2d")
let gameOver = false
let gravidade = 0.6

document.addEventListener("click", (e) => {
    if (gameOver) {
        location.reload()
    } 
})

document.addEventListener("keypress", (e) => {
    if(e.code == "Space" && personagem.pulando == false) {
        personagem.velocidadey = -15
        personagem.pulando = true
    }
})     

const personagem = {
    posicaox: 100,
    posicaoy: canvas.height - 20,
    width: 20,
    height: 20,
    velocidadey: 0,
    pulando: false,
    noChao: true
}

function desenhaPersonagem() {
    context.fillStyle = "yellow"
    context.fillRect(
        personagem.posicaox, 
        personagem.posicaoy, 
        personagem.width, 
        personagem.height
    )
}

function atualizaPersonagem() {
    if(personagem.pulando) {
        personagem.velocidadey += gravidade 
        personagem.posicaoy += personagem.velocidadey

        if (personagem.posicaoy >= canvas.height - 20) {
            personagem.posicaoy = canvas.height - 20
            personagem.velocidadey = 0
            personagem.pulando = false
        }
    }
}

const obstaculo = {
    posicaox: canvas.width - 50,
    posicaoy: canvas.height - 100,
    width: 20,
    height: 100,
    velocidade: 2,
}

function desenhaObstaculo() {
    context.fillStyle = "red"
    context.fillRect(
        obstaculo.posicaox, 
        obstaculo.posicaoy, 
        obstaculo.width, 
        obstaculo.height
    )
}

function atualizaObstaculo() {
    obstaculo.posicaox -= obstaculo.velocidade
    if (obstaculo.posicaox <= 0 - obstaculo.width) {
        let altura_random = (Math.random() * 50) + 90
        obstaculo.posicaox = canvas.width - 50
        obstaculo.height = altura_random
        obstaculo.posicaoy = canvas.height - altura_random
        obstaculo.velocidade += 0.5
    }
}

function verificaColisao() {
    if(
        personagem.posicaox < obstaculo.posicaox + obstaculo.width &&
        personagem.posicaox + personagem.width > obstaculo.posicaox &&
        personagem.posicaoy < obstaculo.posicaoy + obstaculo.height &&
        personagem.posicaoy + personagem.height > obstaculo.posicaoy
    ) {
        houveColisao()
    } 
}

function houveColisao() {
    obstaculo.velocidade = 0
    atualizaObstaculo()
    context.fillStyle = 'red'
    context.fillRect((canvas.width/2)-100, (canvas.height/2)-50, 200, 100)
    context.fillStyle = "black"
    context.font = "25px Arial"
    context.fillText("Game Over", (canvas.width/2)-65, (canvas.height/2)+5)
    gameOver = true
}

function loop() {    
    context.clearRect(0, 0, canvas.width, canvas.height)
    atualizaObstaculo()
    desenhaObstaculo()
    atualizaPersonagem()
    desenhaPersonagem() 
    verificaColisao()
    requestAnimationFrame(loop)
}

loop()