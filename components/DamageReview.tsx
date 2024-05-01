"use client"
import { useState } from "react";
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
          <div className="font-bold">
            Incident Id
          </div>
          <div>
            {data.incident_id}
          </div>
          <Separator className="col-span-2" />
          <div className="font-bold">
            Incident Type
          </div>
          <div>
            {data.damage_type}
          </div>
          <Separator className="col-span-2" />
          <div className="col-span-2 text-center text-lg font-bold">
            Incident Description
          </div>
          <div>
            {description}
          </div>
          <Separator className="col-span-2" />
        </div>
        <DialogClose
          className="flex items-center justify-center text-background rounded-md text-sm font-medium  bg-foreground disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 hover:bg-green-500"
          onClick={onAccept}>
          Accept
        </DialogClose>
        <DialogClose
          className="flex items-center  justify-center text-background rounded-md text-sm font-medium  bg-foreground disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 hover:bg-red-500"
          onClick={onReject}>
          Reject
        </DialogClose>
      </DialogContent>
    </Dialog >
  )
};
export default DamageReview;