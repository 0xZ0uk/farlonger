"use client";

import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { ModeToggle } from "./theme/mode-toggle";
import { SearchBar } from "./search-bar";
import { SignInButton } from "./auth/signin-button";
import { signIn, signOut, getCsrfToken } from "next-auth/react";
import { useProfile, type StatusAPIResponse } from "@farcaster/auth-kit";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { PencilLineIcon } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const { isAuthenticated } = useProfile();

  const getNonce = useCallback(async () => {
    const nonce = await getCsrfToken();
    if (!nonce) throw new Error("Unable to generate nonce");
    return nonce;
  }, []);

  const handleSuccess = useCallback(async (res: StatusAPIResponse) => {
    await signIn("credentials", {
      message: res.message,
      signature: res.signature,
      name: res.username,
      pfp: res.pfpUrl,
      redirect: false,
      callbackUrl: "/",
    });

    router.refresh();
  }, []);

  const handleNewDraft = useCallback(() => {
    const tempId = Math.random().toString(36).substring(2, 15);
    router.push(`/draft/${tempId}`);
  }, []);

  return (
    <header className="fixed z-50 flex w-full flex-col justify-center bg-background">
      <div className="flex h-20 items-center justify-between px-8 sm:px-12 lg:px-24">
        <div className="flex w-full basis-1/3 justify-start">
          <Link href="/" legacyBehavior passHref>
            <div className="flex w-fit cursor-pointer items-center gap-2">
              <Image
                src="/farlonger.svg"
                alt="Farlonger"
                width={30}
                height={30}
              />
              <p className="text-xl font-bold">Farlonger</p>
            </div>
          </Link>
        </div>
        <div className="flex w-full basis-1/3 items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Feed
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger disabled>More</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Image
                            src="/farlonger.svg"
                            alt="Farlonger"
                            width={40}
                            height={40}
                          />
                          <div className="mb-2 mt-4">
                            <p className="text-xl font-bold text-white">
                              Farlonger
                            </p>
                          </div>
                          <p className="text-sm leading-tight text-white">
                            A sufficiently decentralized blogging platform built
                            on Farcaster and IPFS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/api" title="API">
                      Learn how to use the Farlonger API endpoints.
                    </ListItem>
                    <ListItem href="/docs" title="Documentation">
                      Read the Farlonger documentation.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex w-full basis-1/3 items-center justify-end gap-3">
          <SearchBar
            value=""
            onChange={(value) => {
              console.log(value);
            }}
          />
          <ModeToggle />
          {isAuthenticated && (
            <Button size="icon" onClick={handleNewDraft}>
              <PencilLineIcon className="h-5 w-5" />
            </Button>
          )}
          <SignInButton
            nonce={getNonce}
            onSuccess={handleSuccess}
            onError={() => setError(true)}
            onSignOut={() => signOut()}
            redirectUrl="/"
          />
        </div>
      </div>
      <hr className="bg-header-pattern dark:bg-header-pattern-dark h-px w-full border-0 bg-muted opacity-10" />
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
