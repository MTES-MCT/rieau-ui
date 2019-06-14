/// <reference types="Cypress" />

context('Confirmation email', () => {

  it('go confirmation email page after register', () => {  
    cy.visit('/confirmation/0')
    cy.contains('Confirmation email').should('be.visible')
    cy.get('[data-cy=action-link]').should('be.visible').click()
    cy.contains('Connexion').should('be.visible')
  })
  it('go confirmation email page after reset ', () => {  
    cy.visit('/confirmation/1')
    cy.contains('Confirmation email').should('be.visible')
    cy.get('[data-cy=action-link]').should('be.visible').click()
    cy.contains('Changer de mot de passe').should('be.visible')
  })
  it('go wrong confirmation email page ', () => {  
    cy.visit('/confirmation/wrongid')
    cy.contains('404 | Page non trouvée').should('be.visible')
  })
})
