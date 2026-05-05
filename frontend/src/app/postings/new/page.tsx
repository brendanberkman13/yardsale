"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  CONDITIONS,
  CONDITION_LABELS,
  type Category,
  type Condition,
} from "@/lib/types";
import { createPostingAction } from "./actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewPostingPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceDollars, setPriceDollars] = useState("");
  const [category, setCategory] = useState<Category>("skis");
  const [condition, setCondition] = useState<Condition>("good");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");

  const priceNumber = Number(priceDollars);
  const isPriceValid =
    priceDollars !== "" && Number.isFinite(priceNumber) && priceNumber >= 0;
  const canSubmit = title.trim().length > 0 && isPriceValid && !isPending;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);

    startTransition(async () => {
      const result = await createPostingAction({
        title: title.trim(),
        description: description.trim(),
        priceCents: Math.round(priceNumber * 100),
        category,
        condition,
        brand: brand.trim() || undefined,
        size: size.trim() || undefined,
        location: location.trim() || undefined,
      });

      if (result.ok) {
        router.push(`/postings/${result.id}`);
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 animate-fade">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="font-display text-3xl text-foreground">New posting</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <Section title="The item">
          <Field id="title" label="Title" required>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Burton Custom 158 — 2024"
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field id="category" label="Category" required>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as Category)}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {CATEGORY_LABELS[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field id="condition" label="Condition" required>
              <Select
                value={condition}
                onValueChange={(v) => setCondition(v as Condition)}
              >
                <SelectTrigger id="condition">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONDITIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {CONDITION_LABELS[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field id="brand" label="Brand">
              <Input
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Burton, Salomon, Patagonia…"
              />
            </Field>

            <Field id="size" label="Size">
              <Input
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="158cm, M, 10.5"
              />
            </Field>
          </div>

          <Field id="description" label="Description">
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Bindings? Edges? How many days? Be specific — buyers care."
            />
          </Field>
        </Section>

        <Section title="Price & location">
          <div className="grid grid-cols-2 gap-4">
            <Field id="price" label="Price (USD)" required>
              <Input
                id="price"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={priceDollars}
                onChange={(e) => setPriceDollars(e.target.value)}
                placeholder="450"
                required
                className="font-mono"
              />
            </Field>

            <Field id="location" label="Location">
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Salt Lake City, UT"
              />
            </Field>
          </div>
        </Section>

        {error ? (
          <p
            role="alert"
            className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-sm px-3 py-2"
          >
            {error}
          </p>
        ) : null}

        <div className="flex justify-end pt-4 border-t border-border">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 text-sm font-medium bg-foreground text-background hover:bg-accent disabled:opacity-40 disabled:hover:bg-foreground transition-colors px-5 py-2.5 rounded-sm"
          >
            {isPending ? "Publishing…" : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-xs font-medium text-muted-foreground mb-2">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="flex items-center gap-1.5">
        <span>{label}</span>
        {required ? (
          <span aria-hidden className="text-accent text-[10px]">
            *
          </span>
        ) : null}
      </Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
