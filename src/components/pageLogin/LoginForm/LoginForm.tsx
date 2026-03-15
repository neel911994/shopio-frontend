"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { Input, Button, Checkbox } from "@/components/shared";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
} from "@/components/svg";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: "",
  });

  return (
    <form
      action={formAction}
      className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-800 p-10"
    >
      <h1 className="mb-1 text-2xl font-bold text-white">Sign in to SHOPIO</h1>
      <p className="mb-6 text-sm text-gray-400">
        Enter your account details to continue.
      </p>

      {state.error && (
        <p className="mb-4 text-sm text-red-500 text-center">{state.error}</p>
      )}

      <div className="mb-4">
        <Input
          label="Email address"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          leftIcon={<MailIcon size={18} />}
          inputSize="lg"
        />
      </div>

      <div className="mb-4">
        <Input
          label="Password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          leftIcon={<LockIcon size={18} />}
          showPasswordToggle
          passwordVisibleIcon={<EyeIcon size={18} />}
          passwordHiddenIcon={<EyeOffIcon size={18} />}
          inputSize="lg"
        />
      </div>

      <div className="mb-6">
        <Checkbox label="Remember me" name="remember" />
      </div>

      <Button
        type="submit"
        fullWidth
        size="lg"
        isLoading={isPending}
        leftIcon={<ArrowRightIcon size={18} />}
      >
        Sign in
      </Button>
    </form>
  );
}