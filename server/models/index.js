const { Sequelize } = require('sequelize');

require('dotenv').config();
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize('pick', 'root', DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});


(async()=>{
try {
    await sequelize.authenticate();
    console.log("db 연결 성공");
} catch (error) {
    console.log('연결할 수 없음');
}
})();