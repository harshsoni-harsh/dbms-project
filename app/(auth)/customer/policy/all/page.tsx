import CustomerPolicies from "./policies";


export default function Page() {
  return (
    <div className="p-4 flex flex-col gap-6 overflow-auto w-full h-full items-center">
      <p className="text-2xl">Policies</p>
      <CustomerPolicies />
    </div>
  );
}
