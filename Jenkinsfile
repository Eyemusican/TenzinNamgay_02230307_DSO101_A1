pipeline {
    agent any  // Runs on any available Windows agent

    tools {
        nodejs 'NodeJS-20.x'  // Make sure this matches your Global Tool Configuration
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                bat 'npm test -- --ci --reporters=jest-junit'
            }
            post {
                always {
                    echo 'Publishing test results...'
                    junit 'junit.xml'  // Make sure jest-junit outputs to this file
                }
            }
        }

        stage('Build Project') {
            steps {
                echo 'Building the project...'
                bat 'npm run build'
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to staging environment...'
                // Replace the line below with your real deployment script
                bat 'echo Deploying to staging...'
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Check the logs.'
        }
        success {
            echo 'Pipeline finished successfully!'
        }
    }
}
