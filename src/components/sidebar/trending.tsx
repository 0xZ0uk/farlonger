import * as React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

type Post = {
  title: string;
  href: string;
  date: string;
};

interface SidebarTrendingProps {
  trending: Post[];
}

export const SidebarTrending: React.FC<SidebarTrendingProps> = ({
  trending,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-bold">Trending Articles</h3>
        <Select>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="1 Week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">1 Week</SelectItem>
            <SelectItem value="monthly">1 Month</SelectItem>
            <SelectItem value="quarterly">3 Months</SelectItem>
            <SelectItem value="biannual">6 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {trending.map((post) => (
          <TrendingCard
            key={post.title}
            title={post.title}
            href={post.href}
            date={post.date}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          See all
        </Button>
      </CardFooter>
    </Card>
  );
};

const TrendingCard: React.FC<Post> = ({ title, href, date }) => {
  return (
    <Link href={href}>
      <div className="flex flex-col gap-0">
        <h4 className="text-lg font-bold">{title}</h4>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Last edited {date} days ago
          </p>
          <p className="text-sm">103 reads</p>
        </div>
      </div>
    </Link>
  );
};
