describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Sini',
      username: 'sini',
      password: 'sini'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Blogs')
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('sini')
      cy.get('#password').type('sini')
      cy.contains('login').click()

      cy.contains('Sini logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('sini')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('sini')
      cy.get('#password').type('sini')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('www.abc.fi')
      cy.contains('create').click()
      cy.contains('a blog created by cypress')
    })
  })

})