import { SignIn, SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
    <SignIn forceRedirectUrl={"/drive"}/>
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} L01 Drive. All rights reserved.
      </footer>
    </>
  );
}