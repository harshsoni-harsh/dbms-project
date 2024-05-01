import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";

interface Props {
  props: string,
  onAccept: () => void,
  onReject: () => void,
}
const DamageReview = ({ props, onAccept, onReject }: Props) => {
  const data = JSON.parse(props)
  return (
    <Dialog>
      <DialogTrigger className="border rounded-lg p-2 bg-accent hover:bg-foreground hover:text-background  hover:border-background">
        Review
      </DialogTrigger>
      <DialogContent>
        <DialogHeader >
          <DialogTitle className="text-center text-xl mb-4">{"Incident ID " + data.incident_id}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 text-center text-lg font-bold">
            Incident Description
          </div>
          <Separator className="col-span-2" />
          <div>
            {data.damage_description}
          </div>
          <Separator className="col-span-2" />
        </div>
        <DialogClose
          className="flex items-center justify-center text-background rounded-md text-sm font-medium bg-foreground h-10 px-4 py-2"
          onClick={onAccept}>
          Accept
        </DialogClose>
        <DialogClose
          className="flex items-center  justify-center text-background rounded-md text-sm font-medium bg-foreground h-10 px-4 py-2 hover:bg-destructive"
          onClick={onReject}>
          Reject
        </DialogClose>
      </DialogContent>
    </Dialog >
  )
};
export default DamageReview;