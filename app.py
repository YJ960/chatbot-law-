## 2023.01.23. joyujeong960@gmail.com
from flask import Flask, render_template

app = Flask(__name__)

## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=3000, debug=True)
