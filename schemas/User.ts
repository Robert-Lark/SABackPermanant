import {list} from "@keystone-next/keystone/schema";
import {text, password, relationship} from "@keystone-next/fields";
export const User = list({
  //access:
  //ui
  //this is where you define the fields that live on the user DB
  fields: {
    name: text({isRequired: true}),
    email: text({isRequired: true, isUnique: true}),
    password: password(),
    cart: relationship({
      ref: "CartItem.user",
      many: true,
      ui: {
        createView: {fieldMode: "hidden"},
        itemView: {fieldMode: "read"},
      },
    }),
  },
});