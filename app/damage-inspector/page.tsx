"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DamageReview from "@/components/DamageReview";
import { useState } from "react";

const claimData = [
  {
    "CLAIM_ID": "CLM001",
    "CUST_ID": "CUS001",
    "AGREEMENT_ID": "AGR001",
    "CLAIM_AMOUNT": 5000,
    "INCIDENT_ID": "INC001",
    "DAMAGE_TYPE": "Property Damage",
    "DATE_OF_CLAIM": "2024-04-15T12:00:00",
    "CLAIM_STATUS": "Pending"
  },
  {
    "CLAIM_ID": "CLM002",
    "CUST_ID": "CUS002",
    "AGREEMENT_ID": "AGR002",
    "CLAIM_AMOUNT": 3000,
    "INCIDENT_ID": "INC002",
    "DAMAGE_TYPE": "Vehicle Damage",
    "DATE_OF_CLAIM": "2024-04-16T10:30:00",
    "CLAIM_STATUS": "Approved"
  },
  {
    "CLAIM_ID": "CLM003",
    "CUST_ID": "CUS003",
    "AGREEMENT_ID": "AGR003",
    "CLAIM_AMOUNT": 8000,
    "INCIDENT_ID": "INC003",
    "DAMAGE_TYPE": "Theft",
    "DATE_OF_CLAIM": "2024-04-17T15:45:00",
    "CLAIM_STATUS": "Pending"
  },
  {
    "CLAIM_ID": "CLM004",
    "CUST_ID": "CUS004",
    "AGREEMENT_ID": "AGR004",
    "CLAIM_AMOUNT": 6000,
    "INCIDENT_ID": "INC004",
    "DAMAGE_TYPE": "Fire Damage",
    "DATE_OF_CLAIM": "2024-04-18T08:20:00",
    "CLAIM_STATUS": "Pending"
  },
  {
    "CLAIM_ID": "CLM005",
    "CUST_ID": "CUS005",
    "AGREEMENT_ID": "AGR005",
    "CLAIM_AMOUNT": 7000,
    "INCIDENT_ID": "INC005",
    "DAMAGE_TYPE": "Flood Damage",
    "DATE_OF_CLAIM": "2024-04-19T14:10:00",
    "CLAIM_STATUS": "Rejected"
  },
  {
    "CLAIM_ID": "CLM006",
    "CUST_ID": "CUS006",
    "AGREEMENT_ID": "AGR006",
    "CLAIM_AMOUNT": 5500,
    "INCIDENT_ID": "INC006",
    "DAMAGE_TYPE": "Vandalism",
    "DATE_OF_CLAIM": "2024-04-20T11:55:00",
    "CLAIM_STATUS": "Approved"
  },
  {
    "CLAIM_ID": "CLM007",
    "CUST_ID": "CUS007",
    "AGREEMENT_ID": "AGR007",
    "CLAIM_AMOUNT": 4000,
    "INCIDENT_ID": "INC007",
    "DAMAGE_TYPE": "Accidental Damage",
    "DATE_OF_CLAIM": "2024-04-21T09:30:00",
    "CLAIM_STATUS": "Pending"
  },
  {
    "CLAIM_ID": "CLM008",
    "CUST_ID": "CUS008",
    "AGREEMENT_ID": "AGR008",
    "CLAIM_AMOUNT": 4500,
    "INCIDENT_ID": "INC008",
    "DAMAGE_TYPE": "Collision Damage",
    "DATE_OF_CLAIM": "2024-04-22T16:20:00",
    "CLAIM_STATUS": "Approved"
  },
  {
    "CLAIM_ID": "CLM009",
    "CUST_ID": "CUS009",
    "AGREEMENT_ID": "AGR009",
    "CLAIM_AMOUNT": 6500,
    "INCIDENT_ID": "INC009",
    "DAMAGE_TYPE": "Natural Disaster",
    "DATE_OF_CLAIM": "2024-04-23T13:40:00",
    "CLAIM_STATUS": "Pending"
  },
  {
    "CLAIM_ID": "CLM010",
    "CUST_ID": "CUS010",
    "AGREEMENT_ID": "AGR010",
    "CLAIM_AMOUNT": 7500,
    "INCIDENT_ID": "INC010",
    "DAMAGE_TYPE": "Hail Damage",
    "DATE_OF_CLAIM": "2024-04-24T17:15:00",
    "CLAIM_STATUS": "Rejected"
  }
]

