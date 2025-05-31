pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Eyemusican/TenzinNamgay_02230307_DSO101_A1.git'
            }
        }
        stage('Install Backend') {
            steps {
                dir('to-do') {
                    bat 'npm install'
                }
            }
        }
        stage('Install Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir('to-do') {
                    bat 'npm run build || echo "No build script in backend"'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm run build || echo "No build script in frontend"'
                }
            }
        }
        stage('Deploy Backend Image') {
            steps {
                script {
                    // Build Docker image for backend
                    bat 'docker build -t eyemusican/node-app:latest -f to-do/Dockerfile to-do/'
                    
                    // Login and push to Docker Hub using credentials
                    withCredentials([string(credentialsId: 'docker-hub-creds', variable: 'DOCKER_PWD')]) {
                        bat '''
                            echo %DOCKER_PWD% | docker login -u eyemusican --password-stdin
                            docker push eyemusican/node-app:latest
                        '''
                    }
                }
            }
        }
        stage('Deploy Frontend Image') {
            steps {
                script {
                    // Build Docker image for frontend
                    bat 'docker build -t eyemusican/frontend-app:latest -f frontend/Dockerfile frontend/'
                    
                    // Login and push to Docker Hub using credentials
                    withCredentials([string(credentialsId: 'docker-hub-creds', variable: 'DOCKER_PWD')]) {
                        bat '''
                            echo %DOCKER_PWD% | docker login -u eyemusican --password-stdin
                            docker push eyemusican/frontend-app:latest
                        '''
                    }
                }
            }
        }
    }
    post {
        always {
            // Clean up Docker images to save space
            script {
                bat 'docker system prune -f || echo "Docker cleanup failed"'
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}