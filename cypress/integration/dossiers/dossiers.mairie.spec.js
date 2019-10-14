/// <reference types="cypress" />

describe('Dossiers mairie', () => {
  beforeEach(() => {
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
    cy.contains("Dossiers").should('be.visible')
    cy.get('[data-cy=file-upload-btn]').should('be.visible').click()
    cy.contains("Téléverser un fichier").should('be.visible')
    cy.get('[data-cy=file-upload-dropzone]').first().should('be.visible').then(function() {
      cy.fixture('cerfa_13703_DPMI.pdf', 'base64').then(fileContent => {
        cy.get('[data-cy=file-upload-dropzone]').upload({ fileContent, fileName: 'cerfa_13703_DPMI.pdf', mimeType: 'application/pdf', encoding: 'base64' },
        { subjectType: 'drag-n-drop', force: true });
      });
      cy.contains("Dossiers").should('be.visible')
      cy.get('[data-cy=piecejointe-preview-btn]').first().should('be.visible')
    })    
    cy.get('[data-cy=account-menu-appbar]').should('be.visible').click()
    cy.get('[data-cy=acount-menu-item-deconnexion]').should('be.visible').click()
    cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
    if (cy.isApiMock()) {
      cy.get('[data-cy=appbar-menu-item-btn-connexion-mairie]').should('be.visible').click()
    } else {
      cy.get('#kc-login').should('be.visible')
      cy.get('#username').type('madame.le-maire')
      cy.get('#password').type('madame.le-maire')
      cy.get('#kc-login').click()
    }
  })
  
  it('cy.click() - qualifier dossier ok', () => {
    cy.contains("Dossiers").should('be.visible')
    cy.get('[data-cy=piecejointe-preview-btn]').first().should('be.visible').click()
    cy.contains("Dossier").should('be.visible')
    cy.get("[data-cy=step-DEPOSE]").should('be.visible').children("div[class*='makeStyles-active']").should('not.be.empty')
    cy.get("[data-cy=qualifier-btn]").should('be.visible').click()
    cy.get("[data-cy=step-QUALIFIE]").should('be.visible').children('div[class*="makeStyles-active"]').should('not.be.empty')
  })
})
