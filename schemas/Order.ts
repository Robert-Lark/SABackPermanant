//THIS IS WHERE THE USER CAN SUBMIT REVIEWS

import {list} from "@keystone-next/keystone/schema";
import {
  integer,
  relationship,
  select,
  text,
  virtual,
} from "@keystone-next/fields";
import formatMoney from "../lib/formatMoney";
import {isSignedIn, rules} from "../access";

export const Order = list({
  //set access here
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: () => false,
    delete: () => false,
  },
  fields: {
    //virtual is a dynamic label that is populated by information
    // from the item specifics
    label: virtual({
      graphQLReturnType: "String",
      resolver: function (item) {
        return `order ID ${item.id}`;
      },
    }),
    cost: virtual({
      graphQLReturnType: "String",
      resolver: function (item) {
        return `order total ${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    items: relationship({ref: "OrderItem.order", many: true}),
    user: relationship({ref: "User.orders"}),
    charge: text(),
  },
});
