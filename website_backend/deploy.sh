cd /home/ec2-user/website_backend
docker container stop $(docker ps -q)
docker system prune
docker build -t backend .
docker run -d -v /home/ec2-user/website_backend/app:/app -w /app -p 80:80 -t backend:latest
tar cpf - ./website_backend | ssh -o StrictHostKeyChecking=no -v -i "idb-backend.pem" ec2-user@ec2-34-218-254-20.us-west-2.compute.amazonaws.com "tar xpf - -C /home/ec2-user