import {Model, Sequelize, DataType} from "sequelize-typescript"

const sequelize = new Sequelize(
    "database",
    "apurba",
    "password",
    {
        host: "0.0.0.0",
        dialect: "sqlite",
        storage: "./database/mydb.sqlite"
    },

)

export class Users extends Model {
    public id!: number;
    public fullName: string;
    public username: string;
    public email: string;
    public password: string;
  }


  Users.init({
      id: {
          type: DataType.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      fullName:{
          type: new DataType.STRING(128),
          allowNull: false,
      },
      username:{
          type: new DataType.STRING(128),
          allowNull: false,
      },
      email:{
          type: new DataType.STRING(128),
          allowNull: false,
      },
      password:{
          type: new DataType.STRING(128),
          allowNull: false,
      }
  },{
      tableName: "users",
      sequelize: sequelize
  })
export class Mail extends Model {
    public id!: number;
    public from: string;
    public to: string;
    public title: string;
    public desc: string;
}

Mail.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    from:{
        type: new DataType.STRING(128),
        allowNull: false,
    },
    to:{
        type: new DataType.STRING(128),
        allowNull: false,
    },
    title:{
        type: new DataType.STRING(128),
        allowNull: false,
    },
    desc:{
        type: new DataType.STRING(1024),
        allowNull: false,
    },
}, {
    tableName: "mails",
    sequelize: sequelize
})

Users.sync().then(() => console.log("Table created !"));
Mail.sync().then(() => console.log("Second Table created"))
