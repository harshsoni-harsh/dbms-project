"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type * as Db from '@/types/dbSchema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { toast } from 'sonner';

const DamageInspector = () => {
  const queryClient = useQueryClient();
  const incidentQuery = useQuery({
    queryKey: ['inspector/incident'],
    queryFn: async () => {
      const res = await fetch('/api/inspector/incident');
      if (!res.ok) throw res.statusText;
      const json = await res.json();
      if ('error' in json) throw json.error;

      return json.data as Db.IncidentReport[];
    },
    refetchInterval: 5 * 60 * 1000
  });

  const updateIncident = useMutation({
    mutationFn: async ({ incidentId, status }: { incidentId: number, status: string }) => {
      toast('Updating');
      const res = await fetch('/api/inspector/incident', {
        method: 'POST',
        body: JSON.stringify({ incidentId, status })
      });
      if (!res.ok) throw res.statusText;
      const json = await res.json();
      if ('error' in json) throw json.error;
    },
    onSuccess: () => {
      toast('Success');
      queryClient.invalidateQueries({ queryKey: ['inspector/incident'] });
    },
    onError: () => toast('Error updating incident')
  })

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Incident Id</TableHead>
            <TableHead>Damage Type</TableHead>
            <TableHead>Claim Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidentQuery.isLoading && (
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          )}
          {incidentQuery.isSuccess && incidentQuery.data && incidentQuery.data.map((incident) => (
            <TableRow key={incident.incident_id}>
              <TableCell className="font-medium">
                {incident.incident_id}
              </TableCell>
              <TableCell>{incident.damage_type}</TableCell>
              <TableCell>{incident.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Review</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div>Incident Id</div>
                    <Input readOnly className='w-full' defaultValue={incident.incident_id} />
                    <div>Damage Type</div>
                    <Input readOnly className='w-full' defaultValue={incident.damage_type} />
                    <div>Damage Description</div>
                    <Textarea readOnly className='w-full' defaultValue={incident.damage_description} />

                    <DialogFooter>
                      <DialogClose onClick={() => updateIncident.mutate({
                        incidentId: incident.incident_id,
                        status: 'verified'
                      })}>
                        <Button className='w-full'>Accept</Button>
                      </DialogClose>
                      <DialogClose onClick={() => updateIncident.mutate({
                        incidentId: incident.incident_id,
                        status: 'rejected'
                      })}>
                        <Button className='w-full' variant='destructive'>Reject</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog >
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default DamageInspector
