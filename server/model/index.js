const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pick', 'root', 'woo5157367~!@', {
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