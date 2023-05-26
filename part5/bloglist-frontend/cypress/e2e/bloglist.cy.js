describe('bloglist app', function() {
  it('front page opens', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
  })
})