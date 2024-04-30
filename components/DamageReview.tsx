"use client"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

interface Props {
  props: string,
  description: string | undefined,
  onAccept: () => void,
  onReject: () => void,
}
const DamageReview = ({ props, description, onAccept, onReject }: Props) => {
  const data = JSON.parse(props)
  const [pageNum, setPageNum] = useState(1);
  const [incidentData, setIncidentData] = useState('');



  switch (pageNum) {

    case 1:

      return (
        <Dialog>
          <DialogTrigger className="border rounded-lg p-2 bg-accent hover:bg-foreground hover:text-background  hover:border-background">
            Review
          </DialogTrigger>
          <DialogContent>
            <DialogHeader >
              <DialogTitle className="text-center text-xl mb-4">{data.CUST_ID}</DialogTitle>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  Incident Id
                </div>
                <div>
                  {data.INCIDENT_ID}
                </div>
                <Separator className="col-span-2" />
                <div>
                  Incident Type
                </div>
                <div>
                  {data.DAMAGE_TYPE}
                </div>
                <Separator className="col-span-2" />
                <div>
                  Incident Description
                </div>
                <div>
                  {description}
                </div>
                <Separator className="col-span-2" />
                <div>
                  Amount
                </div>
                <div>
                  {data.CLAIM_AMOUNT}
                </div>
                <Separator className="col-span-2" />

                <Button className="col-span-2 hover:bg-accent hover:text-foreground" onClick={() => setPageNum(2)}>
                  Write a review
                </Button>
              </div>


            </DialogHeader>
          </DialogContent>
        </Dialog >
      )

    case 2:
      return (
        <Dialog>
          <DialogTrigger onClick={() => setPageNum(1)} className="border rounded-lg p-2 bg-accent hover:bg-foreground hover:text-background  hover:border-background">Review</DialogTrigger>
          <DialogContent  >
            <DialogHeader>
              <DialogTitle className="text-center text-xl mb-4">{data.CUST_ID}</DialogTitle>
              <Textarea onChange={(e) => setIncidentData(e.target.value)} placeholder="Write Incident Description In 100 Words . . . . . . . " />
              {incidentData.length > 100 && < p className="text-sm text-destructive">The Report must be within 100 letters.</p>}
              <DialogClose
                disabled={incidentData === '' || incidentData.length > 100}
                className="flex items-center justify-center text-background rounded-md text-sm font-medium  bg-foreground disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 hover:bg-green-500"
                onClick={onAccept}>
                Accept
              </DialogClose>
              <DialogClose
                disabled={incidentData === '' || incidentData.length > 100}
                className="flex items-center  justify-center text-background rounded-md text-sm font-medium  bg-foreground disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 hover:bg-red-500"
                onClick={onReject}>
                Reject
              </DialogClose>

            </DialogHeader>
          </DialogContent>
        </Dialog >
      )
  }
};
export default DamageReview;