"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 font-sans text-sm uppercase tracking-[0.2em] text-primary">
              Get In Touch
            </p>
            <h2 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
              Let&apos;s Start a Conversation
            </h2>
            <p className="mt-6 font-sans leading-relaxed text-muted-foreground">
              Whether you&apos;re looking to place an order, schedule a farm
              visit, or simply learn more about our products, we&apos;d love to
              hear from you.
            </p>

            <div className="mt-10 space-y-6">
              <ContactItem
                icon={MapPin}
                title="Visit Us"
                lines={["Route de Sousse, Km 8", "Kairouan 3100, Tunisia"]}
              />
              <ContactItem
                icon={Phone}
                title="Call Us"
                lines={["+216 XX XXX XXX", "Mon - Sat: 8:00 AM - 6:00 PM"]}
              />
              <ContactItem
                icon={Mail}
                title="Email Us"
                lines={["contact@ferme-elbaraka.tn", "orders@ferme-elbaraka.tn"]}
              />
            </div>
          </div>

          <div className="rounded-xl bg-secondary p-8 sm:p-10">
            <h3 className="mb-6 text-2xl font-semibold text-foreground">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-sans text-sm font-medium text-foreground"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-sans text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block font-sans text-sm font-medium text-foreground"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(event) =>
                      setFormData({ ...formData, phone: event.target.value })
                    }
                    placeholder="+216 XX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-sans text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(event) =>
                    setFormData({ ...formData, message: event.target.value })
                  }
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full gap-2 rounded-full">
                Send Message
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

type ContactItemProps = {
  icon: typeof MapPin;
  title: string;
  lines: string[];
};

function ContactItem({ icon: Icon, title, lines }: ContactItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 font-sans text-sm text-muted-foreground">
          {lines.map((line, index) => (
            <span key={line}>
              {line}
              {index < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
