"use client";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Payment from "@/components/forms/Payment";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const RenderForms = () => {
  const [formNo, setFormNo] = useState(1);
  const [edit, setEdit] = useState(false);
  const [policies, setPolicies] = useState([
    {
      aggrementId: "1qaxcvhi8765r",
      applicationId: "1234567890",
      vehicleType: "Two wheeler",
      policyNum: "1234-5678-3456",
      vehicleMake: "Nothing",
      vehicleModel: "Google",
      vehicleNum: "UI 98 Y 8765",
      endDate: "2-Jul-2023",
    },
    {
      aggrementId: "9876rdcvbjko9",
      applicationId: "1234567890",
      vehicleType: "Four wheeler",
      policyNum: "2452-5678-3456",
      vehicleMake: "Micromax",
      vehicleModel: "GOOD",
      vehicleNum: "QA 14 E 8765",
      endDate: "4-May-2026",
    },
    {
      aggrementId: "fghjk8765rtyu",
      applicationId: "2345678901",
      vehicleType: "Two wheeler",
      policyNum: "5678-1234-9012",
      vehicleMake: "Something",
      vehicleModel: "Apple",
      vehicleNum: "ZX 12 R 3456",
      endDate: "10-Oct-2024",
    },
  ]);
  const [vehicleNumber, setVehicleNumber] = useState(policies[0]?.vehicleNum);
  const [selectedPolicy, setSelectedPolicy] = useState(policies[0]?.policyNum);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const router = useRouter();

  const onBack = () => {
    if (formNo <= 1) return;
    else setFormNo(formNo - 1);
  };

  const onNext = () => {
    if (formNo >= 4) return;
    else setFormNo(formNo + 1);
  };

  const selectPolicy = (e: string) => {
    setSelectedPolicy(e);
  };

  const updateDetails = () => {
    setEdit(false);
    setPolicies(
      policies.map((policy) =>
        policy.policyNum === selectedPolicy
          ? { ...policy, vehicleNum: vehicleNumber }
          : policy
      )
    );
  };

  const handleSub = (isValid: boolean) => {
    setIsPaid(isValid);
  };

  const handleLabelClick = () => {
    if (isPaid) onNext();
  };

  switch (formNo) {
    case 1:
      return (
        <>
          <Progress value={(formNo / 4) * 100} />
          <div className="w-full flex flex-col items-center gap-3">
            <Label>Please select a policy</Label>
            <Select
              onValueChange={selectPolicy}
              defaultValue={policies[0]?.policyNum}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {policies.map((policy) => (
                  <SelectItem key={policy.policyNum} value={policy.policyNum}>
                    {policy.policyNum}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between self-end w-full">
            <Button variant="default" onClick={onBack}>
              Back
            </Button>
            <Button variant="default" onClick={onNext}>
              Next
            </Button>
          </div>
        </>
      );

    case 2:
      return (
        <>
          <Progress value={(formNo / 4) * 100} />

          <div className="max-w-full overflow-auto">
            <Table>
              <TableCaption>Please review your policy details.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Policy Number</TableHead>
                  <TableHead>Agreement ID</TableHead>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Vehicle Make</TableHead>
                  <TableHead>Vehicle Model</TableHead>
                  <TableHead>Vehicle Type</TableHead>
                  <TableHead>Vehicle Number</TableHead>
                  <TableHead className="text-right">End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies
                  .filter((policy) => policy.policyNum === selectedPolicy)
                  .map((policy) => (
                    <TableRow key={policy.policyNum}>
                      <TableCell>{policy.policyNum}</TableCell>
                      <TableCell>{policy.aggrementId}</TableCell>
                      <TableCell>{policy.applicationId}</TableCell>
                      <TableCell>{policy.vehicleMake}</TableCell>
                      <TableCell>{policy.vehicleModel}</TableCell>
                      <TableCell>{policy.vehicleType}</TableCell>
                      <TableCell>
                        {!edit ? (
                          policy.vehicleNum
                        ) : (
                          <Input
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            className="bg-zinc-800"
                            name={policy.policyNum}
                            defaultValue={policy.vehicleNum}
                          />
                        )}
                      </TableCell>
                      <TableCell>{policy.endDate}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between w-full">
            <Button variant="default" onClick={onBack}>
              Back
            </Button>
            {!edit ? (
              <Button
                variant="outline"
                className="min-w-18"
                onClick={() => setEdit(true)}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="outline"
                className="min-w-18"
                onClick={updateDetails}
              >
                Done
              </Button>
            )}
            <Button variant="default" onClick={onNext}>
              Next
            </Button>
          </div>
        </>
      );

    case 3:
      return (
        <>
          <Progress value={(formNo / 4) * 100} />

          <Payment id="cardForm" onSub={handleSub} />

          <div className="flex justify-between w-full">
            <Button variant="default" onClick={onBack}>
              Back
            </Button>

            <label
              className="min-w-18 bg-zinc-100 text-zinc-800 p-2 px-4 rounded-md"
              htmlFor="cardForm"
              onClick={handleLabelClick}
            >
              Submit and Pay
            </label>
          </div>
        </>
      );

    case 4:
      return (
        <>
          <Progress value={(formNo / 4) * 100} />

          <div className="flex flex-col gap-3 justify-center items-center">
            <Check height={400} width={400} />
            <Label style={{ fontSize: "40px" }}>Payment successful!</Label>
          </div>

          <div className="flex justify-center w-full">
            <Button
              variant="default"
              onClick={() => router.push(`/customer`)}
            >
              Go Home
            </Button>
          </div>
        </>
      );
  }
};

export default function Page() {
  return (
    <div className="max-w-3/5 p-8 h-full w-full flex flex-col justify-between items-center gap-3">
      {RenderForms()}
    </div>
  );
}
