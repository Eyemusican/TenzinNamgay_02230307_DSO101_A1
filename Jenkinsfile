pipeline {
    agent any
    tools {
        nodejs 'NodeJS'  // Make sure this matches your Jenkins tool configuration
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
                    script {
                        try {
                            bat 'npm run build'
                        } catch (Exception e) {
                            echo "No build script in backend or build failed: ${e.getMessage()}"
                        }
                    }
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        try {
                            bat 'npm run build'
                        } catch (Exception e) {
                            echo "No build script in frontend or build failed: ${e.getMessage()}"
                        }
                    }
                }
            }
        }
        stage('Deploy Backend Image') {
            steps {
                script {
                    try {
                        // Build Docker image for backend
                        bat 'docker build -t eyemusican/node-app:latest -f backend/Dockerfile backend/'
                        
                        // Login and push to Docker Hub using credentials
                        withCredentials([string(credentialsId: 'docker-hub-creds', variable: 'DOCKER_PWD')]) {
                            bat '''
                                echo %DOCKER_PWD% | docker login -u eyemusican --password-stdin
                                docker push eyemusican/node-app:latest
                            '''
                        }
                        echo "Backend image deployed successfully!"
                    } catch (Exception e) {
                        echo "Backend deployment failed: ${e.getMessage()}"
                        throw e
                    }
                }
            }
        }
        stage('Deploy Frontend Image') {
            steps {
                script {
                    try {
                        // Build Docker image for frontend
                        bat 'docker build -t eyemusican/frontend-app:latest -f frontend/Dockerfile frontend/'
                        
                        // Login and push to Docker Hub using credentials
                        withCredentials([string(credentialsId: 'docker-hub-creds', variable: 'DOCKER_PWD')]) {
                            bat '''
                                echo %DOCKER_PWD% | docker login -u eyemusican --password-stdin
                                docker push eyemusican/frontend-app:latest
                            '''
                        }
                        echo "Frontend image deployed successfully!"
                    } catch (Exception e) {
                        echo "Frontend deployment failed: ${e.getMessage()}"
                        throw e
                    }
                }
            }
        }
    }
    post {
        always {
            // Clean up Docker images to save space
            script {
                try {
                    bat 'docker system prune -f'
                } catch (Exception e) {
                    echo "Docker cleanup failed: ${e.getMessage()}"
                }
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
