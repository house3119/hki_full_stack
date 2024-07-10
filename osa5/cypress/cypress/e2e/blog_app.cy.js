/*describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})*/

describe('Blog App E2E tests', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')

    const user = {
      username: 'Teppo Testaaja 69',
      name: 'Teppo Töppönen',
      password: 'Erittäin salainen passu 35'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Blog App')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', function() {
    it('Login succesful with correct username and password', function() {
      cy.get('#username').type('Teppo Testaaja 69')
      cy.get('#password').type('Erittäin salainen passu 35')
      cy.contains('Login').click()
  
      cy.contains('Logged in as Teppo Testaaja 69')
    })

    it('Login fails with wrong username', function() {
      cy.get('#username').type('Teppo Testaaja 7329')
      cy.get('#password').type('Erittäin salainen passu 35')
      cy.contains('Login').click()
  
      cy.contains('Invalid Username')
    })
  
    it('Login fails with wrong password', function() {
      cy.get('#username').type('Teppo Testaaja 69')
      cy.get('#password').type('Väärä passu')
      cy.contains('Login').click()
  
      cy.contains('Invalid Username')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Teppo Testaaja 69', password: 'Erittäin salainen passu 35' })
      cy.visit('http://localhost:5173')
    })

    it('User can add new Blog', function() {
      cy.contains('Add new blog').click()
      cy.get('#new-blog-title').type('Test blog 123')
      cy.get('#new-blog-author').type('Author 123')
      cy.get('#new-blog-url').type('www.testurl123.com')
      cy.contains('Add Blog').click()

      cy.contains('Test blog 123 - by Author 123')
    })

  })

})