/etc/init.d/postgresql start
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'pass';"
sudo -u postgres psql -c "CREATE DATABASE kyt;"

export FLASK_APP=app.py
flask run --host=0.0.0.0 --port=8080
