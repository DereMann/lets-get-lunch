describe('Dashboard', () => {
    before(() => {
        Cypress.config('baseUrl', 'web_app:4200');
    });

    it('should redirect to the home page for an unauthorized user', () => {
        cy
            .visit('/dashboard')
            .url().should('include', '/');
    });
});