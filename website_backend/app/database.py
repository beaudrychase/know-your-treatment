from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from urllib.request import urlopen
import simplejson

app = Flask(__name__)
app.config.from_pyfile('flask.cfg')

db = SQLAlchemy(app)
db.create_all()

"""
class Medication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)
    treated_diseases = db.Column(db.ARRAY(db.Model))

    def __init__(self, resource):
    	self.name = 'test'
"""

class Charity(db.Model):
    ein = db.Column(db.Integer, primary_key=True)
    charityName = db.Column(db.Unicode, unique=True)
    url = db.Column(db.Unicode)
    donationUrl = db.Column(db.Unicode)
    city = db.Column(db.Unicode)
    state = db.Column(db.Unicode)
    zipCode = db.Column(db.Unicode)
    start = db.Column(db.Integer)
    rows = db.Column(db.Integer)
    recordCount = db.Column(db.Integer)
    score = db.Column(db.Integer)
    acceptingDonations = db.Column(db.Boolean)
    category = db.Column(db.Unicode)
    eligibleCd = db.Column(db.Boolean)
    deductabilityCd = db.Column(db.Boolean)
    missionStatement = db.Column(db.Unicode)
    parent_ein = db.Column(db.Boolean)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)


    def __init__(self, resource):
        self.ein = resource['ein']
        self.charityName = resource['charityName']
        self.url = resource['url']
        self.donationUrl = resource['donationUrl']
        self.city = resource['city']
        self.state = resource['state']
        self.zipCode = resource['zipCode']
        self.start = resource['start']
        self.rows = resource['rows']
        self.recordCount = resource['recordCount']
        self.score = resource['score']
        self.acceptingDonations = resource['acceptingDonations']
        self.category = resource['category']
        self.eligibleCd = resource['eligibleCd']
        self.deductabilityCd = resource['deductabilityCd']
        self.missionStatement = resource['missionStatement']
        self.parent_ein = resource['parent_ein']
        self.longitude = resource['longitude']
        latitude = resource['latitude']
    	


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

def initCharities():
    url = 'http://data.orghunter.com/v1/charitysearch?user_key=5090f8b7b0c373370039798d01066edf&searchTerm=AIDs'
    data = simplejson.load(urlopen(url))
    print(data)

def clearDB():
    db.reflect()
    db.drop_all()

initCharities()
db.create_all()
initDiseases()