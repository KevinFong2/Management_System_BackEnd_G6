const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://kevinfong21:qEGQV7dXHPx6@ep-flat-wildflower-112815.us-east-2.aws.neon.tech/neondb', {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

module.exports = sequelize;