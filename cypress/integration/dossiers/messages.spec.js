/// <reference types="Cypress" />

describe('Messages ajoutés', () => {
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
    cy.get('[data-cy=file-upload-btn]').first().should('be.visible').click().then(function() {
      cy.fixture('cerfa_13703_DPMI.pdf', 'base64').then(fileContent => {
        cy.get('[data-cy=file-upload-dropzone]').upload({ fileContent, fileName: 'cerfa_13703_DPMI.pdf', mimeType: 'application/pdf', encoding: 'base64' },
        { subjectType: 'drag-n-drop' });
      });
      cy.contains("Dossiers").should('be.visible')
      cy.get('[data-cy=piecejointe-preview-btn]').first().should('be.visible').click()
      cy.contains("Dossier").should('be.visible')
    })
  })

  it('cy.click() - go to dossier messages DP page format ok', () => {  
    cy.contains("Dossier").should('be.visible')
    cy.get("[data-cy=messages-btn]").should('be.visible').click()
    cy.contains("Messages").should('be.visible')
    cy.get('[data-cy=message-ajouter-btn]').first().should('be.visible').click()
    cy.contains("Nouveau message").should('be.visible')
    cy.get('[data-cy=message-contenu-textarea]').should('be.visible').type('Incomplet!')
    cy.get('[data-cy=message-envoyer-btn]').should('be.visible').click()
    cy.contains("Messages").should('be.visible')
    cy.contains("Incomplet!").should('be.visible')
  })

})
