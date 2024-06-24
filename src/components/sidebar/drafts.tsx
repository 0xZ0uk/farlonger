import { PenLineIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import React from "react";
import Link from "next/link";

type Draft = {
  title: string;
  href: string;
  date: string;
};

interface SidebarDraftsProps {
  drafts: Draft[];
}

export const SidebarDrafts: React.FC<SidebarDraftsProps> = ({ drafts }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-bold">Draft (1)</h3>
        <Button size="sm">See all</Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {drafts.map((draft) => (
          <DraftCard
            key={draft.title}
            title={draft.title}
            href={draft.href}
            date={draft.date}
          />
        ))}
      </CardContent>
    </Card>
  );
};

const DraftCard: React.FC<Draft> = ({ title, href, date }) => {
  return (
    <Link href={href}>
      <div className="flex flex-col gap-0">
        <h4 className="text-lg font-bold">{title}</h4>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Last edited {date}
            days ago
          </p>
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            Continue Editing
            <PenLineIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};
