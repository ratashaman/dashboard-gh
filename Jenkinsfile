pipeline {
    agent any

    environment {
        // Set environment variables for reuse
        SSH_OPTIONS = "-o StrictHostKeyChecking=no"
    }

    stages {
        stage('Pull Code') {
            steps {
                echo "Pulling the latest code from GitHub..."
                sshagent(credentials: ['ssh-server-key']) {
                    sh """
                        ssh ${env.SSH_OPTIONS} ${env.USERNAME_SERVER}@${env.HOSTNAME_SERVER} \\
                        "cd ${env.SERVICE_DIR}/frontend/dashboard && git pull"
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image with a unique tag..."
                sshagent(credentials: ['ssh-server-key']) {
                    sh """
                        ssh ${env.SSH_OPTIONS} ${env.USERNAME_SERVER}@${env.HOSTNAME_SERVER} \\
                        "cd ${env.SERVICE_DIR}/frontend/dashboard && \\
                        GIT_SHA=\$(git rev-parse --short HEAD) && \\
                        docker build -t dashboard-service:\$GIT_SHA . && \\
                        echo \$GIT_SHA > current_sha.txt"
                    """
                }
            }
        }

        stage('Update Running Container') {
            steps {
                echo "Updating the running container..."
                sshagent(credentials: ['ssh-server-key']) {
                    sh """
                        ssh ${env.SSH_OPTIONS} ${env.USERNAME_SERVER}@${env.HOSTNAME_SERVER} \\
                        "cd ${env.SERVICE_DIR}/frontend/dashboard && \\
                        GIT_SHA=\$(cat current_sha.txt) && \\
                        docker ps --filter 'name=dashboard-service' --format '{{.ID}}' | xargs --no-run-if-empty docker stop && \\
                        docker ps -a --filter 'name=dashboard-service' --format '{{.ID}}' | xargs --no-run-if-empty docker rm && \\
                        docker run -d --name dashboard-service -p 3000:3000 dashboard-service:\$GIT_SHA"
                    """
                }
            }
        }

        stage('Clean Up') {
            steps {
                echo "Cleaning up unused Docker resources..."
                sshagent(credentials: ['ssh-server-key']) {
                    sh """
                        ssh ${env.SSH_OPTIONS} ${env.USERNAME_SERVER}@${env.HOSTNAME_SERVER} \\
                        "docker image prune -a -f && \\
                        docker container prune -f && \\
                        docker volume prune -f && \\
                        docker builder prune -a -f"
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
