"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export default function AppointmentPage() {
    const [date, setDate] = useState<Date | undefined>();
    const [form, setForm] = useState({
      name: "",
      phone: "",
      petName: "",
      service: "",
    });

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">Randevu Al</h1>

      <form
  className="space-y-6"
  onSubmit={async (e) => {
    e.preventDefault();
  
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        date,
      }),
    });
  
    const data = await res.json();
    console.log(data);
  }}
  
>
        {/* Ad Soyad */}
        <div>
          <Label>Ad Soyad</Label>
          <Input
  placeholder="Adınız Soyadınız"
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>
        </div>

        {/* Telefon */}
        <div>
          <Label>Telefon</Label>
          <Input
  placeholder="05xx xxx xx xx"
  value={form.phone}
  onChange={(e) => setForm({ ...form, phone: e.target.value })}
/>
        </div>

        {/* Pet Adı */}
        <div>
          <Label>Pet Adı</Label>
         <Input
  placeholder="Dostunuzun adı"
  value={form.petName}
  onChange={(e) => setForm({ ...form, petName: e.target.value })}
/>

        </div>

        {/* Hizmet */}
        <div>
          <Label>Hizmet</Label>
          <Select
  onValueChange={(value) =>
    setForm({ ...form, service: value })
  }
>
            <SelectTrigger>
              <SelectValue placeholder="Hizmet seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wash">Yıkama & Bakım</SelectItem>
              <SelectItem value="haircut">Tıraş</SelectItem>
              <SelectItem value="full">Full Bakım</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tarih */}
        <div>
          <Label>Tarih</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                {date ? format(date, "dd.MM.yyyy") : "Tarih seç"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit" className="w-full">
  Randevu Gönder
</Button>
      </form>
    </main>
  );
}
