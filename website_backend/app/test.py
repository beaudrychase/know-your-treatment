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


class AppTestCase(unittest.TestCase):

	def setUp(self):
		db.session.rollback()
		create_sample_disease()
		create_sample_charity()
		create_sample_treatment()
		

	def test_disease_name(self):		
		sample = db.session.query(database.Disease).filter_by(name="Sample disease").one()  # filter on name
		self.assertEqual( "Sample disease", sample.name)

	def test_disease_symptoms(self):		
		sample = db.session.query(database.Disease).filter_by(symptoms="Sample symptoms").one()  # filter on name
		self.assertEqual( "Sample symptoms", sample.symptoms)

	def test_disease_transmission(self):		
		sample = db.session.query(database.Disease).filter_by(transmission="Sample transmission").one()  # filter on name
		self.assertEqual( "Sample transmission", sample.transmission)

	def test_disease_diagnosis(self):		
		sample = db.session.query(database.Disease).filter_by(diagnosis="Sample diagnosis").one()  # filter on name
		self.assertEqual( "Sample diagnosis", sample.diagnosis)

	def test_disease_treatment(self):		
		sample = db.session.query(database.Disease).filter_by(treatment="Sample treatment").one()  # filter on name
		self.assertEqual( "Sample treatment", sample.treatment)

	def test_disease_prevention(self):		
		sample = db.session.query(database.Disease).filter_by(prevention="Sample prevention").one()  # filter on name
		self.assertEqual( "Sample prevention", sample.prevention)

	def test_disease_more(self):		
		sample = db.session.query(database.Disease).filter_by(more="Sample more").one()  # filter on name
		self.assertEqual( "Sample more", sample.more)
	
	def test_disease_is_active(self):		
		sample = db.session.query(database.Disease).filter_by(is_active=True, name="Sample disease").one()  # filter on name
		self.assertEqual(True , sample.is_active)





	def test_charity_ein(self):
		sample = db.session.query(database.Charity).filter_by(ein=1).one()
		self.assertEqual( 1, sample.ein)

	def test_charity_name(self):
		sample = db.session.query(database.Charity).filter_by(name="Sample name").one()
		self.assertEqual( "Sample name", sample.name)

	def test_charity_url(self):
		sample = db.session.query(database.Charity).filter_by(url="Sample url").one()
		self.assertEqual( "Sample url", sample.url)

	def test_charity_donationUrl(self):
		sample = db.session.query(database.Charity).filter_by(donationUrl="Sample donationUrl").one()
		self.assertEqual( "Sample donationUrl", sample.donationUrl)

	def test_charity_city(self):
		sample = db.session.query(database.Charity).filter_by(city="Sample city").one()
		self.assertEqual( "Sample city", sample.city)

	def test_charity_state(self):
		sample = db.session.query(database.Charity).filter_by(state="Sample state").one()
		self.assertEqual( "Sample state", sample.state)

	def test_charity_zipCode(self):
		sample = db.session.query(database.Charity).filter_by(zipCode="Sample zipCode").one()
		self.assertEqual( "Sample zipCode", sample.zipCode)

	def test_charity_start(self):
		sample = db.session.query(database.Charity).filter_by(start=2).one()
		self.assertEqual( 2, sample.start)

	def test_charity_rows(self):
		sample = db.session.query(database.Charity).filter_by(rows=3).one()
		self.assertEqual( 3, sample.rows)

	def test_charity_recordCount(self):
		sample = db.session.query(database.Charity).filter_by(recordCount=4).one()
		self.assertEqual( 4, sample.recordCount)

	def test_charity_score(self):
		sample = db.session.query(database.Charity).filter_by(score=5,  name="Sample name").one()
		self.assertEqual( 5, sample.score)

	def test_charity_acceptingDonations(self):
		sample = db.session.query(database.Charity).filter_by(acceptingDonations=True, name="Sample name").one()
		self.assertEqual(True, sample.acceptingDonations)

	def test_charity_category(self):
		sample = db.session.query(database.Charity).filter_by(category="Sample category").one()
		self.assertEqual( "Sample category", sample.category)

	def test_charity_eligibleCd(self):
		sample = db.session.query(database.Charity).filter_by(eligibleCd=True,  name="Sample name").one()
		self.assertEqual(True, sample.eligibleCd)

	def test_charity_missionStatement(self):
		sample = db.session.query(database.Charity).filter_by(missionStatement="Sample missionStatement").one()
		self.assertEqual( "Sample missionStatement", sample.missionStatement)

	def test_charity_parent_ein(self):
		sample = db.session.query(database.Charity).filter_by(parent_ein=True,  name="Sample name").one()
		self.assertEqual(True, sample.parent_ein)

	def test_charity_longitude(self):
		sample = db.session.query(database.Charity).filter_by(longitude=1.0).one()
		self.assertEqual( 1.0, sample.longitude)

	def test_charity_latitude(self):
		sample = db.session.query(database.Charity).filter_by(latitude=2.0).one()
		self.assertEqual( 2.0, sample.latitude)





	def test_treatment_id(self):
		sample = db.session.query(database.Treatment).filter_by(id=1).one()
		self.assertEqual( 1, sample.id)

	def test_treatment_name(self):
		sample = db.session.query(database.Treatment).filter_by(name='Sample name').one()
		self.assertEqual( 'Sample name', sample.name)

	def test_treatment_treatment_type(self):
		sample = db.session.query(database.Treatment).filter_by(treatment_type='Sample treatment_type').one()
		self.assertEqual( 'Sample treatment_type', sample.treatment_type)

	def test_treatment_text(self):
		sample = db.session.query(database.Treatment).filter_by(text='Sample text').one()
		self.assertEqual( 'Sample text', sample.text)

	def test_treatment_wiki_link(self):
		sample = db.session.query(database.Treatment).filter_by(wiki_link='https://en.wikipedia.org/wiki/Sample%20name').one()
		self.assertEqual( 'https://en.wikipedia.org/wiki/Sample%20name', sample.wiki_link)



	
