describe('bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'superuser',
      username: 'root',
      password: 'secretpassword'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  
  it('login form is shown by default', function() {
    cy.contains('Log in to application')
    cy.get('#username-input')
    cy.get('#password-input')
    cy.get('#login-button')
  })

  describe('login', function() {
    it('works with correct credentials', function () {
      cy.get('#username-input').type('root')
      cy.get('#password-input').type('secretpassword')
      cy.get('#login-button').click()
    
    cy.contains('superuser logged in')
    })

    it.only('fails with wrong credentials', function() {
      cy.get('#username-input').type('root')
      cy.get('#password-input').type('wrongpassword')
      cy.get('#login-button').click()
      
      cy.get('.error').contains('Invalid credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
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