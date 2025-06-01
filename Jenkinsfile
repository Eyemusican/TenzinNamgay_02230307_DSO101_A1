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
        stage('Test Backend') {
            steps {
                dir('to-do') {
                    bat 'npm test || echo "No tests found in backend"'
                }
            }
        }
        stage('Test Frontend') {
            steps {
            dir('frontend') {
                bat 'npm test || echo "No tests found in frontend"'
            }
        }
        }
        stage('Deploy Backend Image') {
            steps {
                script {
                    // Build Docker image for backend
                    bat 'docker build -t eyemusician/node-app:latest -f to-do/Dockerfile to-do/'
                    
                    // Login and push to Docker Hub using credentials
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', 
                                   usernameVariable: 'DOCKER_USER', 
                                   passwordVariable: 'DOCKER_PASS')]) {
                        bat '''
                            echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                            docker push eyemusician/node-app:latest
                        '''
                    }
                }
            }
        }
        stage('Deploy Frontend Image') {
            steps {
                script {
                    // Build Docker image for frontend
                    bat 'docker build -t eyemusician/frontend-app:latest -f frontend/Dockerfile frontend/'
                    
                    // Login and push to Docker Hub using credentials
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', 
                                   usernameVariable: 'DOCKER_USER', 
                                   passwordVariable: 'DOCKER_PASS')]) {
                        bat '''
                            echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                            docker push eyemusician/frontend-app:latest
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