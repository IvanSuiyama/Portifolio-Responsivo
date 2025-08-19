from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = 'ivan'

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()


'''
Colocar uma foto mais profissional, adicionar
mecanismo de enviar email, adcionar listas de type e Java,
listas de javascript, projetinhos em Python, Arrumar seção de sobre. Colocar mais animações,
quando clicar na foto, expandir o tamanho (nos projetos), adicionar aplicativo'''