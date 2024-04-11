module.exports = async (con, query, params) =>
  new Promise((resolve, reject) => {
    const handler = (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    };
    con.query(query, params, handler);
  });

  //Promise ^ 
  // Racecar analogy, this entire function is the "race" 
  //Returns new Promise//ES6 doen't need *return new Promise
  //con.query is exposed with con object 