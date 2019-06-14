/// <reference types="Cypress" />

context('Inscription', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('cy.click() - go to inscritpion page', () => {
    cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
    cy.get('[data-cy=inscription-link]').should('be.visible').click()
    cy.get('[data-cy=firstname-input]').find('input').type('test')
    cy.get('[data-cy=lastname-input]').find('input').type('Test')
    cy.get('[data-cy=email-input]').find('input').type('test1@test.fr')
    cy.get('[data-cy=password-input]').find('input').type('test1234')
    cy.get('[data-cy=confirmpassword-input]').find('input').type('test1234')
    cy.get('[data-cy=inscription-btn]').should('be.visible').click()
    cy.get('[data-cy=confirm-dialog-btn]').should('be.visible').click()
    cy.contains('Connexion').should('be.visible')
  })
})
