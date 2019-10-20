import flask
from flask import *

from flask_cors import CORS

from Predict import ano

app = Flask(__name__)
CORS(app)

@app.route('/query')
def path():
        coin = request.args.get('coin')
        days = int(request.args.get('days'))

        krypton,arr=ano(coin,days)
        response={
            'kry':krypton,
            'act':arr[0],
            'pre':arr[1]
        }
        return jsonify(response)
