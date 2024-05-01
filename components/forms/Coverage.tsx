"use client";

import type * as db from "@/types/dbSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { usePolicyTypes } from "@/hooks/usePolicyTypes";
import { cn } from "@/lib/utils";
import { PolicyForm } from "@/types/form";
import { Loader } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { usePolicies } from "@/hooks/customer/usePolicies";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";


type CoverageProps = {
  back: () => void,
  formData: PolicyForm,
  setFormData: React.Dispatch<React.SetStateAction<PolicyForm>>
};


const CoverageForm = ({ policyTypes, back, formData, setFormData }: { policyTypes: db.PolicyType[] } & CoverageProps) => {

  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(formData.policy_type_id || policyTypes[0].policy_type_id);
  
  const onSubmit = async () => {
    setFormData({
      ...formData,
      policy_type_id: selected
    });
    const body = {
      ...formData,
      policy_type_id: selected
    }; // do not use formData's value yet
    const res = await fetch("/api/customer/policies", {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      toast("Something went wrong!");
      setTimeout(() => window.location.reload(), 1000);
    } else {
      toast("Success!");
      queryClient.invalidateQueries({ queryKey: ['customer/policies'] });
      window.location.href = "/customer/policy/all";
    }
  }

  const onBack = () => {
    setFormData({
      ...formData,
      policy_type_id: selected
    });
    back();
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="text-center content-center mb-4 h-max justify-center w-full space-y-3">
        <div className="font-bold lg:text-xl p-1 m-1">
          Select an insurance policy type
        </div>
        <div>
          <RadioGroup
            className="flex w-full justify-center px-10"
          >
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-xs lg:max-w-4xl md:max-w-l"
            >
              <CarouselContent>
                {policyTypes.map(policyType => (
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={policyType.policy_type_id}>
                      <Label htmlFor={policyType.policy_type_id.toString()}>
                        <div className="p-1">
                          <Card
                            className={cn("cursor-pointer", policyType.policy_type_id.toString() === selected.toString() && "bg-zinc-500")}
                          >
                            <RadioGroupItem id={policyType.policy_type_id.toString()} value={policyType.policy_type_id.toString()} hidden onClick={() => setSelected(policyType.policy_type_id)} />
                            <CardHeader className="flex items-center text-center space-x-2 text-lg">
                              {policyType.title}
                            </CardHeader>
                            <CardContent className="flex flex-col aspect-square items-center justify-center px-6">
                              <div>
                                { policyType.description }
                              </div>
                              <span className="p-2 m-2 md:p-4 md:m-4">
                                Coverage: { policyType.coverage }%
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </Label>
                    </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between w-full max-w-64 lg:max-w-96 flex-wrap lg:col-span-2">
        <Button
          onClick={onBack}
          className="primary mt-6 min-w-20 place-self-center"
        >
          Previous
        </Button>

        <Button
          className="primary mt-6 min-w-20 place-self-center"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};



const Coverage = (props: CoverageProps) => {

  const policyTypes = usePolicyTypes();

  if (policyTypes.isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!policyTypes.isSuccess) {
    return (
      <div>
        Something went wrong
      </div>
    );
  }

  if (!policyTypes.data) {
    return (
      <div>
        No Policies
      </div>
    );
  }

  return <CoverageForm {...props} policyTypes={policyTypes.data} />

};


export default Coverage;
