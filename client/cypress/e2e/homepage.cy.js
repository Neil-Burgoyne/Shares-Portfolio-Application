describe("Homepage Functions", () => {
    it("Loads the homepage correctly", () => {
        cy.visit("http://localhost:3000");
    });

    it('Can add more existing shares to the users portfolio', function() {
        cy.visit('http://localhost:3000');
        cy.get('.MuiAutocomplete-root > .MuiFormControl-root').click();
        cy.get('#combo-box-demo-option-0').click();
        cy.get('#standard-basic').click();
        cy.get('.MuiButton-root').click();
    });

    it('Can view a chart showing current values of portfolio shares', function() {
        cy.visit('http://localhost:3000');
        cy.get('[data-testid="MenuIcon"] > path').click();
        cy.get(':nth-child(2) > a').click();       
    });
});
