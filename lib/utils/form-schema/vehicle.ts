import { z } from "zod";


export const VehicleSchema = z.object({
  vehicle_number: z
    .string()
    .transform(no => no.replaceAll(" ", "").replaceAll("-", ""))
    .pipe(
      z
        .string()
        .regex(/^[A-Z|a-z]{2}[0-9]{1,2}[A-Z|a-z]{0,3}[0-9]{4}$/, "Invalid vehicle number"),
    ),
  vehicle_type: z
    .string()
    .trim()
    .min(1, "Vehicle type cannot be empty")
    .max(255, "Vehicle type is too long"),
  vehicle_make: z
    .string()
    .trim()
    .min(1, "Vehicle make cannot be empty")
    .max(255, "Vehicle make is too long"),
  vehicle_manufacturer: z
    .string()
    .trim()
    .min(1, "Vehicle manufacturer cannot be empty")
    .max(255, "Vehicle manufacturer is too long"),
  vehicle_price: z
    .coerce
    .number()
    .min(1, "Invalid price"),
  registration_year: z
    .coerce
    .number()
    .min(2000, "Invalid registration year"),
  registration_month: z
    .coerce
    .number()
    .min(1, "Invalid month")
    .max(12, "Invalid month"),
});

export type VehicleSchema = z.infer<typeof VehicleSchema>;