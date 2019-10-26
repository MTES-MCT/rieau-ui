/// <reference types="Cypress" />

describe('Pieces jointes deposees', () => {
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
      cy.get('[data-testid=MuiDataTableBodyCell-0-0]').first().should('be.visible').click()
      cy.contains("Dossier").should('be.visible')
    })
  })

  it('cy.click() - go to dossiers pieces jointes DP page format ok', () => {  
    cy.contains("Dossier").should('be.visible')
    cy.get("[data-cy=piecesjointes-btn]").should('be.visible').click()
    cy.contains("CERFA initial et pièces jointes").should('be.visible')
    cy.contains('CERFA 13703-06').should('be.visible')
    cy.contains("DP1").should('be.visible')
    cy.get('[data-cy=file-upload-btn]').first().should('be.visible').click()
    cy.contains("Téléverser un fichier").should('be.visible')
    cy.get('[data-cy=file-upload-dropzone]').first().should('be.visible').then(function() {
      cy.fixture('cerfa_13703_DPMI.pdf', 'base64').then(fileContent => {
        cy.get('[data-cy=file-upload-dropzone]').upload({ fileContent, fileName: 'cerfa_13703_DPMI.pdf', mimeType: 'application/pdf', encoding: 'base64' },
        { subjectType: 'drag-n-drop' });
      });
    })
    cy.wait(500)
    cy.contains("CERFA initial et pièces jointes").should('be.visible')
    cy.get('[data-cy=piecejointe-preview-btn]').first().should('be.visible').click()
    cy.contains("Aperçu").should('be.visible')
  })

  it('cy.click() - go to dossiers pieces jointes DP page format ko', () => {
    cy.contains("Dossier").should('be.visible')
    cy.get("[data-cy=piecesjointes-btn]").should('be.visible').click()
    cy.contains("CERFA initial et pièces jointes").should('be.visible')
    cy.contains('CERFA 13703-06').should('be.visible')
    cy.contains("DP1").should('be.visible')
    cy.get('[data-cy=file-upload-btn]').first().should('be.visible').click()
    cy.contains("Téléverser un fichier").should('be.visible')
    cy.get('[data-cy=file-upload-dropzone]').first().should('be.visible').then(function() {
      cy.fixture('sample.pdf.zip', 'base64').then(fileContent => {
        cy.get('[data-cy=file-upload-dropzone]').upload({ fileContent, fileName: 'sample.pdf.zip', mimeType: 'application/zip', encoding: 'base64' },
        { subjectType: 'drag-n-drop' });
      });
      cy.contains("Fichier rejeté").should('be.visible')
      cy.contains("application/pdf").should('be.visible')
    })
  })

})
