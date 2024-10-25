import { sortear_palavra } from './functions.js'
const caminho_arquivo = 'palavras.txt'
const palavras = await carregar_palavras(caminho_arquivo)
const palavra_sorteada = await sortear_palavra(palavras)
let tentativas = 1
let caixaAtiva = null; // Para rastrear a caixinha ativa

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

function selecionar_caixa(event) {
    if (caixaAtiva) {
        caixaAtiva.classList.remove('letter-edit'); // Remove o destaque anterior
    }
    caixaAtiva = event.target; // Atualiza a caixinha ativa
    caixaAtiva.classList.add('letter-edit'); // Adiciona destaque à nova caixa ativa
}

function atualizar_linhas(){
    const nova_linha = document.getElementById(`row-${tentativas}`);
    const boxes = document.getElementById(`row-${tentativas}`).querySelectorAll('.letter-box')
    boxes.forEach(box => box.classList.add('box-active'));
    nova_linha.querySelectorAll('.letter-box').forEach(box => {
        box.addEventListener('click', selecionar_caixa);
    });
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



function confirmar_palavra() {
    const boxes = document.getElementById(`row-${tentativas}`).querySelectorAll('.letter-box')
    let palavra = ''
    let palavra_completa = true
    boxes.forEach((box) => {
        if(!box.textContent){
            palavra_completa = false
        } else {
            const letra = box.textContent || '';
            palavra += letra
        }
    }) 
    if (!palavra_completa) {
        alert('Palavra incompleta')
        return
    }
    
    boxes.forEach((box, index) => {
        verificar_letra(box, index); // Chama verificar_letra apenas se a palavra estiver completa
    });
       
    if (palavra === palavra_sorteada.toUpperCase()) {
        alert('Parabéns, você acertou!')
    } else {
        tentativas++
        atualizar_linhas()
    }
}


function adicionar_letra() {
    const input = document.getElementById('letra-input')
    const letter = input.value.toUpperCase()

    if (caixaAtiva && letter) {
        caixaAtiva.textContent = letter; // Coloca a letra na caixinha ativa
        input.value = ''; // Limpa o input

        const next_box = caixaAtiva.nextElementSibling;
        if (next_box && next_box.classList.contains('letter-box')) {
            caixaAtiva.classList.remove('letter-edit');
            caixaAtiva = next_box;
            caixaAtiva.classList.add('letter-edit');
        }
    }
}



async function main() {
    document.getElementById(`row-${tentativas}`).querySelectorAll('.letter-box').forEach(box => box.addEventListener('click', selecionar_caixa));
    document.getElementById('enviar-letra').addEventListener('click', adicionar_letra)
    document.getElementById('confirmar-palavra').addEventListener('click', confirmar_palavra)
    atualizar_linhas()
    console.log(palavra_sorteada)
}
main()