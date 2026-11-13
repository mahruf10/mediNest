import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  BadgePercent,
  Headset,
  FileText,
  Lock,
  Pill,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Genuine Medicines",
    description:
      "Every product is sourced from licensed distributors and trusted manufacturers. Expiry dates and batches are checked before dispatch.",
  },
  {
    icon: Truck,
    title: "Fast & Safe Delivery",
    description:
      "Your order is carefully packed and delivered to your doorstep quickly, with proper handling and storage conditions.",
  },
  {
    icon: BadgePercent,
    title: "Affordable Prices",
    description:
      "Fair prices with no hidden charges. Enjoy regular offers and discounts on your everyday health needs.",
  },
  {
    icon: FileText,
    title: "Prescription Support",
    description:
      "Upload your prescription and order with ease. Prescription-only medicines go through proper verification.",
  },
  {
    icon: Headset,
    title: "Customer Support",
    description:
      "Questions about an order, delivery or product? Our support team is ready to help you.",
  },
  {
    icon: Lock,
    title: "Secure Payment",
    description:
      "Pay safely with Cash on Delivery or Card, whichever works best for you.",
  },
];

const stats = [
  { value: "5,000+", label: "Products" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "64", label: "Districts Covered" },
  { value: "24/7", label: "Support" },
];

const steps = [
  {
    number: "01",
    title: "Search your medicine",
    description: "Find it by name, category or manufacturer.",
  },
  {
    number: "02",
    title: "Add to cart",
    description: "Choose the quantity and add it to your cart.",
  },
  {
    number: "03",
    title: "Place your order",
    description: "Select a payment method and confirm your order.",
  },
  {
    number: "04",
    title: "Get it delivered",
    description: "Your medicine arrives right at your doorstep.",
  },
];

const promises = [
  "All products are authentic and sealed",
  "Expiry dates are checked on every order",
  "Easy order tracking",
  "Your privacy is protected",
];

export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1.5">
            <Pill className="mr-2 h-5.5 w-5.5" />
            Why choose MediNest
          </Badge>

          <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Your health, our <span className="text-primary">responsibility</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            At MediStore you get genuine medicines, fair prices and fast
            delivery. Order everything you need from the comfort of your home.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-xl p-5">
              <Link href="/products">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {/* <Button asChild size="lg" variant="outline" className="rounded-xl">
              <Link href="/contact">Contact Us</Link>
            </Button> */}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="rounded-2xl border-border/70 text-center shadow-sm"
            >
              <CardContent className="p-6">
                <p className="text-2xl font-bold text-primary sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Why choose us?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Here is what we do to earn your trust.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group rounded-2xl border-border/70 shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                    <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ordering is simple
            </h2>
            <p className="mt-2 text-muted-foreground">
              Get your medicine in just 4 easy steps.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border bg-muted/30 p-6"
              >
                <span className="text-3xl font-bold text-primary/30">
                  {step.number}
                </span>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="overflow-hidden rounded-3xl border-border/70 shadow-sm">
          <CardContent className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Our promise to you
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                We never compromise on health. Every product goes through
                quality checks before it reaches you.
              </p>
            </div>

            <ul className="space-y-4">
              {promises.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Start shopping at MediNest today
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Genuine medicines, fair prices and fast delivery, all in one place.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-7 rounded-xl"
          >
            <Link className="p-3" href="/diabetic">
              Browse Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}