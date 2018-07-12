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
		db.session.rollback()
		#Assumes the database has already been initialized.
		sample_disease =   {"name" : "Sample disease : WHO", 
							"symptoms" : "Sample symptoms",
							"transmission" : "Sample transmission",
							"diagnosis": "Sample diagnosis",
							"treatment" : "Sample treatment",
							"prevention" : "Sample prevention",
							"more" : "Sample more",
							"is_active" : True
							}
		sample_disease = json.dumps(sample_disease)
		sample_disease_json = json.loads(sample_disease)
		try:
			db.session.add( database.Disease(sample_disease_json))
		except IntegrityError:
			pass
			db.session.rollback()

	def test_disease_name(self):		
		sample = db.session.query(database.Disease).filter_by(name="Sample disease").one()  # filter on name
		assert "Sample disease" == sample.name

	def test_disease_symptoms(self):		
		sample = db.session.query(database.Disease).filter_by(symptoms="Sample symptoms").one()  # filter on name
		assert "Sample symptoms" == sample.symptoms

	def test_disease_transmission(self):		
		sample = db.session.query(database.Disease).filter_by(transmission="Sample transmission").one()  # filter on name
		assert "Sample transmission" == sample.transmission

	def test_disease_diagnosis(self):		
		sample = db.session.query(database.Disease).filter_by(diagnosis="Sample diagnosis").one()  # filter on name
		assert "Sample diagnosis" == sample.diagnosis

	def test_disease_treatment(self):		
		sample = db.session.query(database.Disease).filter_by(treatment="Sample treatment").one()  # filter on name
		assert "Sample treatment" == sample.treatment

	def test_disease_prevention(self):		
		sample = db.session.query(database.Disease).filter_by(prevention="Sample prevention").one()  # filter on name
		assert "Sample prevention" == sample.prevention

	def test_disease_more(self):		
		sample = db.session.query(database.Disease).filter_by(more="Sample more").one()  # filter on name
		assert "Sample more" == sample.more
	
	def test_disease_is_active(self):		
		sample = db.session.query(database.Disease).filter_by(is_active=True, name="Sample disease").one()  # filter on name
		assert sample.is_active
	

if __name__ == '__main__':
	#app_file.initialize()
	#print('app.Disease.query.all()')
	db.create_all()
	#print([x.name for x in database.Disease.query.all()])
	unittest.main()
	


# print('beginning test')
# app.initialize()

# 
# print('app.Charity.query.all()')
# print([x.charityName for x in app.database.Charity.query.all()])
# print('app.Treatment.query.all()')
# print([x.name for x in app.database.Treatment.query.all()])
# print('ending test')

