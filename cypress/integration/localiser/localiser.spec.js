/// <reference types="Cypress" />

context('Localiser', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('cy.click() - go to localiser page', () => {
    cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
    cy.get('[data-cy=appbar-menuitem-connexion-depositaire]').should('be.visible').click()
    cy.contains("Mes dépôts").should('be.visible')
    cy.get('[data-cy=appbar-depots-btn]').should('be.visible').click()
    cy.get('[data-cy=menu-item-link-localiser]').should('be.visible').click()
    cy.get('[data-cy=map]').should('be.visible')
    cy.contains("La commune n'apparaît pas ?").should('be.visible')
    cy.contains('Déposer').should('be.visible')
  })

  it('cy.click() - go to chercher adresse marker', () => {
    cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
    cy.get('[data-cy=appbar-menuitem-connexion-depositaire]').should('be.visible').click()
    cy.contains("Mes dépôts").should('be.visible')
    cy.get('[data-cy=appbar-depots-btn]').should('be.visible').click()
    cy.get('[data-cy=menu-item-link-localiser]').should('be.visible').click()
    cy.get('[data-cy=map]').should('be.visible')
    cy.contains("Saint-Tropez").should('be.visible').click()
    cy.get('[data-cy=chercher-adresse-input]').find('input').type('chemin')
    cy.contains('Chemin des Salins 83990 Saint-Tropez').should('be.visible').click()
  })
})
