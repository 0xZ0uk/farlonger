import * as React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";

export const SidebarFooter: React.FC = ({}) => {
  return (
    <Card className="bg-muted text-muted-foreground">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-foreground">FarLonger</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <ul className="grid grid-cols-2 gap-2 text-sm">
          <li className="flex flex-col gap-2">About</li>
          <li className="flex flex-col gap-2">Oficial Blog</li>
          <li className="flex flex-col gap-2">Press Kit</li>
          <li className="flex flex-col gap-2">Support</li>
          <li className="flex flex-col gap-2">Contact Us</li>
        </ul>
        <Separator className="my-0 bg-muted-foreground/30" />
        <p className="text-xs">
          FarLonger is a blogging platform built on FarCaster.
        </p>
      </CardContent>
    </Card>
  );
};
