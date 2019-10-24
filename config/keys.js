if (process.env.NODE_ENV === 'production'){
  // we are in production return the prod keys 
module.exports = require('./prod')
}else{
  // we are in dev return the keys fro dev 
  module.exports = require('./dev')
}