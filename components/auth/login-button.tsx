"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import LoginForm from "@/components/auth/Login-form";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {

    const router = useRouter();

    const onClickFC = () => {
        router.push('/auth/login')
    }

    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                  {children}
                </DialogTrigger>
                <DialogContent className="p-0 w-auto bg-transparent border-none">
                  <LoginForm />
                </DialogContent>
            </Dialog>
        )
    }

  return (
    <span onClick={onClickFC} className="cursor-pointer">
        {children}
    </span>
  )
};

export default LoginButton;
