const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  'traicay',    
  'root',        
  'nguyenvu',      
  {
    host: 'localhost',  
    dialect: 'mysql', 
    logging: console.log
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Kết nối cơ sở dữ liệu thành công.');

    sequelize.sync({ alter: true })
      .then(() => {
        console.log('Đồng bộ tất cả mô hình thành công!');
      })
      .catch((err) => {
        console.error('Lỗi khi đồng bộ mô hình:', err);
      });
  })
  .catch((err) => {
    console.error('Không thể kết nối cơ sở dữ liệu:', err);
  });

module.exports = sequelize;
