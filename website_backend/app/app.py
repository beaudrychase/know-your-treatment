from flask import Flask
from flask_cors import CORS
import flask_restless
from database import app as app
from database import db as db
import database

def initialize():
	database.clearDB()
	db.create_all()
	db.session.commit()
	database.initDisease()
	database.initCharity()
	database.initTreatment(25)
	print('all tables initialized')

@app.route('/')
def home_page():
    return	'/api/disease/  --  ' + str([x.name for x in database.Disease.query.all()]) + '<br>' +\
   			'/api/charity/  --  ' + str([x.charityName for x in database.Charity.query.all()]) + '<br>' +\
    		'/api/treatment/  --  ' + str([x.name for x in database.Treatment.query.all()])

manager = flask_restless.APIManager(app, flask_sqlalchemy_db=database.db)
disease_blueprint = manager.create_api(database.Disease, methods=['GET'])
charity_blueprint = manager.create_api(database.Charity, methods=['GET'])
treatment_blueprint = manager.create_api(database.Treatment, methods=['GET'])

if __name__ == '__main__':
	initialize()
	CORS(app)
	# Make available to all domains
	app.run(host="0.0.0.0", port=80)
