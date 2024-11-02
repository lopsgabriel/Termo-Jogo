function caixa_seguinte(caixaAtiva) {
    if (!caixaAtiva.value) return // Verifica se há uma caixa ativa

    const next_box = caixaAtiva.value.nextElementSibling
    caixaAtiva.value.classList.remove('letter-edit')
    caixaAtiva.value = next_box

    if (caixaAtiva.value && caixaAtiva.value.classList.contains('letter-box')) {
        caixaAtiva.value.classList.add('letter-edit')
    }
}
export function pressionamento_tecla(caixaAtiva) {
    document.addEventListener('keydown', (event) => {
        if (!caixaAtiva.value) return
        if (event.key.length === 1 && /^[a-zA-Z]$/.test(event.key)) {
            caixaAtiva.value.textContent = event.key.toUpperCase()
            caixa_seguinte(caixaAtiva)
            event.preventDefault()
        }
    });
}

export function atualizar_linhas(tentativas, caixaAtivaRef) {
    const nova_linha = document.getElementById(`row-${tentativas}`)
    if (!nova_linha) {
        console.error(`Linha ${tentativas} não encontrada!`)
        return
    }
    const boxes = nova_linha.querySelectorAll('.letter-box')
    boxes.forEach(box => box.classList.add('box-active'))
    boxes.forEach(box => {
        box.addEventListener('click', (event) => selecionar_caixa(event, caixaAtivaRef))
    })
}

export function selecionar_caixa(event, caixaAtivaRef) {
    if (caixaAtivaRef.value) {
        caixaAtivaRef.value.classList.remove('letter-edit')
    }
    caixaAtivaRef.value = event.target
    caixaAtivaRef.value.classList.add('letter-edit')
}

export function remover_listeners(elemento) {
    const novoElemento = elemento.cloneNode(true)
    elemento.parentNode.replaceChild(novoElemento, elemento)
}

export function conferir_acerto(palavra, palavra_sorteada) {
    return palavra.toUpperCase() === palavra_sorteada.toUpperCase()
}

export function errou_palavra(tentativas, caixaAtivaRef) {
    const nova_linha = document.getElementById(`row-${tentativas}`)
    const primeira_caixa = nova_linha.querySelector('.letter-box')  
    if (primeira_caixa) {
        if (caixaAtivaRef.value) {
            caixaAtivaRef.value.classList.remove('letter-edit')
        }
        primeira_caixa.classList.add('letter-edit')
        caixaAtivaRef.value = primeira_caixa
        atualizar_linhas(tentativas, caixaAtivaRef)
    } else {
        alert('Não há mais linhas para jogar. Fim de jogo.')
    }
}

export async function carregar_palavras(caminho_arquivo) {
    try {
        const response = await fetch(caminho_arquivo)       
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

export function verificar_letra2(boxes, palavra_sorteada) {
    palavra_sorteada = palavra_sorteada.toUpperCase();
    console.log('funcao verificar_letra2')

    const letrasDisponiveis = {};
    for (let letra of palavra_sorteada) {
        letrasDisponiveis[letra] = (letrasDisponiveis[letra] || 0) + 1;
    }
    console.log(letrasDisponiveis)

    boxes.forEach((box, index) =>{
        const letra = box.textContent.toUpperCase()
        if (letrasDisponiveis[letra] > 0) {
            console.log(`${letra}, posicao ${index}`)
            if (palavra_sorteada.toUpperCase()[index] === letra) {
                box.classList.add('letter-right-position')
                letrasDisponiveis[letra]--;
            } else if (palavra_sorteada.toUpperCase().includes(letra)) {
                box.classList.add('letter-included')
            } else {
                console.log(` A Letra ${letra} não existe na palavra`)
            }   
        }
    })

}

export function verificar_letra(box, indice, palavra_sorteada) {
    const letra = box.textContent.toUpperCase()

    if (letra === palavra_sorteada.toUpperCase()[indice]) {
        box.classList.add('letter-right-position')
    } else if (palavra_sorteada.toUpperCase().includes(letra)) {
        box.classList.add('letter-included')
    } else {
        console.log(` A Letra ${letra} não existe na palavra`)
    }
}

export function verificar_se_palavra_existe(palavras, tentativas) {
    console.log('Verificando se palavra existe')
    const boxes = document.getElementById(`row-${tentativas}`).querySelectorAll('.letter-box')
    let palavra = ''
    boxes.forEach((box) => {
        const letra = box.textContent || ''
        palavra += letra
    }) 
    if (palavras.includes(palavra.toLocaleLowerCase())) {
        console.log(palavra)
        return true
    }
}

export function sortear_numero(numMax) {
    return Math.floor(Math.random() * numMax)
}

export function sortear_palavra(palavras) {
    if (!Array.isArray(palavras) || palavras.length === 0) {
        console.error('Nenhuma palavra carregada.') 
        return ''
    }
    const numMax = palavras.length
    const numero = sortear_numero(numMax)
    const palavraEscolhida = palavras[numero]
    if (palavraEscolhida.length != 5) {
        return sortear_palavra(palavras)
    } else {
        console.log(palavraEscolhida)
        return palavraEscolhida
    }
}
