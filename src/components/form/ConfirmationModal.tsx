"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";

interface ConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
  title?: string;
}

export default function ConfirmationModal({
  isOpen,
  message,
  onClose,
  onSubmit,
  isLoading = false,
  confirmText = "Ya",
  cancelText = "Tidak",
  title = "Konfirmasi",
}: ConfirmationModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <AlertTriangle size={24} className="text-amber-500" />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <Button
                    variant="danger-outline"
                    onClick={onClose}
                  >
                    {cancelText}
                  </Button>
                  <Button
                    type="button"
                    // isLoading={isLoading}
                    variant="danger-default"
                    onClick={onSubmit}
                  >
                    {confirmText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
