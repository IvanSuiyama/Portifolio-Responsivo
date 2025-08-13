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
listas de javascript,'''