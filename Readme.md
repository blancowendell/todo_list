Install
npm install


npm run dev


Re Roll the migrations 
(Powershell)
npx sequelize-cli db:drop; npx sequelize-cli db:create; npx sequelize-cli db:migrate

(CMD)
npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate

Create All
(Powershell)
npx sequelize-cli db:create; npx sequelize-cli db:migrate; npx sequelize-cli db:seed:all

(CMD)
npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all

