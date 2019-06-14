/// <reference types="Cypress" />

context('Changer de mot de passe', () => {

  it('go to changer mot de passe page', () => {
    cy.visit('/changermotdepasse/1')
    cy.contains('Changer de mot de passe').should('be.visible')
    cy.get('[data-cy=password-input]').find('input').type('test1234')
    cy.get('[data-cy=confirmpassword-input]').find('input').type('test1234')
    cy.get('[data-cy=enregistrer-btn]').should('be.visible').click()
    cy.get('[data-cy=confirm-dialog-btn]').should('be.visible').click()
    cy.contains('Connexion').should('be.visible')
  })
  it('go wrong changer mot de passe page ', () => {  
    cy.visit('/changermotdepasse/wrongid')
    cy.contains('404 | Page non trouvée').should('be.visible')
  })
})
