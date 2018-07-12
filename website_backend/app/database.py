from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

from urllib.request import urlopen
import json
import requests

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)

# for many-to-many relations from diseases to various treatments
Disease_Treatment = db.Table('disease_treatment',
    db.Column('treatment_id', db.Integer, db.ForeignKey('treatment.id'), primary_key=True),
    db.Column('disease_id', db.Integer, db.ForeignKey('disease.id'), primary_key=True)
)

class Treatment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)
    treatment_type = db.Column(db.Unicode)
    text = db.Column(db.Unicode)
    wiki_link = db.Column(db.Unicode)

    def __init__(self, resource):
        self.name = resource['name']
        self.treatment_type = resource['treatment_type']
        self.text = resource['text']
        self.wiki_link = 'https://en.wikipedia.org/wiki/' + resource['name'].replace(' ','%20')

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
    missionStatement = db.Column(db.Unicode)
    parent_ein = db.Column(db.Boolean)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    disease_id = db.Column(db.Integer, db.ForeignKey('disease.id'),
        nullable=False)

    def __init__(self, resource, disease_id):
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
        self.missionStatement = resource['missionStatement']
        self.parent_ein = resource['parent_ein']
        self.longitude = resource['longitude']
        self.latitude = resource['latitude']
        self.disease_id = disease_id


class Disease(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)
    symptoms = db.Column(db.Unicode)
    transmission = db.Column(db.Unicode)
    diagnosis = db.Column(db.Unicode)
    treatment = db.Column(db.Unicode)
    prevention = db.Column(db.Unicode)
    more = db.Column(db.Unicode)
    is_active = db.Column(db.Boolean)
    charities = db.relationship('Charity', backref='disease', lazy=True)
    treatments = db.relationship('Treatment', secondary=Disease_Treatment, lazy='select',
    backref=db.backref('diseases', lazy=True))

    def __init__(self, resource):
        self.name = resource['name'][: -6] #the -6 removes ' : WHO' from the end of the name
        self.symptoms = resource['symptoms']
        self.transmission = resource['transmission']
        self.diagnosis = resource['diagnosis']
        self.treatment = resource['treatment']
        self.prevention = resource['prevention']
        self.more = resource['more']
        self.is_active = resource['is_active']

def initDisease():
    url = 'https://disease-info-api.herokuapp.com/diseases.json'
    data = json.load(urlopen(url))
    for info in data['diseases']:
        try:
            db.session.add( Disease(info) )
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            # in case of adding duplicates
    print('initialized disease table')


def initCharity():
    baseUrl = 'http://data.orghunter.com/v1/charitysearch?user_key=5090f8b7b0c373370039798d01066edf&rows=2&searchTerm='
    for disease in Disease.query.all():
        data = json.load( urlopen(baseUrl + disease.name.replace(' ','%20')) )
        for info in data['data']:
            try:
                db.session.add( Charity(info, disease.id) )
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                # in case of adding duplicates
    print('initialized charity table')


def initTreatment():
    baseUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&rvsection=0&rvparse&titles='
    baseSearchUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=&srsearch='
    for disease in Disease.query.all():
        # query wikipedia for a given condition  
        searchUrl = baseSearchUrl+(disease.name).replace(' ','%20')
        disease_wiki_title = requests.get(searchUrl).json()['query']['search'][0]['title'].replace(' ', '%20')
        # access the page
        data = json.load( urlopen(baseUrl+disease_wiki_title) )
        textData = (next(iter(data['query']['pages'].values()))['revisions'][0]['*'])
        textList = textData.split('<tr>')
        # iterate through the wikipedia infobox, grab only certain fields
        for section in textList:
            sectionName = section.split('</th')[0][16:]
            if sectionName in ['Medication', 'Prevention', 'Treatment']:
                # if there are links to other wiki pages
                text = ''
                if '/wiki/' in section:
                    #links = (section.split('<a href='))
                    #for link in links:
                    #print(link.split)

                    suffix = section.split('/wiki/')[1].split('"')[0]
                    sectionUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles='+suffix
                    text = next(iter(json.load( urlopen(sectionUrl) )['query']['pages'].values()))['extract']
                    # in case the link requires a redirect/is a subpage
                    if (text==''):
                        sectionSearchUrl = baseSearchUrl+suffix
                        treatment_wiki_title = json.load(urlopen(searchUrl))['query']['search'][0]['title'].replace(' ', '%20')
                        text = next(iter(json.load( urlopen('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles='+treatment_wiki_title) )['query']['pages'].values()))['extract']

                    if (text!=''):
                        try:
                            info = {'name':suffix.replace('_',' '),
                                    'treatment_type':sectionName,
                                    'text':text}
                            db.session.add( Treatment(info) )
                            db.session.commit()
                        except IntegrityError:
                            print('IntegrityError', info['name'])
                            db.session.rollback()
                            # in case of adding duplicates
                        disease.treatments = disease.treatments + [Treatment.query.filter_by(name=suffix.replace('_',' ')).first()]
                        db.session.commit()

    print('initialized treatment table with', j, 'objects')
   

def clearDB():
    db.reflect()
    db.drop_all()
    print('cleared all tables')