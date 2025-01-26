pipeline {
    agent any

    stages {
        stage('Pull Code') {
            steps {
                echo "Pulling the latest code from GitHub..."
                sshagent(credentials: ['ssh-server-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${env.USERNAME_SERVER}@${env.HOSTNAME_SERVER} << 'EOF'
                        cd ${env.SERVICE_DIR}/frontend/dashboard
                        git pull
                        EOF
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image with a unique tag..."
                sshagent(credentials: ['ssh-server-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${env.USERNAME_SERVER}@${env.HOSTNAME_SERVER} << 'EOF'
                        cd ${env.SERVICE_DIR}/frontend/dashboard
                        GIT_SHA=\$(git rev-parse --short HEAD)
                        docker build -t dashboard-service:\$GIT_SHA .
                        echo \$GIT_SHA > current_sha.txt
                        EOF
                    """
                }
            }
        }

        stage('Update Running Container') {
            steps {
                echo "Updating the running container..."
                sshagent(credentials: ['ssh-server-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${env.USERNAME_SERVER}@${env.HOSTNAME_SERVER} << 'EOF'
                        GIT_SHA=\$(cat ${env.SERVICE_DIR}/frontend/dashboard/current_sha.txt)

                        # Stop the current container
                        docker ps --filter "name=dashboard-service" --format "{{.ID}}" | xargs --no-run-if-empty docker stop

                        # Remove the stopped container
                        docker ps -a --filter "name=dashboard-service" --format "{{.ID}}" | xargs --no-run-if-empty docker rm

                        # Start a new container with the new image
                        docker run -d --name dashboard-service -p 3000:3000 dashboard-service:\$GIT_SHA
                        EOF
                    """
                }
            }
        }

        stage('Clean Up') {
            steps {
                echo "Cleaning up unused Docker images..."
                sshagent(credentials: ['ssh-server-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${env.USERNAME_SERVER}@${env.HOSTNAME_SERVER} << 'EOF'
                        # Remove unused Docker images except the one currently running
                        docker image prune -a -f
                        docker container prune -f
                        docker volume prune -f
                        docker builder prune -a -f
                        EOF
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed. Check the logs for details."
        }
    }
}
