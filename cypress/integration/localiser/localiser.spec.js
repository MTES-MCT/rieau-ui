/// <reference types="Cypress" />

context('Localiser', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('cy.click() - go to localiser page', () => {
    cy.get('[data-cy=appbar-localiser-btn]').should('be.visible').click()
    cy.get('[data-cy=leaflet-map]').should('be.visible')
    cy.contains('Aide').should('be.visible').click()
    cy.contains("La commune n'apparaît pas ?").should('be.visible')
    cy.contains('Déposer').should('be.visible')
  })

  it('cy.click() - go to chercher adresse marker', () => {
    cy.get('[data-cy=appbar-localiser-btn]').should('be.visible').click()
    cy.get('[data-cy=leaflet-map]').should('be.visible')
    cy.get('.leaflet-pane .leaflet-marker-pane > img').should('have.length', 7).last().click({force: true})
    cy.contains("Saint-Tropez").should('be.visible')
    cy.get('[data-cy=chercher-adresse-input]').find('input').type('chemin')
    cy.contains('Chemin des Salins 83990 Saint-Tropez').should('be.visible')
    cy.contains('Recentrer').should('be.visible').click()
  })
})