def create_sample_disease():
	#Assumes the database has already been initialized.
	sample_disease =   {'id' : 1,
						'name' : 'Sample disease : WHO', 
						'symptoms' : 'Sample symptoms',
						'transmission' : 'Sample transmission',
						'diagnosis': 'Sample diagnosis',
						'treatment' : 'Sample treatment',
						'prevention' : 'Sample prevention',
						'more' : 'Sample more',
						'is_active' : True,
						'image_link' : 'www.example.com/image.png'
						}
	sample_disease = json.dumps(sample_disease)
	sample_disease_json = json.loads(sample_disease)
	try:
		db.session.add( database.Disease(sample_disease_json))
	except IntegrityError:
		pass
		db.session.rollback()
	return sample_disease_json

def create_sample_charity():
	sample_charity={'id' : 1,
					'ein' : 1,
					'charityName' : 'Sample name', 
				    'url' : 'Sample url', 
				    'donationUrl' : 'Sample donationUrl', 
				    'city' : 'Sample city', 
				    'state' : 'Sample state', 
				    'zipCode' : 'Sample zipCode',
				    'start' : 2,
				    'rows' : 3,
				    'recordCount' : 4,
				    'score' : 5,
				    'acceptingDonations' : True,
				    'category' : 'Sample category',
				    'eligibleCd' : True,
				    'missionStatement' : 'Sample missionStatement',
				    'parent_ein' : True,
				    'longitude' : 1.0,
				    'latitude' : 2.0,
    				}
	sample_charity = json.dumps(sample_charity)
	sample_charity_json = json.loads(sample_charity)
	try:
		db.session.add( database.Charity(sample_charity_json, 1))
	except IntegrityError:
		pass
		db.session.rollback()
	return sample_charity_json


def create_sample_treatment():
	sample_treatment = {'id' : 1,
					    'name' : 'Sample name',
					    'treatment_type' : 'Sample treatment_type',
					    'text' : 'Sample text',
					    'wiki_link' : 'Sample wiki_link',
					    'image_link' : 'www.example.com/image.png'
					    }
	sample_treatment = json.dumps(sample_treatment)
	sample_treatment_json = json.loads(sample_treatment)
	try:
		db.session.add( database.Treatment(sample_treatment_json))
	except IntegrityError:
		pass
		db.session.rollback()
	return sample_treatment_json

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
# print([x.name for x in app.database.Charity.query.all()])
# print('app.Treatment.query.all()')
# print([x.name for x in app.database.Treatment.query.all()])
# print('ending test')

