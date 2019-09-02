/// <reference types="Cypress" />

context('Dépôts', () => {
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

  it('cy.click() - go to depot page', () => {
    cy.contains("Dépôts").should('be.visible')
    cy.get('[title="Voir le dépôt"]').should('be.visible').first().click()
    cy.contains("Dépôt n°0").should('be.visible')
  })
  it('cy.click() - ajouter depot', () => {
    cy.contains("Dépôts").should('be.visible')
    cy.get('[data-cy=file-upload-btn]').should('be.visible').click()
    cy.contains("Téléverser un fichier").should('be.visible')
    cy.get('[data-cy=file-upload-dropzone]').first().should('be.visible').then(function() {
      cy.dropFixtureInDropZone('sample.pdf.zip', 'application/zip', '[data-cy=file-upload-dropzone]')
      cy.contains("Fichier rejeté").should('be.visible')
      cy.contains("application/pdf").should('be.visible')
      cy.dropFixtureInDropZone('cerfa_13703_PCMI.pdf', 'application/pdf', '[data-cy=file-upload-dropzone]')
    })
    cy.contains("Dépôts").should('be.visible')
    
  })
})

context('Ajouter dépôt forbidden', () => {
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

  it('cy.click() - ajouter dépôt', () => {
    cy.contains("Dépôts").should('be.visible')
    cy.get('[data-cy=file-upload-btn]').should('not.be.visible')
  })
})
