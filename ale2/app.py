from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Rota principal: entrega o arquivo HTML que está na pasta /templates
@app.route('/')
def index():
    return render_template('index.html')

# Rota da API: faz o cálculo do ESP32
@app.route('/api/calcular')
def calcular():
    # Pega o valor do LDR (0 a 4095)
    valor_ldr = int(request.args.get('ldr', 0))
    
    # Lógica do PWM invertido (0 a 255)
    valor_pwm = 255 - int((valor_ldr / 4095) * 255)
    valor_pwm = max(0, min(255, valor_pwm)) # Limita entre 0 e 255
    
    return jsonify({
        "ldr": valor_ldr,
        "pwm": valor_pwm
    })

if __name__ == '__main__':
    print("Servidor rodando em http://127.0.0.1:5000")
    app.run(debug=True, use_reloader=False)