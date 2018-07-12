import app
from unittest import main, TestCase

class MyUnitTests (TestCase) :
    def test1 (self) :
        self.assertNotEqual([x.name for x in app.database.Disease.query.all()], [])

    def test2 (self) :
        self.assertNotEqual([x.charityName for x in app.database.Charity.query.all()], [])

    def test3 (self) :
        self.assertNotEqual([x.name for x in app.database.Treatment.query.all()], [])

if __name__ == "__main__" : # pragma: no cover
    main()