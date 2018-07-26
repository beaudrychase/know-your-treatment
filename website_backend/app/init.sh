/etc/init.d/mysql start
echo "UPDATE mysql.user SET Password = PASSWORD('password') WHERE User = 'root';" | mysql
echo "FLUSH PRIVILEGES;" | mysql
echo "CREATE DATABASE kyt;" | mysql
python test.py
python app.py
