import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const SERVICE_TYPES = [
  { value: "standard_cleaning", label: "Standard Cleaning", basePrice: 120 },
  { value: "deep_cleaning", label: "Deep Cleaning", basePrice: 200 },
  { value: "move_in_out", label: "Move In/Out Cleaning", basePrice: 250 },
  { value: "airbnb_turnover", label: "Airbnb Turnover", basePrice: 150 },
  { value: "commercial", label: "Commercial Cleaning", basePrice: 300 },
];

interface QuoteGeneratorProps {
  onGenerate: (quote: { serviceType: string; estimatedPrice: number; sqft: number; notes: string }) => void;
}

export function QuoteGenerator({ onGenerate }: QuoteGeneratorProps) {
  const [serviceType, setServiceType] = useState("");
  const [sqft, setSqft] = useState(1200);
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [notes, setNotes] = useState("");

  const selectedService = SERVICE_TYPES.find(s => s.value === serviceType);
  const estimatedPrice = selectedService
    ? Math.round(selectedService.basePrice + (sqft - 1000) * 0.05 + bedrooms * 15 + bathrooms * 10)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Quote</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Service Type</Label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_TYPES.map(s => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>Sq. Ft.</Label>
            <Input type="number" value={sqft} onChange={e => setSqft(Number(e.target.value))} />
          </div>
          <div>
            <Label>Bedrooms</Label>
            <Input type="number" value={bedrooms} onChange={e => setBedrooms(Number(e.target.value))} />
          </div>
          <div>
            <Label>Bathrooms</Label>
            <Input type="number" value={bathrooms} onChange={e => setBathrooms(Number(e.target.value))} />
          </div>
        </div>
        <div>
          <Label>Notes</Label>
          <Textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} />
        </div>
        {estimatedPrice > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-sm text-green-600">Estimated Price</p>
            <p className="text-2xl font-bold text-green-800">${estimatedPrice}</p>
          </div>
        )}
        <Button
          className="w-full"
          disabled={!serviceType}
          onClick={() => onGenerate({ serviceType, estimatedPrice, sqft, notes })}
        >
          Generate Quote
        </Button>
      </CardContent>
    </Card>
  );
}
