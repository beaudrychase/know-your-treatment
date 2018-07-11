from flask import Flask
import database

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=database.db)
manager.create_api(Disease, methods=['GET'])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
