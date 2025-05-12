import SignupForm from "./signup-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <Suspense>
        <SignupForm />
      </Suspense>
      {/* </div> */}
    </main>
  );
}
