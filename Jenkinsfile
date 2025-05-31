pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Eyemusican/TenzinNamgay_02230307_DSO101_A1'
            }
        }
        stage('Install Backend') {
            steps {
                dir('backend') {
                    bat 'dir'  // Verify files exist
                    bat 'if exist package-lock.json del package-lock.json'
                    bat 'if exist node_modules rmdir /s /q node_modules'
                    bat 'npm install'
                }
            }
        }
        stage('Install Frontend') {
            steps {
                dir('frontend') {
                    bat 'dir'  // Verify files exist
                    bat 'if exist package-lock.json del package-lock.json'
                    bat 'if exist node_modules rmdir /s /q node_modules'
                    bat 'npm install'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
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
                    bat 'docker build -t eyemusican/node-app:latest -f backend/Dockerfile backend/'
                    
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
            // Clean workspace for next build
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
