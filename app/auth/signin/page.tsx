"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginApiV1AuthLoginPost } from "@/lib/api";
import { useState } from "react";

const signinSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const { mutate: login, isPending } = useLoginApiV1AuthLoginPost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    setError("");

    login(
      { data },
      {
        onSuccess: (response) => {
          // Lưu token vào localStorage
          localStorage.setItem("access_token", response.access_token);
          console.log("Đăng nhập thành công:", response.user);
          router.push("/dashboard");
        },
        onError: (err: any) => {
          console.error("Lỗi đăng nhập:", err);
          setError(
            err?.response?.data?.detail || "Email hoặc mật khẩu không đúng"
          );
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 px-6 pt-6">
          <h1 className="text-2xl font-bold">Đăng nhập</h1>
          <p className="text-sm text-default-500">
            Đăng nhập vào tài khoản của bạn
          </p>
        </CardHeader>
        <CardBody className="px-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {error && (
              <div className="rounded-lg bg-danger-50 p-3 text-sm text-danger">
                {error}
              </div>
            )}

            <Input
              {...register("email")}
              label="Email"
              type="email"
              placeholder="email@example.com"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />

            <Input
              {...register("password")}
              label="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />

            <div className="flex justify-end">
              <Link href="/auth/forgot-password" size="sm">
                Quên mật khẩu?
              </Link>
            </div>

            <Button
              type="submit"
              color="primary"
              isLoading={isPending}
              className="w-full"
            >
              Đăng nhập
            </Button>
          </form>
        </CardBody>
        <CardFooter className="px-6 pb-6">
          <p className="text-sm text-default-500">
            Chưa có tài khoản?{" "}
            <Link href="/auth/register" size="sm">
              Đăng ký ngay
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
