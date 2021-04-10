//THIS IS WHERE THE USER CAN SUBMIT REVIEWS

import {list} from "@keystone-next/keystone/schema";
import {integer, relationship, select, text} from "@keystone-next/fields";
import {isSignedIn, rules} from "../access";
import {User} from "./User";

export const Product = list({
  //set access here
  access: {
    create: isSignedIn,
    read: rules.canReadProducts,
    update: rules.canManageProducts,
    delete: rules.canManageProducts,
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
      ref: "ProductImage.product",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: {fields: ["image", "altText"]},
        inlineEdit: {fields: ["image", "altText"]},
      },
    }),
    status: select({
      options: [
        {label: "Draft", value: "DRAFT"},
        //TODO change to publish
        {label: "Available", value: "AVAILABLE"},
        {label: "Unavailable", value: "UNAVAILABLE"},
      ],
      defaultValue: "DRAFT",
      ui: {
        displayMode: "segmented-control",
        createView: {fieldMode: "hidden"},
      },
    }),
    user: relationship({
      ref: "User.products",
      defaultValue: ({context}) => ({connect: {id: context.session.itemId}}),
    }),
  },
});
