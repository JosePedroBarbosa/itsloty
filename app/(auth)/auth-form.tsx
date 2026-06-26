"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { emailSchema, type EmailFormData } from "@/lib/validations";

function FloatingLabelInput({
  name,
  label,
  type = "text",
  placeholder,
}: {
  name: "email";
  label: string;
  type?: string;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { register, watch, formState: { errors } } = useFormContext<EmailFormData>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const value = watch(name) || "";
  const error = errors[name]?.message;
  const floating = focused || value.length > 0;

  return (
    <div>
      <div className="relative">
        <label
          className={[
            "pointer-events-none absolute left-4 transition-all duration-150 select-none",
            floating
              ? "top-1 text-[9px] text-[rgba(29,29,29,0.6)]"
              : "top-1/2 -translate-y-1/2 text-sm text-[rgba(29,29,29,0.55)]",
          ].join(" ")}
        >
          {label}
        </label>
        <input
          type={type}
          {...register(name)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            register(name).onBlur(e);
          }}
          placeholder={focused ? placeholder : ""}
          className={[
            "h-11 w-full rounded-xl border bg-white px-4 pb-1 pt-3.5 text-[14px] text-[#1d1d1d] outline-none transition-colors",
            mounted && error
              ? "border-red-500 focus:border-red-500"
              : "border-[rgba(29,29,29,0.15)] focus:border-[#1d1d1d]",
          ].join(" ")}
        />
      </div>
      {mounted && error && (
        <p className="mt-1.5 text-xs text-red-600 text-left pl-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default function AuthForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const methods = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit, formState: { isValid } } = methods;

  const onSubmit = (data: EmailFormData) => {
    setSentTo(data.email);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between bg-white px-4 pt-12 pb-6 selection:bg-gray-100">
      {/* Top Bar for Logo - aligned like the header */}
      <div className="absolute top-0 left-0 w-full pl-2 pr-6 flex h-16 items-center">
        <Link href="/" className="flex items-center" aria-label="Loty">
          <Image
            src="/icon.svg"
            alt="Loty"
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
            priority
          />
        </Link>
      </div>

      {/* Spacer to push content down to center it visually */}
      <div className="flex-1" />

      {/* Centered Content */}
      {sentTo ? (
        <div className="flex flex-col items-center gap-5 text-center my-auto w-full max-w-[380px]">
          <div className="flex size-14 items-center justify-center rounded-full bg-neutral-100">
            <svg className="size-6 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-950">
              Check your email
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              We sent a magic link to{" "}
              <span className="font-semibold text-gray-950">{sentTo}</span>.
              <br />
              Click the link in the email to sign in.
            </p>
          </div>
          <button
            type="button"
            className="mt-1 flex h-11 w-full items-center justify-center rounded-xl border border-[rgba(29,29,29,0.15)] bg-white text-[15px] font-semibold text-[#1d1d1d] transition-colors hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              setSentTo(null);
              methods.reset();
            }}
          >
            Use a different email
          </button>
        </div>
      ) : (
        <div className="w-full max-w-[380px] flex flex-col gap-8 my-auto">
          {/* Header text */}
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-950">
              Sign up or Sign in
            </h1>
            <p className="text-sm text-gray-500">
              Enter your email to sign in to your account. If you don&apos;t have an
              account yet, one will be created for you.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Social Logins */}
            <div>
              {/* Google Sign-in Button */}
              <button
                type="button"
                className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-[rgba(29,29,29,0.15)] bg-white text-[15px] font-medium text-[#1d1d1d] transition-colors hover:bg-gray-50 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.71-1.58 2.69-3.9 2.69-6.62z"
                  />
                  <path
                    fill="#34A853"
                    d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.8.54-1.83.85-3.05.85-2.34 0-4.32-1.58-5.03-3.71H.95v2.33C2.43 15.89 5.5 18 9 18z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M3.97 10.7a4.8 4.8 0 0 1 0-3.4V4.97H.95a8.99 8.99 0 0 0 0 8.06l3.02-2.33z"
                  />
                  <path
                    fill="#EA4335"
                    d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2.47C13.46.93 11.42 0 9 0 5.5 0 2.43 2.11.95 5.07l3.02 2.33c.71-2.13 2.69-3.71 5.03-3.71z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 text-sm text-[rgba(29,29,29,0.4)] my-2">
            <span className="h-px flex-1 bg-[rgba(29,29,29,0.1)]" />
            <span className="text-[13px] font-semibold uppercase tracking-wider select-none">OR</span>
            <span className="h-px flex-1 bg-[rgba(29,29,29,0.1)]" />
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3">
              <FloatingLabelInput
                name="email"
                label="Email address"
                type="email"
                placeholder="name@itsloty.com"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!mounted || !isValid}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-[#1d1d1d] text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                Send magic link
              </button>
            </form>
          </FormProvider>
        </div>
      )}

      {/* Spacer to push footer down */}
      <div className="flex-1" />

      {/* Footer Legal Spacing (At the bottom of the page) */}
      <p className="w-full text-xs text-gray-400 max-w-sm leading-relaxed text-center font-medium mt-auto">
        By creating an account, you agree to our<br />
        <Link href="/terms" className="underline hover:text-gray-600 transition-colors">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-gray-600 transition-colors">Privacy Policy</Link>
      </p>
    </div>
  );
}
