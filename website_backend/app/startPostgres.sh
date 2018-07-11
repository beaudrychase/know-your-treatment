/etc/init.d/postgresql start

su - postgres
psql -h localhost kyt << EOF
ALTER USER postgres WITH PASSWORD 'pass';
EOF




