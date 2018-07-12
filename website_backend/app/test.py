from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

import json
import requests
import app as app_file
import unittest
import database
from database import app as app
from database import db as db


class FlaskrTestCase(unittest.TestCase):

	def setUp(self):
		#Assumes the database has already been initialized.
		
		print("hello")

	def test_diseases(self):
		sample_disease =   {"name" : "Sample Disease : WHO", 
							"symptoms" : "Sample Symptoms",
							"transmission" : "Sample Transmission",
							"diagnosis": "Sample Diagnosis",
							"treatment" : "Sample Treatment",
							"prevention" : "Sample Prevention",
							"more" : "Sample More",
							"is_active" : True
							}
		sample_disease = json.dumps(sample_disease)
		sample_disease_json = json.loads(sample_disease)

		
		try:
			db.session.add( database.Disease(sample_disease_json))
		except IntegrityError:
		 	db.session.rollback()

		sample = db.session.query(database.Disease).filter_by(name="Sample Disease").one()  # filter on name

		test_result = "Sample Disease" == sample.name
		db.session.delete(sample)
		#db.session.commit()

		assert "Sample Disease" == sample.name

if __name__ == '__main__':
	#app_file.initialize()
	#print('app.Disease.query.all()')
	db.create_all()
	print([x.name for x in database.Disease.query.all()])
	unittest.main()
	


# print('beginning test')
# app.initialize()

# 
# print('app.Charity.query.all()')
# print([x.charityName for x in app.database.Charity.query.all()])
# print('app.Treatment.query.all()')
# print([x.name for x in app.database.Treatment.query.all()])
# print('ending test')

