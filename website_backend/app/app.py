from flask import Flask
import flask_restless
from database import app as app
from database import db as db
import database

db.create_all()
db.session.commit()
database.initDisease()
database.initCharity()
#database.initMedication()

@app.route('/')
def hello_world():
	return 'go to /api/disease to see our disease endpoint'

manager = flask_restless.APIManager(app, flask_sqlalchemy_db=database.db)
disease_blueprint = manager.create_api(database.Disease, methods=['GET'])
charity_blueprint = manager.create_api(database.Charity, methods=['GET'])
#medication_blueprint = manager.create_api(database.Medication, methods=['GET'])


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
