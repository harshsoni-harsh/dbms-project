export type User = {
    uid: number,
    pwd_hash: string
    email: string
    role: string
    created_at: string
};

export type Customer = {
    customer_id: number
    first_name: string
    last_name: string
    email: string
    phone_no: string
    gender: string
    pan_no: string
};

export type Staff = {
    staff_id: number
    role: string
    first_name: string
    last_name: string
    phone_no: string
    email: string
    gender: string
};

export type PolicyType = {
    policy_type_id: number
    maturity_duration: number
    renew_duration: number
    title: string
    description: string
    coverage: number
};

export type Policy = {
    policy_id: number
    customer_id: number
    policy_type_id: number
    vehicle_manufacturer: string
    vehicle_type: string
    vehicle_make: string
    vehicle_price: number
    registration_year: number
    registration_month: number
    vehicle_number: string
    premium_amount: number
    vehicle_price: number
    status: string
};

export type IncidentReport = {
    incident_id: number
    damage_type: string
    damage_description: string
    status: string
};

export type Claim = {
    claim_id: number
    customer_id: number
    policy_id: number
    claim_amount: number
    incident_id: number
    created_at: string
    status: string
};

export type PremiumReceipt = {
    receipt_id: number
    amount: number
    policy_id: number
    created_at: string
    txn_id: number
};

export type ClaimReceipt = {
    claim_id: number
    created_at: string
    amount: number
    txn_id: number
};