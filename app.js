import { 
    errou_palavra, carregar_palavras, verificar_letra,
    verificar_se_palavra_existe, sortear_palavra, atualizar_linhas,
    selecionar_caixa, conferir_acerto, remover_listeners
} from './functions.js'
let caixaAtiva = { value: null } 
let tentativas = 1
const caminho_arquivo = 'palavras.txt'
const palavras = await carregar_palavras(caminho_arquivo)
const palavra_sorteada = await sortear_palavra(palavras)

function confirmar_palavra() {
   const boxes = document.getElementById(`row-${tentativas}`).querySelectorAll('.letter-box')
   let palavra = ''
   let palavra_completa = true

   boxes.forEach((box) => {
       if(!box.textContent) {
           palavra_completa = false
       } else {
           const letra = box.textContent || ''
           palavra += letra
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
   
   boxes.forEach((box, index) => {
       verificar_letra(box, index, palavra_sorteada)
   })

   if (!conferir_acerto(palavra, palavra_sorteada)) {
       tentativas++
       const row_anteriror = document.getElementById(`row-${tentativas - 1}`)
       remover_listeners(row_anteriror)
       errou_palavra(tentativas, caixaAtiva)
   } else {
       alert('Parabéns, você acertou a palavra!')
   }
}

function adicionar_letra() {
   const input = document.getElementById('letra-input')
   const letter = input.value.toUpperCase()

   if (caixaAtiva.value && letter) {
       caixaAtiva.value.textContent = letter
       input.value = ''

       const next_box = caixaAtiva.value.nextElementSibling
       if (next_box && next_box.classList.contains('letter-box')) {
           caixaAtiva.value.classList.remove('letter-edit')
           caixaAtiva.value = next_box
           caixaAtiva.value.classList.add('letter-edit')
       } else {
           caixaAtiva.value.classList.remove('letter-edit')
           caixaAtiva.value = null
       }
   } else {
       alert('Selecione uma caixa e insira uma letra.')
   }
}

async function main() {
   atualizar_linhas(tentativas, caixaAtiva)

   document.getElementById(`row-${tentativas}`).querySelectorAll('.letter-box').forEach(box => {
       box.addEventListener('click', (event) => selecionar_caixa(event, caixaAtiva))
   })
   document.getElementById('enviar-letra').addEventListener('click', adicionar_letra)
   document.getElementById('confirmar-palavra').addEventListener('click', confirmar_palavra)
}
main()
