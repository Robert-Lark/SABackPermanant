//THIS IS WHERE THE USER CAN SUBMIT REVIEWS

import {list} from "@keystone-next/keystone/schema";
import {integer, relationship, select, text} from "@keystone-next/fields";
import {isSignedIn, rules} from "../access";

export const OrderItem = list({
  //set access here
  access: {
    create: isSignedIn,
    read: rules.canManageOrderItems,
    update: () => false,
    delete: () => false,
  },
  fields: {
    //TODO change to TITLE
    name: text({
      isRequired: true,
    }),
    //TODO change to Review
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    price: integer(),
    photo: relationship({
      ref: "ProductImage",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: {fields: ["image", "altText"]},
        inlineEdit: {fields: ["image", "altText"]},
      },
    }),
    quantity: integer(),
    order: relationship({ref: "Order.items"}),
  },
});
