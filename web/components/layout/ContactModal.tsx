"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function ContactModal({ contactEmail }: { contactEmail?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [submitted, setSubmitted] = useState(false);

  function open() {
    setSubmitted(false);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Mocked submission: the challenge is scoped to the frontend/CMS, not a
    // backend mail service, so we simulate a success state instead of sending.
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
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto w-full max-w-md rounded-2xl border border-line bg-ink-soft p-0 text-cream backdrop:bg-ink/80"
        aria-labelledby="contact-modal-title"
      >
        <div className="p-6">
          <div className="mb-6 flex items-start justify-between">
            <h2 id="contact-modal-title" className="text-h3 font-semibold">
              Contact us
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Close contact form"
              className="font-mono text-label text-cream/70 hover:text-accent"
            >
              ESC / CLOSE
            </button>
          </div>

          {submitted ? (
            <p role="status" className="text-body text-cream/80">
              Thanks — your message is on its way{contactEmail ? ` to ${contactEmail}` : ""}. We&apos;ll get back to you soon.
            </p>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-1.5 text-label font-mono">
                Name
                <input
                  required
                  name="name"
                  type="text"
                  className="rounded-md border border-line bg-ink px-3 py-2 text-body text-cream outline-none focus-visible:border-accent"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-label font-mono">
                Email
                <input
                  required
                  name="email"
                  type="email"
                  className="rounded-md border border-line bg-ink px-3 py-2 text-body text-cream outline-none focus-visible:border-accent"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-label font-mono">
                Message
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="resize-none rounded-md border border-line bg-ink px-3 py-2 text-body text-cream outline-none focus-visible:border-accent"
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
