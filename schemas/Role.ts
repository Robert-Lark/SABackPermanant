import {relationship, text} from "@keystone-next/fields";
import {list} from "@keystone-next/keystone/schema";
import { permissionFields } from "./fields";

export const Role = list({
  fields: {
    name: text({isRequired: true}),
    // this copies and pastes the permissions from our permissions fields file
    // it allows them to be represented in the UI with Checkboxes. 
    ...permissionFields,
    assignedTo: relationship({
      //Remember, any time you make a relationship
      // you have to make a reference to it on the other item aswell.
      ref: "User.role",
      // many can have this specific role
      many: true,
      ui: {
        itemView: {fieldMode: "read"},
      },
    }),
  },
});
