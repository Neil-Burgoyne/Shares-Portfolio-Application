describe("Homepage Functions", () => {
    it("loads the homepage correctly", () => {
        cy.visit("http://localhost:3000");
    });
    
    it('Can add Shares', function() {
        cy.visit('http://localhost:3000');
        cy.get('.MuiAutocomplete-root > .MuiFormControl-root').click();
        cy.get('#combo-box-demo-option-0').click();
        cy.get('#standard-basic').click();
        cy.get('.MuiButton-root').click();
    });

    it('Can toggle dark mode on/off', function() {
        cy.visit('http://localhost:3000');
        cy.get('.PrivateSwitchBase-input').check();
        cy.get('.PrivateSwitchBase-input').uncheck();
    });

    











});
