node('docker') {
 
    stage 'Checkout'
        checkout scm
    stage 'Build & UnitTest' 
        sh "docker build -t letsgetlunchapp:B${BUILD_NUMBER} -f ./lets-get-lunch/Dockerfile ."
        sh "docker build -t letsgetlunchapi:B${BUILD_NUMBER} -f ./lets-get-lunch-api/Dockerfile ."

    stage 'Integration Test'
        sh "docker-compose -f docker-compose.integration.j.yml up --force-recreate --abort-on-container-exit"
        sh "docker-compose -f docker-compose.integration.j.yml down -v"
}
