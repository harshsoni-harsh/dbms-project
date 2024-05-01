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
import { useEffect, useState } from "react";
import { viewAllPendingPolicies } from "@/lib/query/manager/viewAllPendingPolicies";

type IncidentReport = {
  incident_id: number,
  damage_type: string,
  damage_description: string,
  status: string
}

const DamageInspector = () => {
  const [incidentReport, setIncidentReport] = useState<IncidentReport[]>([]);

  // useEffect(() => {
  //   try {
  //     const data: IncidentReport[] = viewAllPendingPolicies();
  //     setIncidentReport(data);

  //   }
  //   catch (e) {
  //     console.log(e);
  //   }

  // }, []);

  const onAccept = (id: number) => {
    const updatedIncident = incidentReport.map((incident) => {

      if (incident.incident_id === id)
        return ({ ...incident, "status": "Approved" })
      else
        return incident
    });

    setIncidentReport(updatedIncident);
  }

  const onReject = (id: number) => {
    const updatedIncident = incidentReport.map((incident) => {

      if (incident.incident_id === id)
        return ({ ...incident, "status": "Rejected" })
      else
        return incident
    });
    setIncidentReport(updatedIncident);
  }

  return (
    <div className="max-w-full max-h-full flex flex-col p-4 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              INCIDENT_ID
            </TableHead>
            <TableHead>
              DAMAGE_TYPE
            </TableHead>
            <TableHead>
              CLAIM_STATUS
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidentReport.map((data) => (
            data.status === 'pending' &&
            <TableRow key={data.incident_id}>
              <TableCell className="font-medium">{data.incident_id}</TableCell>
              <TableCell>
                {data.damage_type}
              </TableCell>
              <TableCell>
                {data.status}
              </TableCell>
              <TableCell>
                <DamageReview
                  onReject={() => onReject(data.incident_id)}
                  onAccept={() => onAccept(data.incident_id)}
                  props={JSON.stringify(data)}
                  description={incidentReport.find((d) => d.incident_id === data.incident_id)?.damage_description} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
};
export default DamageInspector;