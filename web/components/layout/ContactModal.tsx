"use client";

import { useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

export function ContactModal({ contactEmail }: { contactEmail?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [submitted, setSubmitted] = useState(false);

  function open() {
    setSubmitted(false);
    dialogRef.current?.showModal();
    titleRef.current?.focus();
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 16, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" },
    );
  }

  function close() {
    if (!panelRef.current) {
      dialogRef.current?.close();
      return;
    }
    gsap.to(panelRef.current, {
      opacity: 0,
      y: 16,
      scale: 0.96,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => dialogRef.current?.close(),
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Button variant="main" onClick={open}>
        Contact Us
      </Button>
      <dialog
        ref={dialogRef}
        onClose={() => setSubmitted(false)}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="scrollbar-hidden m-auto w-full max-w-md rounded-2xl border border-line bg-ink-soft p-0 text-cream backdrop:bg-ink/80"
        aria-labelledby="contact-modal-title"
      >
        <div ref={panelRef} className="p-6">
          <div className="mb-6 flex items-start justify-between">
            <h2
              id="contact-modal-title"
              ref={titleRef}
              tabIndex={-1}
              className="text-h3 font-semibold"
            >
              Contact us
            </h2>
            <button
              type="button"
              onClick={close}
              className="cursor-pointer font-mono text-label text-muted hover:text-accent"
            >
              ESC / CLOSE
            </button>
          </div>

          {submitted ? (
            <Text as="p" variant="body" tone="mutedStrong" role="status">
              Thanks — your message is on its way{contactEmail ? ` to ${contactEmail}` : ""}. We&apos;ll get back to you soon.
            </Text>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-1.5 text-label font-mono">
                Name
                <input
                  required
                  name="name"
                  type="text"
                  className="rounded-md border border-line bg-ink px-3 py-2 text-body text-cream"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-label font-mono">
                Email
                <input
                  required
                  name="email"
                  type="email"
                  className="rounded-md border border-line bg-ink px-3 py-2 text-body text-cream"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-label font-mono">
                Message
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="resize-none rounded-md border border-line bg-ink px-3 py-2 text-body text-cream"
                />
              </label>
              <Button type="submit" variant="active" className="mt-2 w-full">
                Send message
              </Button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
