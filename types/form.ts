import type * as db from "@/types/dbSchema";


export interface PolicyForm extends Omit<db.Policy, "policy_id" | "customer_id" | "status" | "premium_amount"> {};