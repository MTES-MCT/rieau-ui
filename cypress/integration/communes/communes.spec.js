/// <reference types="Cypress" />

context('Communes allowed', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
    if (cy.isApiMock()) {
      cy.get('[data-cy=appbar-menuitem-connexion-depositaire]').should('be.visible').click()
    } else {
      cy.get('#kc-login').should('be.visible')
      cy.get('#username').type('jean.martin')
      cy.get('#password').type('jean.martin')
      cy.get('#kc-login').click()
    }
  })

  it('cy.click() - go to communes page', () => {
    cy.contains("Dépôts").should('be.visible')
    cy.get('[data-cy=appbar-depots-btn]').should('be.visible').click()
    cy.get('[data-cy=menu-item-link-depots]').should('be.visible')
    cy.get('[data-cy=menu-item-link-communes]').should('be.visible').click()
    cy.contains("Communes partenaires").should('be.visible')
  })
})

context('Communes forbidden', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
    if (cy.isApiMock()) {
      cy.get('[data-cy=appbar-menuitem-connexion-instructeur]').should('be.visible').click()
    } else {
      cy.get('#kc-login').should('be.visible')
      cy.get('#username').type('jacques.dupont')
      cy.get('#password').type('jacques.dupont')
      cy.get('#kc-login').click()
    }
  })

  it('cy.click() - go to communes page', () => {
    cy.contains("Dépôts").should('be.visible')
    cy.get('[data-cy=appbar-depots-btn]').should('be.visible').click()
    cy.get('[data-cy=menu-item-link-depots]').should('be.visible')
    cy.get('[data-cy=menu-item-link-communes]').should('not.be.visible')
  })
})

