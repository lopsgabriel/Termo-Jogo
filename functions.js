function sortear_numero(numMax){
    return Math.floor(Math.random() * numMax)
}

export function sortear_palavra(palavras){
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
        return palavraEscolhida
    }
}