"use client";

import { useRouter } from "next/navigation";

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
            <span>
                Todo: Implement Modal
            </span>
        )
    }

  return (
    <span onClick={onClickFC} className="cursor-pointer">
        {children}
    </span>
  )
};

export default LoginButton;
