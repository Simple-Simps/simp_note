var app1 = require('../public/app.js')
var index = require('../index.js')
var jsdom = require('mocha-jsdom')

const chai = require('chai')
const chaiHttp = require('chai-http')

global.document = jsdom()

chai.should()
chai.expect()
chai.assert()
chai.user(chaitHttp)

// attempt to get a TDD going
describe('Simp Note', function() {
    describe('delete()', function() {
        var app1 = require('../public/app.js')
        var index = require('../index.js') 
        chai.request(index)
        it('delete() should delete a note and return true', function(){
            let result = app1.delete()
            assert.equal(result, 'true')
        })
    })
})

// describe('Simp Note Test', () => {
//     describe('GET /allNotes', () => {
//         it('It should GET all the notes', (done) => {
//             chai.request(index)
//                 .get('/allNotes')
//                 .end((response) => {
//                     response.body.should.be.a('array')
//                     response.body.length.should.be.equal(3)
//                 done()
//                 })
//         })
//     })
// })


// var data = { title: 'test', note: 'hello world'}

