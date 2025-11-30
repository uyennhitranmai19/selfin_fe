"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useGetWalletsApiV1WalletsGet,
  useCreateWalletApiV1WalletsPost,
  useUpdateWalletApiV1WalletsWalletIdPatch,
  useDeleteWalletApiV1WalletsWalletIdDelete,
} from "@/lib/api";

const walletSchema = z.object({
  name: z.string().min(1, "Tên ví là bắt buộc"),
  currency: z.string().default("VND"),
  initial_balance: z.number().default(0),
});

type WalletFormData = z.infer<typeof walletSchema>;

export default function WalletsPage() {
  const [editingWallet, setEditingWallet] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch wallets
  const { data: wallets, isLoading, refetch } = useGetWalletsApiV1WalletsGet();

  // Create wallet mutation
  const { mutate: createWallet, isPending: isCreating } =
    useCreateWalletApiV1WalletsPost();

  // Update wallet mutation
  const { mutate: updateWallet, isPending: isUpdating } =
    useUpdateWalletApiV1WalletsWalletIdPatch();

  // Delete wallet mutation
  const { mutate: deleteWallet } = useDeleteWalletApiV1WalletsWalletIdDelete();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<WalletFormData>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      currency: "VND",
      initial_balance: 0,
    },
  });

  const onSubmit = async (data: WalletFormData) => {
    if (editingWallet) {
      // Update existing wallet
      updateWallet(
        {
          walletId: editingWallet.id,
          data: {
            name: data.name,
            currency: data.currency,
          },
        },
        {
          onSuccess: () => {
            onClose();
            reset();
            setEditingWallet(null);
            refetch();
          },
          onError: (error) => {
            console.error("Error updating wallet:", error);
          },
        }
      );
    } else {
      // Create new wallet
      createWallet(
        { data },
        {
          onSuccess: () => {
            onClose();
            reset();
            refetch();
          },
          onError: (error) => {
            console.error("Error creating wallet:", error);
          },
        }
      );
    }
  };

  const handleAddNew = () => {
    setEditingWallet(null);
    reset({
      currency: "VND",
      initial_balance: 0,
    });
    onOpen();
  };

  const handleEdit = (wallet: any) => {
    setEditingWallet(wallet);
    reset({
      name: wallet.name,
      currency: wallet.currency,
      initial_balance: wallet.balance,
    });
    onOpen();
  };

  const handleDelete = (walletId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa ví này?")) {
      deleteWallet(
        { walletId },
        {
          onSuccess: () => {
            refetch();
          },
          onError: (error) => {
            console.error("Error deleting wallet:", error);
          },
        }
      );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getTotalBalance = () => {
    return (wallets || []).reduce((sum, wallet) => sum + wallet.balance, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Ví</h1>
          <p className="text-default-500">
            Tổng tài sản: {formatCurrency(getTotalBalance())}
          </p>
        </div>
        <Button
          color="primary"
          onPress={handleAddNew}
          startContent={<span>➕</span>}
        >
          Thêm ví
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      ) : !wallets || wallets.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-lg text-default-400">Chưa có ví nào</p>
            <Button color="primary" onPress={handleAddNew} className="mt-4">
              Thêm ví đầu tiên
            </Button>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wallets.map((wallet) => (
            <Card key={wallet.id}>
              <CardHeader className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{wallet.name}</h3>
                  <Chip size="sm" variant="flat" className="mt-1">
                    {wallet.currency}
                  </Chip>
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-3xl font-bold text-primary mb-4">
                  {formatCurrency(wallet.balance)}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() => handleEdit(wallet)}
                  >
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onPress={() => handleDelete(wallet.id)}
                  >
                    Xóa
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              {editingWallet ? "Cập nhật ví" : "Thêm ví mới"}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Tên ví"
                  {...register("name")}
                  placeholder="VD: Ví tiền mặt"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />

                <Input
                  label="Tiền tệ"
                  {...register("currency")}
                  placeholder="VND"
                  isInvalid={!!errors.currency}
                  errorMessage={errors.currency?.message}
                />

                {!editingWallet && (
                  <Input
                    label="Số dư ban đầu"
                    type="number"
                    {...register("initial_balance", { valueAsNumber: true })}
                    placeholder="0"
                    isInvalid={!!errors.initial_balance}
                    errorMessage={errors.initial_balance?.message}
                  />
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Hủy
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isCreating || isUpdating}
              >
                {editingWallet ? "Cập nhật" : "Thêm"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
