type PolicyType = {
    maturityDuration: number
    renewDuration: number
    title: string
    description: string
    coverage: number
}

export async function updatePolicyType(
    policyTypeId: number,
    updates: Partial<PolicyType>
) {}
