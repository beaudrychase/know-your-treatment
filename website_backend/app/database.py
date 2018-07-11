from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from urllib.request import urlopen
import simplejson

app = Flask(__name__)
app.config.from_pyfile('flask.cfg')

db = SQLAlchemy(app)
"""
class Medication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)
    treated_diseases = db.Column(db.ARRAY(db.Model))

    def __init__(self, resource):
    	self.name = 'test'


class Charity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)


    def __init__(self, resource):
    	self.name = 'test'
"""

class Disease(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)
    facts = db.Column(db.Unicode)
    symptoms = db.Column(db.ARRAY(db.Unicode))
    transmission = db.Column(db.Unicode)
    diagnosis = db.Column(db.Unicode)
    treatment = db.Column(db.Unicode)
    prevention = db.Column(db.Unicode)
    more = db.Column(db.Unicode)
    is_active = db.Column(db.Boolean)
    wiki = db.Column(db.Unicode)

    def __init__(self, resource):
    	self.name = resource['name'][: -6] #the -6 removes ' : WHO' from the end of the name
    	self.facts = resource['facts']
    	self.symptoms = resource['symptoms']
    	self.transmission = resource['transmission']
    	self.diagnosis = resource['diagnosis']
    	self.treatment = resource['treatment']
    	self.prevention = resource['prevention']
    	self.more = resource['more']
    	self.is_active = resource['is_active'];

    	#url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + self.name
    	#data = simplejson.load(urlopen(url))
    	#The problem is that the page has a unique number that we need to get to access the
    	#nested dict, this finds the number and then uses it to get the contents of that key.
    	#self.wiki = data['query']['pages'][next(iter(data['query']['pages']))]['extract']

def initDiseases():
	url = 'https://disease-info-api.herokuapp.com/diseases.json'
	data = simplejson.load(urlopen(url))
	for info in data['diseases']:
			db.session.add( Disease(info) )
			#db.session.commit()

def clearDB():
    db.reflect()
    db.drop_all()

db.create_all()
initDiseases()
