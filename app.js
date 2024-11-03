import { 
    escolher_primeira_caixa, carregar_palavras, verificar_letra,
    verificar_se_palavra_existe, sortear_palavra, atualizar_linhas,
    selecionar_caixa, conferir_acerto, remover_listeners, mover_caixa
   } from './functions.js'
let caixaAtiva = { value: null }; 
let tentativas = 1
const caminho_arquivo = 'palavras.txt'
const palavras = await carregar_palavras(caminho_arquivo)
const palavra_sorteada = await sortear_palavra(palavras)

function pressionamento_tecla(caixaAtiva) {
   const caixas = document.getElementById(`row-${tentativas}`).querySelectorAll('.letter-box')
   document.addEventListener('keydown', (event) => {
       if (event.key === 'Enter'){
            event.preventDefault()
            confirmar_palavra()
       }
       if (event.key === 'Backspace'){
            if (!caixaAtiva.value){
                const ultima_caixa = caixas[caixas.length - 1]
                caixaAtiva.value = ultima_caixa
            }
            event.preventDefault()
            caixaAtiva.value.textContent = '' 
            mover_caixa(caixaAtiva, 'anterior')
       }
       if (event.key.length === 1 && /^[a-zA-Z]$/.test(event.key)) {
            if (!caixaAtiva.value) escolher_primeira_caixa(tentativas, caixaAtiva)
                caixaAtiva.value.textContent = event.key.toUpperCase()
            mover_caixa(caixaAtiva, 'seguinte')
            event.preventDefault()
       }
   });
}

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

   verificar_letra(boxes, palavra_sorteada)
   if (!conferir_acerto(palavra, palavra_sorteada)) {
       tentativas++
       if (tentativas >= 7) {
        alert('Infelizmente, você perdeu! A palavra era ' + palavra_sorteada.toUpperCase())
        return
    }
       const row_anteriror = document.getElementById(`row-${tentativas - 1}`)
       remover_listeners(row_anteriror)
       escolher_primeira_caixa(tentativas, caixaAtiva)
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