const incident = [
  {
    "INCIDENT_ID": "INC001",
    "INCIDENT_TYPE": "Car Accident",
    "INCIDENT_DATE": "2024-04-10",
    "DESCRIPTION": "Collision between two vehicles"
  },
  {
    "INCIDENT_ID": "INC002",
    "INCIDENT_TYPE": "Vandalism",
    "INCIDENT_DATE": "2024-04-12",
    "DESCRIPTION": "Vehicle windows smashed"
  },
  {
    "INCIDENT_ID": "INC003",
    "INCIDENT_TYPE": "Burglary",
    "INCIDENT_DATE": "2024-04-14",
    "DESCRIPTION": "Break-in at the property"
  },
  {
    "INCIDENT_ID": "INC004",
    "INCIDENT_TYPE": "Fire",
    "INCIDENT_DATE": "2024-04-16",
    "DESCRIPTION": "Building caught on fire"
  },
  {
    "INCIDENT_ID": "INC005",
    "INCIDENT_TYPE": "Flood",
    "INCIDENT_DATE": "2024-04-18",
    "DESCRIPTION": "Heavy rainfall causing flooding"
  },
  {
    "INCIDENT_ID": "INC006",
    "INCIDENT_TYPE": "Vandalism",
    "INCIDENT_DATE": "2024-04-20",
    "DESCRIPTION": "Graffiti on property walls"
  },
  {
    "INCIDENT_ID": "INC007",
    "INCIDENT_TYPE": "Accident",
    "INCIDENT_DATE": "2024-04-22",
    "DESCRIPTION": "Fall from a ladder at home"
  },
  {
    "INCIDENT_ID": "INC008",
    "INCIDENT_TYPE": "Collision",
    "INCIDENT_DATE": "2024-04-24",
    "DESCRIPTION": "Vehicle collision on highway"
  },
  {
    "INCIDENT_ID": "INC009",
    "INCIDENT_TYPE": "Natural Disaster",
    "INCIDENT_DATE": "2024-04-26",
    "DESCRIPTION": "Earthquake causing structural damage"
  },
  {
    "INCIDENT_ID": "INC010",
    "INCIDENT_TYPE": "Hail Storm",
    "INCIDENT_DATE": "2024-04-28",
    "DESCRIPTION": "Damage to vehicles due to hail"
  }
]

const DamageInspector = () => {
  const [claimInfo, setClaimInfo] = useState(claimData);

  const onAccept = (id: string) => {
    const updatedClaim = claimInfo.map((item) => {

      if (item.CLAIM_ID === id)
        return ({ ...item, CLAIM_STATUS: "Approved" })
      else
        return item
    });

    setClaimInfo(updatedClaim)
    console.log(updatedClaim);
  }

  const onReject = (id: string) => {
    const updatedClaim = claimInfo.map((item) => {

      if (item.CLAIM_ID === id)
        return ({ ...item, CLAIM_STATUS: "Rejected" })
      else
        return item
    });

    setClaimInfo(updatedClaim)
    console.log(updatedClaim);
  }

  return (
    <div className="max-w-full max-h-full flex flex-col p-4 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Claim ID</TableHead>
            <TableHead>
              CUST_ID
            </TableHead>
            <TableHead>
              AGREEMENT_ID
            </TableHead>
            <TableHead>
              CLAIM_AMOUNT
            </TableHead>
            <TableHead>
              INCIDENT_ID
            </TableHead>
            <TableHead>
              DAMAGE_TYPE
            </TableHead>
            <TableHead>
              DATE_OF_CLAIM
            </TableHead>
            <TableHead>
              CLAIM_STATUS
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claimInfo.map((data) => (
            data.CLAIM_STATUS === 'Pending' &&
            <TableRow key={data.CLAIM_ID}>
              <TableCell className="font-medium">{data.CLAIM_ID}</TableCell>
              <TableCell>
                {data.CUST_ID}
              </TableCell>
              <TableCell>
                {data.AGREEMENT_ID}
              </TableCell>
              <TableCell>
                {data.CLAIM_AMOUNT}
              </TableCell>
              <TableCell>
                {data.INCIDENT_ID}
              </TableCell>
              <TableCell>
                {data.DAMAGE_TYPE}
              </TableCell>
              <TableCell>
                {data.DATE_OF_CLAIM}
              </TableCell>
              <TableCell>
                {data.CLAIM_STATUS}
              </TableCell>
              <TableCell>
                <DamageReview
                  onReject={() => onReject(data.CLAIM_ID)}
                  onAccept={() => onAccept(data.CLAIM_ID)}
                  props={JSON.stringify(data)}
                  description={incident.find((d) => d.INCIDENT_ID === data.INCIDENT_ID)?.DESCRIPTION} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
};
export default DamageInspector;