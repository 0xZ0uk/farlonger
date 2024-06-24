import * as React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Link } from "lucide-react";

type Commentor = {
  avatar: string;
  name: string;
  href: string;
};

interface SidebarCommentorsProps {
  commentors: Commentor[];
}

export const SidebarCommentors: React.FC<SidebarCommentorsProps> = ({
  commentors,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-bold">Top commentors this week</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {commentors.map((commentor) => (
          <CommentorsCard
            key={commentor.name}
            avatar={commentor.avatar}
            name={commentor.name}
            href={commentor.href}
          />
        ))}
      </CardContent>
    </Card>
  );
};

const CommentorsCard: React.FC<Commentor> = ({ avatar, name, href }) => {
  return (
    <Link href={href}>
      <div className="flex flex-col gap-0">
        <h4 className="text-lg font-bold">{name}</h4>
        <div className="flex items-center justify-between"></div>
      </div>
    </Link>
  );
};
