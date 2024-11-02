import { 
     errou_palavra, carregar_palavras, verificar_letra,
     verificar_se_palavra_existe, sortear_palavra, atualizar_linhas,
     selecionar_caixa, conferir_acerto, remover_listeners, pressionamento_tecla,
     verificar_letra2
    } from './functions.js'
let caixaAtiva = { value: null }; 
let tentativas = 1
const caminho_arquivo = 'palavras.txt'
const palavras = await carregar_palavras(caminho_arquivo)
const palavra_sorteada = await sortear_palavra(palavras)

function confirmar_palavra() {
    const boxes = document.getElementById(`row-${tentativas}`).querySelectorAll('.letter-box')
    let palavra = ''
    let palavra_completa = true
    if (caixaAtiva.value) {
        caixaAtiva.value.classList.remove('letter-edit')
    }

    boxes.forEach((box) => {
        if(!box.textContent){
            palavra_completa = false
        } else {
            const letra = box.textContent || '';
            palavra += letra.toUpperCase()
        }
    }) 

    if (!palavra_completa) {
        alert('Palavra incompleta')
        return
    }
    if (!verificar_se_palavra_existe(palavras, tentativas)) {
        alert('Palavra não existe')
        return
    }

    verificar_letra2(boxes, palavra_sorteada)
    
    // boxes.forEach((box, index) => {
    //     verificar_letra(box, index, palavra_sorteada)
    // });

    if (!conferir_acerto(palavra, palavra_sorteada)) {
        tentativas++
        const row_anteriror = document.getElementById(`row-${tentativas - 1}`)
        remover_listeners(row_anteriror)
        errou_palavra(tentativas, caixaAtiva)
    } else {
        alert('Parabéns, você acertou a palavra!')
    }
}


async function main() {
    atualizar_linhas(tentativas, caixaAtiva)
    pressionamento_tecla(caixaAtiva)
    document.getElementById(`row-${tentativas}`).querySelectorAll('.letter-box').forEach(box => {
        box.addEventListener('click', (event) => selecionar_caixa(event, caixaAtiva));
    });
    document.getElementById('confirmar-palavra').addEventListener('click', confirmar_palavra)
}
main()