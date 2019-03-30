node('docker') {
 
    stage 'Checkout'
        checkout scm
    stage 'Build & UnitTest' 
        sh "docker build -t letsgetlunchapp:B${BUILD_NUMBER} -f ./lets-get-lunch/Dockerfile.ci ./lets-get-lunch"
        sh "docker build -t letsgetlunchcyp:B${BUILD_NUMBER} -f ./lets-get-lunch-api/Dockerfile-cypress.ci ./lets-get-lunch"
        sh "docker build -t letsgetlunchapi:B${BUILD_NUMBER} -f ./lets-get-lunch-api/Dockerfile.ci ./lets-get-lunch-api"

    stage 'Integration Test'
        sh "docker-compose -f docker-compose.integration.j.yml up --force-recreate --abort-on-container-exit --build"
        sh "docker-compose -f docker-compose.integration.j.yml down -v"
}
