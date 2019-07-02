/// <reference types="Cypress" />

context('Pieces jointes deposees', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('cy.click() - go to depots pieces jointes page', () => {
    cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
    cy.get('[data-cy=menuitem-connexion-depositaire]').should('be.visible').click()
    cy.contains("Mes dépôts").should('be.visible')
    cy.get('[data-cy=appbar-depots-btn]').should('be.visible').click()
    cy.get('[data-cy=menu-item-link-piecesjointes-pcmi]').should('be.visible').click()
    cy.contains('CERFA 13406-06').should('be.visible')
    cy.get('[data-cy=appbar-depots-btn]').should('be.visible').click()
    cy.get('[data-cy=menu-item-link-piecesjointes-dp]').should('be.visible').click()
    cy.contains('CERFA 13703-06').should('be.visible')
  })
})
