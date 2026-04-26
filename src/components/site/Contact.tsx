import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: "יש להזין שם" })
    .max(100, { message: "שם ארוך מדי" }),
  email: z
    .string()
    .trim()
    .email({ message: "כתובת אימייל לא תקינה" })
    .max(255, { message: "אימייל ארוך מדי" }),
  phone: z
    .string()
    .trim()
    .nonempty({ message: "יש להזין מספר טלפון" })
    .max(20, { message: "מספר טלפון ארוך מדי" })
    .regex(/^[0-9+\-\s()]+$/, { message: "מספר טלפון לא תקין" }),
  consent: z.boolean().refine((v) => v === true, {
    message: "יש לאשר יצירת קשר",
  }),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      toast.success("הפנייה נשלחה! נחזור אליכם בהקדם.");
      setForm({ name: "", email: "", phone: "", consent: false });
      setSubmitting(false);
    }, 600);
  };

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-cream/40">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-coral text-xl sm:text-2xl font-extrabold tracking-wider uppercase">
            יצירת קשר
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance text-navy leading-[1.05]">
            צרו איתנו קשר
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            נשמח לשמוע מכם — השאירו פרטים ונחזור אליכם בהקדם.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          dir="rtl"
          className="bg-background border border-border/60 rounded-3xl p-6 sm:p-10 shadow-card space-y-6"
          noValidate
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2 text-right">
              <Label htmlFor="name" className="text-base text-navy font-bold">
                שם
              </Label>
              <Input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="text-right"
                placeholder="השם המלא שלך"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-sm text-coral">{errors.name}</p>}
            </div>

            <div className="space-y-2 text-right">
              <Label htmlFor="phone" className="text-base text-navy font-bold">
                טלפון
              </Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                maxLength={20}
                className="text-right"
                placeholder="050-0000000"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-sm text-coral">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-2 text-right">
            <Label htmlFor="email" className="text-base text-navy font-bold">
              אימייל
            </Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
              className="text-right"
              placeholder="name@example.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-sm text-coral">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3 flex-row-reverse justify-end">
              <Checkbox
                id="consent"
                checked={form.consent}
                onCheckedChange={(checked) =>
                  setForm({ ...form, consent: checked === true })
                }
                className="mt-1"
              />
              <Label
                htmlFor="consent"
                className="text-base text-navy/80 leading-relaxed cursor-pointer text-right"
              >
                מאשר/ת יצירת קשר בטלפון | SMS | וואטסאפ | מייל
              </Label>
            </div>
            {errors.consent && (
              <p className="text-sm text-coral text-right">{errors.consent}</p>
            )}
          </div>

          <div className="flex justify-start">
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="bg-coral hover:bg-coral/90 text-white font-bold px-10 rounded-full"
            >
              {submitting ? "שולח..." : "שליחה"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
