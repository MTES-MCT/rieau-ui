/// <reference types="Cypress" />

context('Dépôts', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('cy.click() - go to depot page', () => {
    cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
    cy.get('[data-cy=menuitem-connexion-depositaire]').should('be.visible').click()
    cy.contains("Mes dépôts").should('be.visible')
    cy.get('[title="Voir le dépôt"]').should('be.visible').first().click()
    cy.contains("Dépôt n°0").should('be.visible')
  })
})
