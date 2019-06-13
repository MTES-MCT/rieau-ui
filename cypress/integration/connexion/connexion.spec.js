/// <reference types="Cypress" />

context('Connexion', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('cy.click() - go to connexion page', () => {
    cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
    cy.get('[data-cy=email-input]').find('input').type('test@test.fr')
    cy.get('[data-cy=password-input]').find('input').type('test1234')
    cy.get('[data-cy=connexion-btn]').should('be.visible').click().should(() => {
      expect(localStorage.getItem('fake-jwt-token')).not.to.be.null
    })
    cy.contains('Mon Compte').should('be.visible')
  })
})
