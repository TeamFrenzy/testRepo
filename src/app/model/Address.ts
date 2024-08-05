import { Column } from "typeorm";

export const addressSchema = {
  required: ["address", "city", "province", "postalCode"],
  properties: {
    address: { type: "string" },
    city: { type: "string" },
    province: { type: "string" },
    postalCode: { type: "string" },
  },
  additionalProperties: false,
};

export class Address {
  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  province!: string;

  @Column()
  postalCode!: string;
}
