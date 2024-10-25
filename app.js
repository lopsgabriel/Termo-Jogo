import { 
    sortear_palavra, carregar_palavras, verificar_se_palavra_existe,
     verificar_letra, comparar_palavras,
     errou_palavra
} from './functions.js'
let caixaAtiva = null; 

function atualizar_linhas(){
    const nova_linha = document.getElementById(`row-${tentativas}`);
    const boxes = document.getElementById(`row-${tentativas}`).querySelectorAll('.letter-box')
    boxes.forEach(box => box.classList.add('box-active'));
    nova_linha.querySelectorAll('.letter-box').forEach(box => {
        box.addEventListener('click', selecionar_caixa);
    });
}

function selecionar_caixa(event) {
    if (caixaAtiva) {
        caixaAtiva.classList.remove('letter-edit'); // Remove o destaque anterior
    }
    caixaAtiva = event.target; // Atualiza a caixinha ativa
    caixaAtiva.classList.add('letter-edit'); // Adiciona destaque à nova caixa ativa
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
    if (!verificar_se_palavra_existe()){
        alert('Palavra não existe')
        return
    }
    
    boxes.forEach((box, index) => {
        verificar_letra(box, index); // Chama verificar_letra apenas se a palavra estiver completa
    });
    if (!comparar_palavras(palavra)){
        errou_palavra()

        const primeira_caixa = document.getElementById(`row-${tentativas}`).querySelector('.letter-box')
        if (caixaAtiva) {
            caixaAtiva.classList.remove('letter-edit'); // Remove o destaque da caixa anterior
        }
        primeira_caixa.classList.add('letter-edit')
        caixaAtiva = primeira_caixa
    } else {
        alert('Parabéns, você acertou a palavra!')
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
        } else {
            caixaAtiva.classList.remove('letter-edit'); // Se não houver próxima, remove o destaque
            caixaAtiva = null; // Desativa a seleção
        }
    } else {
        alert('Selecione uma caixa e insira uma letra.'); // Feedback para o usuário se algo estiver errado
    }
}

async function main() {
    document.getElementById(`row-${tentativas}`).querySelectorAll('.letter-box').forEach(box => box.addEventListener('click', selecionar_caixa));
    document.getElementById('enviar-letra').addEventListener('click', adicionar_letra)
    document.getElementById('confirmar-palavra').addEventListener('click', confirmar_palavra)
    atualizar_linhas()
}
main()