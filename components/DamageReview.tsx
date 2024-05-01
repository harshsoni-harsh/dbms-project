import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "./ui/dialog";
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import type * as Db from '@/types/dbSchema';

interface Props {
  incident: Db.IncidentReport,
  onAccept: () => unknown,
  onReject: () => unknown,
}
const DamageReview = ({ incident, onAccept, onReject }: Props) => {
  return (
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
          <DialogClose onClick={onAccept}>
            <Button className='w-full'>Accept</Button>
          </DialogClose>
          <DialogClose onClick={onReject}>
            <Button className='w-full' variant='destructive'>Reject</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
};
export default DamageReview;