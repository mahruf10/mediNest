"use client";

import { API_URL } from "@/src/lib/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
type Category = { id: number; name: string };

// Number inputs are kept as strings in the form and converted on submit.
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(150),
  description: z.string().max(2000, "Description is too long"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((v) => /^\d+(\.\d{1,2})?$/.test(v), "Enter a valid price (max 2 decimals)")
    .refine((v) => Number(v) > 0, "Price must be greater than 0"),
  stock: z
    .string()
    .min(1, "Stock is required")
    .refine((v) => /^\d+$/.test(v), "Stock must be a whole number"),
  imageUrl: z.string().url("Enter a valid URL").or(z.literal("")),
  manufacturer: z.string().max(150, "Manufacturer is too long"),
  categoryId: z.string().min(1, "Please select a category"),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  name: "",
  description: "",
  price: "",
  stock: "0",
  imageUrl: "",
  manufacturer: "",
  categoryId: "",
};

// Small helper to render a field's error messages
function FieldError({
  errors,
  show,
}: {
  errors: unknown[];
  show: boolean;
}) {
  if (!show || errors.length === 0) return null;
  const msg = errors
    .map((e) => (typeof e === "string" ? e : (e as { message?: string })?.message))
    .filter(Boolean)
    .join(", ");
  return <p className="text-sm text-destructive">{msg}</p>;
}

export default function AddProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
    
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`${API_URL}/category`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load categories");
        const data = await res.json();
        // supports either [..] or { data: [..] }
        setCategories(Array.isArray(data) ? data : data.data ?? []);
      } catch {
        toast.add({
          type:'error',
          title:"Could not load categories"
        });
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  const form = useForm({
    defaultValues,
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        name: value.name.trim(),
        description: value.description.trim() || null,
        price: value.price, // string is fine for Prisma Decimal
        stock: Number(value.stock),
        imageUrl: value.imageUrl || null,
        manufacturer: value.manufacturer.trim() || null,
        categoryId: Number(value.categoryId),
       
      };

      try {
        const res = await fetch(`${API_URL}/product`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message ?? "Failed to create product");
        }

           toast.add({
            type:'success',
            title:"Product created successfully"
           })

        form.reset();
        router.push("/");
        router.refresh();
      } catch (err) {
        toast.add({
          type:'error',
          title:err instanceof Error ? err.message : "Something went wrong"
        }
          );
      }
    },
  });

  return (
    <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            Fill in the details below to add a product to your catalog.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Name *</Label>
                  <Input
                    id={field.name}
                    placeholder="e.g. Paracetamol 500mg"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError
                    errors={field.state.meta.errors}
                    show={field.state.meta.isTouched}
                  />
                </div>
              )}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Description</Label>
                  <Textarea
                    id={field.name}
                    rows={4}
                    placeholder="Describe the product..."
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError
                    errors={field.state.meta.errors}
                    show={field.state.meta.isTouched}
                  />
                </div>
              )}
            </form.Field>

            {/* Price + Stock */}
            <div className="grid gap-6 sm:grid-cols-2">
              <form.Field name="price">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Price *</Label>
                    <Input
                      id={field.name}
                      type="number"
                      step="0.01"
                      min="0"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError
                      errors={field.state.meta.errors}
                      show={field.state.meta.isTouched}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="stock">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Stock *</Label>
                    <Input
                      id={field.name}
                      type="number"
                      step="1"
                      min="0"
                      inputMode="numeric"
                      placeholder="0"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError
                      errors={field.state.meta.errors}
                      show={field.state.meta.isTouched}
                    />
                  </div>
                )}
              </form.Field>
            </div>

            {/* Category + Manufacturer */}
            <div className="grid gap-6 sm:grid-cols-2">
              <form.Field name="categoryId">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Category *</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(v) => field.handleChange(v)}
                      disabled={loadingCategories}
                    >
                      <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                        <SelectValue
                          placeholder={
                            loadingCategories ? "Loading..." : "Select a category"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError
                      errors={field.state.meta.errors}
                      show={field.state.meta.isTouched}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="manufacturer">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Manufacturer</Label>
                    <Input
                      id={field.name}
                      placeholder="e.g. Square Pharmaceuticals"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError
                      errors={field.state.meta.errors}
                      show={field.state.meta.isTouched}
                    />
                  </div>
                )}
              </form.Field>
            </div>

            {/* Image URL + preview */}
            <form.Field name="imageUrl">
              {(field) => {
                const url = field.state.value;
                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Image URL</Label>
                    <Input
                      id={field.name}
                      placeholder="https://..."
                      value={url}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Paste a link to the product image.
                    </p>
                    <FieldError
                      errors={field.state.meta.errors}
                      show={field.state.meta.isTouched}
                    />
                    {url && /^https?:\/\//.test(url) && (
                      <div className="overflow-hidden rounded-md border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt="Product preview"
                          className="h-48 w-full bg-muted object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* Actions */}
            <form.Subscribe selector={(s) => s.isSubmitting}>
              {(isSubmitting) => (
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create Product
                  </Button>
                </div>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
