describe('bloglist app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  
  it('front page opens', function() {
    cy.contains('Log in to application')
  })

  it('user can login', function() {
    cy.get('#username-input').type('root')
    cy.get('#password-input').type('secretpassword')
    cy.get('#login-button').click()
    
    cy.contains('superuser logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
    cy.get('#username-input').type('root')
    cy.get('#password-input').type('secretpassword')
    cy.get('#login-button').click()
    })

    it.only('a new blog can be created', function() {
      cy.contains('Create blog').click()
      cy.get('#title-input').type('testing title')
      cy.get('#submit-button').click()
      cy.contains('testing title')
    })
  })
  
})