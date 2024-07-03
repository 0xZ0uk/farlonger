"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { type AuthClientError } from "@farcaster/auth-kit";
import { Button } from "../ui/button";
import { SmartphoneIcon } from "lucide-react";
import { QRCode } from "./qrcode";

interface Props {
  open: boolean;
  onClose: () => void;
  url: string;
  isError: boolean;
  error?: AuthClientError;
}

export const QRCodeDialog: React.FC<Props> = ({
  open,
  onClose,
  url,
  isError,
  error,
}) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign in with Farcaster</DialogTitle>
          <DialogDescription>
            To use Farlonger, you need a Farcaster account. If you don&apos;t
            have one yet, you can create one at{" "}
            <a
              href="https://warpcast.com/~/signup"
              className="font-bold text-primary"
            >
              Warpcast
            </a>
            .
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {isError ? (
          <>
            <div>Error</div>
            <div>{error?.message ?? "Unknown error, please try again."}</div>
          </>
        ) : (
          <>
            <div className="y-3 flex flex-col items-center">
              <QRCode uri={url} size={350} logoSize={28} logoMargin={16} />
            </div>
            <Separator />
            <div className="flex flex-col items-center">
              <Button
                className="w-full"
                onClick={() => {
                  window.location.href = url;
                }}
              >
                <SmartphoneIcon className="h-4 w-4" />
                <span style={{ marginLeft: 9 }}>I&apos;m using my phone →</span>
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
