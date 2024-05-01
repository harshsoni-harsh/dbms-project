"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DamageReview from "@/components/DamageReview"
import { useState } from "react"
import type * as Db from '@/types/dbSchema';

const incident_report: Db.IncidentReport[] = [
  {
    "incident_id": 1,
    "damage_type": "Scratch",
    "damage_description": "Small scratch on the car door",
    "status": "pending"
  },
  {
    "incident_id": 2,
    "damage_type": "Dent",
    "damage_description": "Dent on the car fender",
    "status": "pending"
  },
  {
    "incident_id": 3,
    "damage_type": "Broken Glass",
    "damage_description": "Broken rear window",
    "status": "pending"
  },
  {
    "incident_id": 4,
    "damage_type": "Accident",
    "damage_description": "Rear-end collision",
    "status": "pending"
  },
  {
    "incident_id": 5,
    "damage_type": "Theft",
    "damage_description": "Stolen car",
    "status": "pending"
  },
  {
    "incident_id": 6,
    "damage_type": "Scratch",
    "damage_description": "Small scratch on the car door",
    "status": "pending"
  },
  {
    "incident_id": 7,
    "damage_type": "Dent",
    "damage_description": "Dent on the car fender",
    "status": "pending"
  },
  {
    "incident_id": 8,
    "damage_type": "Broken Glass",
    "damage_description": "Broken rear window",
    "status": "pending"
  },
  {
    "incident_id": 9,
    "damage_type": "Accident",
    "damage_description": "Rear-end collision",
    "status": "pending"
  },
  {
    "incident_id": 10,
    "damage_type": "Theft",
    "damage_description": "Stolen car",
    "status": "pending"
  }
]

const DamageInspector = () => {
  const [incidentReport, setIncidentReport] = useState(incident_report)

  const onAccept = (id: number) => {
    const updatedIncident = incidentReport.map((incident) => {
      if (incident.incident_id === id)
        return { ...incident, status: "Approved" }
      else return incident
    })

    setIncidentReport(updatedIncident)
  }

  const onReject = (id: number) => {
    const updatedIncident = incidentReport.map((incident) => {
      if (incident.incident_id === id)
        return { ...incident, status: "Rejected" }
      else return incident
    })
    setIncidentReport(updatedIncident)
  }

  return (
    <div className="max-w-full max-h-full flex flex-col p-4 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>INCIDENT_ID</TableHead>
            <TableHead>DAMAGE_TYPE</TableHead>
            <TableHead>CLAIM_STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidentReport.map(
            (data) =>
            (
              <TableRow key={data.incident_id}>
                <TableCell className="font-medium">
                  {data.incident_id}
                </TableCell>
                <TableCell>{data.damage_type}</TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell>
                  <DamageReview
                    onReject={() =>
                      onReject(data.incident_id)
                    }
                    onAccept={() =>
                      onAccept(data.incident_id)
                    }
                    incident={data}
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  )
}
export default DamageInspector
