const caminho_arquivo = 'palavras.txt'
const palavras = await carregar_palavras(caminho_arquivo)
const palavra_sorteada = await sortear_palavra(palavras)
let tentativas = 1

function comparar_palavras(palavra) {
    if (palavra === palavra_sorteada.toUpperCase()) {
        return true
    } else {
        return false
    }
}

function errou_palavra() {
    tentativas++
    atualizar_linhas()
}

async function carregar_palavras() {
    try {
        const response = await fetch('./palavras.txt')       
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo de palavras: ${response.statusText}`)
        }

        const palavras = await response.text()
        return palavras.split(/\r?\n/)
    } catch (erro) {
        console.error(erro)
        return []
    }
}

function verificar_letra(box, indice) {
    const letra = box.textContent
    if (letra === palavra_sorteada.toUpperCase()[indice]) {
        box.classList.add('letter-right-position')
    } else if (palavra_sorteada.toUpperCase().includes(letra)) {
        box.classList.add('letter-included')
    } else {
        console.log(` A Letra ${letra} não existe na palavra`)
    }
}

function verificar_se_palavra_existe() {
    console.log('Verificando se palavra existe')
    const boxes = document.getElementById(`row-${tentativas}`).querySelectorAll('.letter-box')
    let palavra = ''
    boxes.forEach((box) => {
            const letra = box.textContent || '';
            palavra += letra
    }) 
    if ( palavras.includes(palavra.toLocaleLowerCase()) ) {
        console.log(palavra)
        return true
    }
}

function sortear_numero(numMax){
    return Math.floor(Math.random() * numMax)
}

function sortear_palavra(palavras){
    if (!Array.isArray(palavras) || palavras.length === 0) {
        console.error('Nenhuma palavra carregada.'); 
        return '';
    }

    const numMax = palavras.length
    const numero = sortear_numero(numMax)
    const palavraEscolhida = palavras[numero]

    if (palavraEscolhida.length !=  5){
        return sortear_palavra(palavras)
    } else {
        console.log(palavraEscolhida)
        return palavraEscolhida
    }
}

export { 
    sortear_palavra, carregar_palavras, verificar_se_palavra_existe,
     verificar_letra, comparar_palavras, errou_palavra
    }