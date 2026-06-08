"use client";

import { useActionState } from "react";

import { createCategory } from "./actions";

export function CategoryForm() {
  const [state, action, pending] = useActionState(createCategory, {});

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          help="Example: dairy-cows, goats, olive-oil"
          label="Slug"
          name="slug"
          placeholder="new-category"
          required
        />
        <Field
          help="Lower numbers appear first."
          label="Sort order"
          name="sortOrder"
          placeholder="120"
          type="number"
        />
      </div>

      <label className="block">
        <span className="font-sans text-sm font-medium text-foreground">
          Category kind
        </span>
        <select
          className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3 font-sans text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
          defaultValue="GENERAL"
          name="kind"
        >
          <option value="ANIMAL">Animal</option>
          <option value="PRODUCE">Produce / fruit / eggs</option>
          <option value="PACKAGED">Packaged product</option>
          <option value="GENERAL">General</option>
        </select>
        <span className="mt-1 block font-sans text-xs text-muted-foreground">
          This controls which item fields are shown when managing products.
        </span>
      </label>

      <Field
        help="Use a full image URL. Upload support can be added later."
        label="Category image URL"
        name="imageUrl"
        placeholder="https://images.unsplash.com/..."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="text-lg font-semibold text-foreground">French</h2>
          <div className="mt-4 space-y-4">
            <Field label="Name" name="frName" placeholder="Vaches laitieres" required />
            <TextArea
              label="Description"
              name="frDescription"
              placeholder="Short description shown on the website."
            />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="text-lg font-semibold text-foreground">Arabic</h2>
          <div className="mt-4 space-y-4">
            <Field label="Name" name="arName" placeholder="Arabic category name" />
            <TextArea
              label="Description"
              name="arDescription"
              placeholder="Arabic description shown on the website."
            />
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
        {pending ? "Adding category..." : "Add category"}
      </button>
    </form>
  );
}

function Field({
  help,
  label,
  name,
  placeholder,
  required = false,
  type = "text",
}: {
  help?: string;
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
      {help ? (
        <span className="mt-1 block font-sans text-xs text-muted-foreground">
          {help}
        </span>
      ) : null}
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-sans text-sm font-medium text-foreground">
        {label}
      </span>
      <textarea
        className="mt-2 min-h-28 w-full resize-y rounded-md border border-input bg-card px-3 py-3 font-sans text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
        name={name}
        placeholder={placeholder}
      />
    </label>
  );
}
