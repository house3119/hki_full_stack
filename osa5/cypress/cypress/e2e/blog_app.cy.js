

describe('Blog App E2E tests', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')

    const user1 = {
      username: 'Teppo Testaaja 69',
      name: 'Teppo Töppönen',
      password: 'Erittäin salainen passu 35'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)

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


    describe('When blog exist', function() {
      beforeEach(function() {
        cy.addBlog({ title: 'Testi blog 345', author: 'Author 345', url: 'www.test345.com' })
        cy.visit('http://localhost:5173')
      })

      it('User can like a blog', function() {
        cy.contains('Testi blog 345 - by Author 345')
          .parent().find('button').contains('View')
          .click()

        cy.contains('Testi blog 345 - by Author 345')
          .parent().contains('Like')
          .click()

        cy.contains('Testi blog 345 - by Author 345')
          .parent().contains('Likes: 1')
      })

      it('User can remove a blog that they added', function() {
        cy.contains('Testi blog 345 - by Author 345')
        .parent().find('button').contains('View')
        .click()

        cy.on('window:confirm', function(str) {
          expect(str).to.eq('Really want to remove blog "Testi blog 345" by Author 345')
        })

        cy.contains('Testi blog 345 - by Author 345')
          .parent().find('button').contains('Remove')
          .click()

        cy.contains('Testi blog 345 - by Author 345').should('not.exist')
      })

      it('Only user who added a blog can see remove button for it', function() {
        // Create new user...
        const user2 = {
          username: 'Keijo Kokeilija 35',
          name: 'Keijo',
          password: 'Keijon passu'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user2)

        // Log user in and refresh the page..
        cy.login({ username: 'Keijo Kokeilija 35', password: 'Keijon passu' })
        cy.visit('http://localhost:5173')

        // Find blog added by the previous test user and check that remove button does not exist..
        cy.contains('Testi blog 345 - by Author 345')
          .parent().find('button').contains('View')
          .click()

        cy.contains('Testi blog 345 - by Author 345')
          .parent().find('button').contains('Remove').should('not.exist')
      })

      it('Multiple blogs are arranged by likes correctly', function() {
        // Add 2 more blogs with different like counts..
        cy.addBlog({
          title: 'Testi blog with 3 likes',
          author: 'Author 3',
          url: 'www.test3.com',
          likes: 3
        })
        cy.addBlog({
          title: 'Testi blog with 5 likes',
          author: 'Author 5',
          url: 'www.test5.com',
          likes: 5
        })
        cy.visit('http://localhost:5173')

        // Open all blogs to view the like counts..
        cy.get('.blog-div').as('blog-divs')
        cy.get('@blog-divs').eq(1).find('button').contains('View').click()
        cy.get('@blog-divs').eq(2).find('button').contains('View').click()
        cy.get('@blog-divs').eq(0).find('button').contains('View').click()
        
        // Check that the first blog is the one with 5 likes..
        cy.get('@blog-divs').eq(0).contains('Testi blog with 5 likes')
        cy.get('@blog-divs').eq(0).contains('Likes: 5')

        // Check that the last blog is the one with 0 likes..
        cy.get('@blog-divs').eq(2).contains('Testi blog 345')
        cy.get('@blog-divs').eq(2).contains('Likes: 0')

        // Huom! Blogien 'avaaminen' ei ole välttämätöntä testausta ajatellen, vaan testauksen voi hyvin tehdä pelkästään blogin nimen perusteella, kun tiedetään mitkä blogit tietokannassa on.
      })
    })
  })
})