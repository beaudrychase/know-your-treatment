import app

print('beginning test')
app.initialize()
print('app.Disease.query.all()')
print([x.name for x in app.database.Disease.query.all()])
print('app.Charity.query.all()')
print([x.charityName for x in app.database.Charity.query.all()])
print('app.Treatment.query.all()')
print([x.name for x in app.database.Treatment.query.all()])
print('ending test')