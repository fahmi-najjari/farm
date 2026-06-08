"use client";

import type { CategoryKind } from "@prisma/client";
import type { ReactNode } from "react";
import { useActionState } from "react";

import { createCategoryProduct } from "./actions";

export function ProductForm({
  categoryKind,
  categorySlug,
}: {
  categoryKind: CategoryKind;
  categorySlug: string;
}) {
  const [state, action, pending] = useActionState(createCategoryProduct, {});
  const isAnimal = categoryKind === "ANIMAL";
  const isProduce = categoryKind === "PRODUCE";
  const isPackaged = categoryKind === "PACKAGED";

  return (
    <form action={action} className="space-y-5">
      <input name="categorySlug" type="hidden" value={categorySlug} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug" name="slug" placeholder={`${categorySlug}-001`} />
        <Select label="Status" name="status">
          <option value="AVAILABLE">Available</option>
          <option value="DRAFT">Draft</option>
          <option value="RESERVED">Reserved</option>
          <option value="SOLD">Sold</option>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="French name" name="frName" placeholder="ABC1" required />
        <Field label="Arabic name" name="arName" placeholder="Arabic item name" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Price" name="price" placeholder="Prix sur demande" />
        <Field label="Image URL" name="imageUrl" placeholder="https://..." />
      </div>

      {isAnimal ? (
        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="text-lg font-semibold">Animal fields</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Tag number" name="tagNumber" placeholder="TN-003" />
            <Field label="Breed" name="breed" placeholder="Holstein" />
            <Field label="Sex" name="sex" placeholder="Female" />
            <Field label="Birth date" name="birthDate" type="date" />
            <Field label="Weight" name="weight" placeholder="480 kg" />
            <Select label="Purpose" name="purpose">
              <option value="GENERAL">General</option>
              <option value="MILK">Milk</option>
              <option value="MEAT">Meat</option>
            </Select>
          </div>
        </div>
      ) : null}

      {isProduce ? (
        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="text-lg font-semibold">Produce fields</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Harvest date" name="harvestDate" type="date" />
            <Field label="Quantity" name="quantity" placeholder="50" />
            <Field label="Unit" name="unit" placeholder="kg, crate, box" />
            <Field label="Weight" name="weight" placeholder="1 kg" />
          </div>
        </div>
      ) : null}

      {isPackaged ? (
        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="text-lg font-semibold">Packaged product fields</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Package size" name="packageSize" placeholder="500 g jar" />
            <Field label="Quantity" name="quantity" placeholder="24" />
            <Field label="Unit" name="unit" placeholder="jar, bottle, pack" />
            <Field label="Weight" name="weight" placeholder="500 g" />
          </div>
        </div>
      ) : null}

      {!isAnimal && !isProduce && !isPackaged ? (
        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="text-lg font-semibold">General item fields</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Quantity" name="quantity" placeholder="10" />
            <Field label="Unit" name="unit" placeholder="unit, kg, box" />
            <Field label="Weight" name="weight" placeholder="Optional" />
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="text-lg font-semibold">French content</h2>
          <div className="mt-4 space-y-4">
            <TextArea label="Short description" name="frDescription" />
            <TextArea label="Overview" name="frOverview" />
            {isAnimal ? (
              <>
                <TextArea label="Health and vaccination" name="frHealthAndVaccination" />
                <TextArea label="Milk production" name="frMilkProduction" />
                <TextArea label="Meat details" name="frMeatDetails" />
                <TextArea label="Feeding" name="frFeeding" />
              </>
            ) : (
              <TextArea label="Storage notes" name="frStorageNotes" />
            )}
            {isPackaged ? (
              <TextArea label="Ingredients" name="frIngredients" />
            ) : null}
            <TextArea label="Location" name="frLocation" />
            <TextArea label="Delivery" name="frDelivery" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="text-lg font-semibold">Arabic content</h2>
          <div className="mt-4 space-y-4">
            <TextArea label="Short description" name="arDescription" />
            <TextArea label="Overview" name="arOverview" />
            <TextArea label="Location" name="arLocation" />
            <TextArea label="Delivery" name="arDelivery" />
          </div>
        </div>
      </div>

      {state.error ? (
        <p className="rounded-md bg-destructive/10 px-4 py-3 font-sans text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="rounded-md bg-primary/10 px-4 py-3 font-sans text-sm text-primary">
          {state.success}
        </p>
      ) : null}

      <button
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-5 font-sans text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        disabled={pending}
        type="submit"
      >
        {pending ? "Adding item..." : "Add item"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="font-sans text-sm font-medium text-foreground">
        {label}
      </span>
      <input
        className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3 font-sans text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

function Select({
  children,
  label,
  name,
}: {
  children: ReactNode;
  label: string;
  name: string;
}) {
  return (
    <label className="block">
      <span className="font-sans text-sm font-medium text-foreground">
        {label}
      </span>
      <select
        className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3 font-sans text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
        name={name}
      >
        {children}
      </select>
    </label>
  );
}

function TextArea({ label, name }: { label: string; name: string }) {
  return (
    <label className="block">
      <span className="font-sans text-sm font-medium text-foreground">
        {label}
      </span>
      <textarea
        className="mt-2 min-h-24 w-full resize-y rounded-md border border-input bg-card px-3 py-3 font-sans text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
        name={name}
      />
    </label>
  );
}
