/// <reference types="Cypress" />

describe('Localiser avec un compte instructeur non beta testeur', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
      if (cy.isApiMock()) {
        cy.get('[data-cy=appbar-menu-item-btn-connexion-instructeur]').should('be.visible').click()
      } else {
        cy.get('#kc-login').should('be.visible')
        cy.get('#username').type('jacques.dupont')
        cy.get('#password').type('jacques.dupont')
        cy.get('#kc-login').click()
      }
    })
  
    it('cy.click() - go to localiser page impossible', () => {
      cy.contains("Dossiers").should('be.visible')
      cy.get('[data-cy=appbar-dossiers-btn]').should('be.visible').click()
      cy.get('[data-cy=menu-item-link-dossiers]').should('be.visible')
      cy.get('[data-cy=menu-item-link-localiser]').should('not.be.visible')
    })
  })