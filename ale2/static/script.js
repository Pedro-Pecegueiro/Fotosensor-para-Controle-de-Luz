function enviarDados() {
    // Pega o valor atual do controle deslizante
    let ldr = document.getElementById('ldrInput').value;
    document.getElementById('ldrValor').innerText = ldr;

    // Comunica com o back-end em Python
    fetch(`/api/calcular?ldr=${ldr}`)
    .then(response => response.json())
    .then(data => {
        // Atualiza o texto na tela
        document.getElementById('pwmValor').innerText = data.pwm;
        
        // Atualiza a cor e o brilho do LED
        let intensidade = data.pwm / 255;
        let led = document.getElementById('ledVisual');
        
        led.style.backgroundColor = `rgba(255, 255, 0, ${intensidade})`;
        led.style.boxShadow = `0 0 ${intensidade * 80}px rgba(255, 255, 0, ${intensidade})`;
    })
    .catch(error => console.error("Erro de comunicação com a API:", error));
}

// Roda a função assim que a página carrega
window.onload = enviarDados;