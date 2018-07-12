from flask import Flask
import flask_restless
import flask_restless
import database

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

manager = flask_restless.APIManager(app, flask_sqlalchemy_db=database.db)
disease_blueprint = manager.create_api(database.Disease, methods=['GET'])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
