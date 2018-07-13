cd /home/ec2-user/website_backend
docker container stop $(docker ps -q)
docker system prune
docker build -t backend .
docker run -d -v /home/ec2-user/website_backend/app:/app -w /app -p 80:80 -t backend:latest