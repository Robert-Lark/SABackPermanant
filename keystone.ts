import "dotenv/config";

import {createAuth} from "@keystone-next/auth";
import {config, createSchema} from "@keystone-next/keystone/schema";
import {withItemData, statelessSessions} from "@keystone-next/keystone/session";
//IMPORT SCHEMA
import {User} from "./schemas/User";
import {CartItem} from "./schemas/CartItem";
import {OrderItem} from "./schemas/OrderItem";
import {Order} from "./schemas/Order";
import {Product} from "./schemas/Product";
import {ProductImage} from "./schemas/ProductImage";
import {insertSeedData} from "./seed-data";
import { sendPasswordResetEmail } from "./lib/mail";
import {extendGraphqlSchema} from './mutations'
//CONNECT DB
const databaseURL = process.env.DATABASE_URL || "mongodb.com";

const sessionConfig = {
  //how long does the user stay signed in
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const {withAuth} = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    //ADDING IN ROLES
  },
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      //DATA SEEDING
      async onConnect(keystone) {
        console.log("connected to the db");
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      //this is where you define the sections of your database
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order
    }),
    extendGraphqlSchema,
    ui: {
      //Show the ui only for artists to respond to interview questions or a user wants to review a title
      isAccessAllowed: ({session}) => {
        return !!session?.data;
      },
    },
    //SESSION VALUES
    session: withItemData(statelessSessions(sessionConfig), {
      User: `id`,
    }),
  })
);
