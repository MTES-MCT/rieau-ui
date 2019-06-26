/// <reference types="Cypress" />

context('Pieces jointes deposees', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('cy.click() - go to depots pieces jointes page', () => {
    cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
    cy.contains("Mon Compte").should('be.visible')
    cy.get('[data-cy=appbar-depots-btn]').should('be.visible').click()
    cy.get('[data-cy=menu-item-link-deposer]').should('be.visible').click()
    cy.contains('CERFA').should('be.visible')
  })
})
