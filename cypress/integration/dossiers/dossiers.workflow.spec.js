/// <reference types="cypress" />

describe('Dossiers workflow', () => {
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
   
  })
  
  it('cy.click() - workflow complet dossier ok', () => { 
    cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
    if (cy.isApiMock()) {
      cy.get('[data-cy=appbar-menu-item-btn-connexion-mairie]').should('be.visible').click()
    } else {
      cy.get('#kc-login').should('be.visible')
      cy.get('#username').type('madame.le-maire')
      cy.get('#password').type('madame.le-maire')
      cy.get('#kc-login').click()
    }
      cy.contains("Dossiers").should('be.visible')
      cy.get('[data-cy=piecejointe-preview-btn]').first().should('be.visible').click()
      cy.contains("Dossier").should('be.visible')
    cy.get("[data-cy=step-DEPOSE]").should('be.visible').children("div[class*='makeStyles-active']").should('not.be.empty')
    cy.get("[data-cy=qualifier-btn]").should('be.visible').click()
    cy.get("[data-cy=step-QUALIFIE]").should('be.visible').children('div[class*="makeStyles-active"]').should('not.be.empty')
    cy.wait(200)
    cy.get('[data-cy=account-menu-appbar]').should('be.visible').click()
    cy.get('[data-cy=acount-menu-item-deconnexion]').should('be.visible').click()
    cy.get('[data-cy=appbar-connexion-btn]').should('be.visible').click()
    if (cy.isApiMock()) {
      cy.get('[data-cy=appbar-menu-item-btn-connexion-instructeur]').should('be.visible').click()
    } else {
      cy.get('#kc-login').should('be.visible')
      cy.get('#username').type('jacques.dupont')
      cy.get('#password').type('jacques.dupont')
      cy.get('#kc-login').click()
    }
    cy.contains("Dossiers").should('be.visible')
    cy.get('[data-cy=piecejointe-preview-btn]').first().should('be.visible').click()
    cy.contains("Dossier").should('be.visible')
    cy.get("[data-cy=step-QUALIFIE]").should('be.visible').children('div[class*="makeStyles-active"]').should('not.be.empty')
    cy.get("[data-cy=instruire-btn]").should('be.visible').click()
    cy.get("[data-cy=step-INSTRUCTION]").should('be.visible').children('div[class*="makeStyles-active"]').should('not.be.empty')
    cy.get('[data-cy=message-ajouter-btn]').first().should('be.visible').click()
    cy.contains("Nouveau message").should('be.visible')
    cy.get('[data-cy=message-contenu-textarea]').should('be.visible').type('Incomplet!')
    cy.get('[data-cy=message-envoyer-btn]').should('be.visible').click()
    cy.get("[data-cy=step-INCOMPLET]").should('be.visible').children('div[class*="makeStyles-active"]').should('not.be.empty')
    cy.get("[data-cy=messages-btn]").should('be.visible').click()
    cy.contains("Messages").should('be.visible')
    cy.contains("Incomplet!").should('be.visible')
    cy.get("[data-cy=back-dossier-btn]").should('be.visible').click()
    cy.get("[data-cy=instruire-btn]").should('be.visible').click()
    cy.get("[data-cy=step-INSTRUCTION]").should('be.visible').children('div[class*="makeStyles-active"]').should('not.be.empty')
    cy.get("[data-cy=declarer-complet-btn]").should('be.visible').click()
    cy.get("[data-cy=step-COMPLET]").should('be.visible').children('div[class*="makeStyles-active"]').should('not.be.empty')
    cy.get("[data-cy=lancer-consultations-btn]").should('be.visible').click()
    cy.get("[data-cy=step-CONSULTATIONS]").should('be.visible').children('div[class*="makeStyles-active"]').should('not.be.empty')
    cy.wait(200)
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
    cy.contains("Dossiers").should('be.visible')
    cy.get('[data-cy=piecejointe-preview-btn]').first().should('be.visible').click()
    cy.contains("Dossier").should('be.visible')
    cy.get("[data-cy=step-CONSULTATIONS]").should('be.visible').children('div[class*="makeStyles-active"]').should('not.be.empty')
    cy.get('[data-cy=file-upload-btn]').first().should('be.visible').click()
    cy.contains("Téléverser un fichier").should('be.visible')
    cy.get('[data-cy=file-upload-dropzone]').first().should('be.visible').then(function() {
      cy.fixture('cerfa_13703_DPMI.pdf', 'base64').then(fileContent => {
        cy.get('[data-cy=file-upload-dropzone]').upload({ fileContent, fileName: 'cerfa_13703_DPMI.pdf', mimeType: 'application/pdf', encoding: 'base64' },
        { subjectType: 'drag-n-drop' });
      });
    })
    cy.wait(500)
    cy.get("[data-cy=step-DECISION]").should('be.visible').children('div[class*="makeStyles-active"]').should('not.be.empty')
    cy.wait(500)
    cy.get('[data-cy=account-menu-appbar]').should('be.visible').click()
    cy.get('[data-cy=acount-menu-item-deconnexion]').should('be.visible').click()
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
    cy.get('[data-cy=piecejointe-preview-btn]').first().should('be.visible').click()
    cy.contains("Dossier").should('be.visible')
    cy.get("[data-cy=step-DECISION]").should('be.visible').children('div[class*="makeStyles-active"]').should('not.be.empty')
    cy.get("[data-cy=piecesjointes-btn]").should('be.visible').click()
    cy.wait(200)
    cy.contains("Décision Mairie").should('be.visible')
    cy.get('[data-cy=piecejointe-preview-btn]').first().should('be.visible').click()
    cy.contains("Aperçu").should('be.visible')
  
  })
})
