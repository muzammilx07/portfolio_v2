"use client";

import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { Code2, Mail, MapPin, Phone, User } from "lucide-react";
import { WordRotate } from "../animations/WordRotate";
import LiveClock from "./LiveClock";
import HoverUnderline from "@/components/shared/HoverUnderline";

export default function ProfileHero() {
  return (
    <section className="pt-6 text-foreground ">
      {/* OUTER CONTAINER */}
      <div className="border border-dashed border-border ">
        {/* ================= TOP ROW ================= */}
        <div className="flex border-b border-dashed border-border">
          {/* Avatar */}
          <div className="border-r border-dashed border-border rounded-br-4xl">
            <div className="h-32 w-32 m-2 overflow-hidden rounded-full ">
              <Image
                src="/pr.webp"
                alt="Avatar"
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Name block */}
          <div className="flex w-full flex-col justify-end">
            <div className="flex items-center gap-2 border-t border-dashed border-border px-4 py-2">
              <h1 className="text-3xl font-semibold leading-none">
                Muzammil Shareef
              </h1>
              {/* <BadgeCheck className="h-5 w-5 text-sky-400" /> */}
            </div>

            <div className="w-full max-w-2xl text-2xl md:text-3xl font-semibold text-neutral-300 border-border border-t border-dashed">
              <WordRotate
                words={["Full Stack Developer", "Product Engineer"]}
                className=" r px-4 py-1 text-sm text-muted-foreground"
              />
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ROW ================= */}
        <div className="grid grid-cols-2 ">
          {/* LEFT COLUMN */}
          <div className="space-y-0.5 p-6">
            <InfoRow icon={Code2} text="Frontend Developer" />
            <InfoRow icon={MapPin} text="Hyderabad, India" />
            <InfoRow icon={Phone} text="+91 98765 43210" />
            <InfoRow icon={User} text="new.com" />
            <InfoRow icon={Mail} text="xyz@email" />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-end space-y-0.5 p-6 rounded-tl-4xl border-l border-dashed border-border">
            <LiveClock />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= INFO ROW ================= */

function InfoRow({
  icon: Icon,
  text,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-8 w-8  items-center justify-center rounded-full border border-dashed border-border text-muted-foreground">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="text-sm text-foreground">
        <HoverUnderline className="cursor-default">{text}</HoverUnderline>
      </span>
    </div>
  );
}
