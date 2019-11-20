/// <reference types="Cypress" />

describe('Mon compte', () => {
    it('show deposant mon compte', () => {
        cy.visit('/')
        cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
        if (cy.isApiMock()) {
            cy.get('[data-cy=appbar-menu-item-btn-connexion-deposant]').should('be.visible').click()
        } else {
            cy.get('#kc-login').should('be.visible')
            cy.get('#username').type('jean.martin')
            cy.get('#password').type('jean.martin')
            cy.get('#kc-login').click()
        }
        cy.get('[data-cy=account-menu-appbar]').should('be.visible').click()
        cy.get('[data-cy=acount-menu-item-profil]').should('be.visible').click()
        cy.contains('Mon Compte').should('be.visible')
        cy.contains('Profils').should('be.visible')
        cy.contains('déposant,bêta').should('be.visible')
    })
})