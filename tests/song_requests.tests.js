// const chai = require('chai');
// const expect = chai.expect; //could have assert or should pattern
// const chaiHttp = require('chai-http'); //because we are making http requests

// chai.use(chaiHttp);//making chai aware we are using chai-http (different library)

// //describe('descriptor', function())
// //Very important
// //Block of test under it(descriptor, execution)

// /** DESCRIBE IN A DESCRIBE / TEST SUITE -> GET Methods/POST Methods
//  * describe('Tasks API Service Suite', function () {
//  *  describe('GET methods', function () {
//       it('should GET all tasks', function (done) {
//         chai
//           .request('http://localhost:3000')
//           .get('/api/tasks')
//           //need function vairables that match route and controller .get function
//           .end(function (err, resp) {
//             expect(resp.status).to.be.eql(200);
//             expect(resp.body).to.be.a('array');
//             expect(resp.body.length).to.not.be.eql(0);
//             //expect(resp.body.[0]).to.be.eql({}); //type check
//             done();
//           });//limitations = array(DB) is fixed //can set up users test DB, song request test DB etc.. //open check
//       });//single unit of testing

//     describe('POST methods', function () {
//       it('should do a POST request', function () {});
//     });
//  */


// describe('Song Requests API Service', function () {
//   it('should GET all song_requests', function (done) {
//     chai
//       .request('http://localhost:3000')
//       .get('/api/song_requests')
//       //need function vairables that match route and controller .get function
//       .end(function (err, resp) {
//         expect(resp.status).to.be.eql(200);
//         expect(resp.body).to.be.a('array');
//         expect(resp.body.length).to.not.be.eql(0);
//         //expect(resp.body.[0]).to.be.eql({}); //type check
//         done();
//       });//limitations = array(DB) is fixed //can set up users test DB, song request test DB etc.. //open check
//   });//single unit of testing


// //   it('should GET a single task', function (done) {
// //     const expected = [
// //       {
// //         id: 1,
// //         name: "I'm the first task!",
// //         created_date: '2020-03-24T05:09:49.000Z',
// //         status: 'completed',
// //       },
// //     ];

// //     chai
// //       .request('http://localhost:3000')
// //       .get('/api/tasks/1')
// //       .end(function (err, resp) {
// //         expect(resp.status).to.be.eql(200);
// //         expect(resp.body).to.be.a('array');
// //         expect(resp.body.length).to.not.be.eql(0);
// //         expect(resp.body).to.be.eql(expected);
// //         done();
// //       });
// //   });

// //   it.skip('should POST a single task', function (done) {
// //     const newTask = {
// //       name: 'New test task!',
// //     };
// //     const expected = { message: 'Add task successfully!' };

// //     chai
// //       .request('http://localhost:3000')
// //       .post('/api/tasks')
// //       .send(newTask)
// //       .end(function (err, resp) {
// //         expect(resp.status).to.be.eql(200);
// //         expect(resp.body).to.be.eql(expected);
// //         done();
// //       });
// //   });
// });