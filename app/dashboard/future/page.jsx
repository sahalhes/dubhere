import React from "react";

const features = [
  {
    name: "Bare Metal Performance",
    free: "✅",
    pro: "✅",
  },
  {
    name: "Pay-As-You-Go",
    free: "✅",
    pro: "✅",
  },
  {
    name: "Faster GPUs",
    free: "Standard GPUs",
    pro: "High-end AI GPUs",
  },
  {
    name: "Priority Processing",
    free: "Standard Queue",
    pro: "Instant Execution",
  },
];

export default function FeaturesPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-4">Features & Pricing</h1>
      <p className="text-muted-foreground mb-6">
        DubHere aim to offer a <strong>pay-for-use model </strong>instead of flat pricing
      </p>

      <div className="overflow-hidden border rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted text-left">
              <th className="p-3">Feature</th>
              <th className="p-3">Free</th>
              <th className="p-3">Pro</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={index}
                className="border-t even:bg-muted/50 hover:bg-accent"
              >
                <td className="p-3 font-medium">{feature.name}</td>
                <td className="p-3">{feature.free}</td>
                <td className="p-3">{feature.pro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <p className="text-muted-foreground">
          🚀 Dub videos with <strong>no hidden costs</strong>  :)
        </p>
      </div>
    </div>
  );
}
