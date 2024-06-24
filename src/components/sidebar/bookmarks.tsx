import * as React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

type Bookmark = {
  title: string;
};

interface SidebarBookmarksProps {
  bookmarks: Bookmark[];
}

export const SidebarBookmarks: React.FC<SidebarBookmarksProps> = ({
  bookmarks,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-bold">Bookmarks</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.title} title={bookmark.title} />
        ))}
      </CardContent>
    </Card>
  );
};

const BookmarkCard: React.FC<Bookmark> = ({ title }) => {
  return <div className="flex flex-col gap-0">{title}</div>;
};
