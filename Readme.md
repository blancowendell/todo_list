Install
npm install

Create All
(Powershell)
npx sequelize-cli db:create; npx sequelize-cli db:migrate; npx sequelize-cli db:seed:all

(CMD)
npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all

npm run dev

Default Username and Password but you can create on your own in register
username-admin
passsword-admin


Re Roll the migrations 
(Powershell)
npx sequelize-cli db:drop; npx sequelize-cli db:create; npx sequelize-cli db:migrate

(CMD)
npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate


