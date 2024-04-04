"use client";

import Title from "@/components/ui/title";
import { toast } from "@/components/ui/use-toast";
import ListTags from "@/src/features/tagManagement/components/ListTags";
import TagForm from "@/src/features/tagManagement/components/TagForm";
import TagEntity from "@/src/features/tagManagement/types/TagEntity";
import { useEffect, useState } from "react";

export default function Page(): React.ReactElement {
  const [tags, setTags] = useState<TagEntity[]>([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = () => {
    fetch("/api/entities/tags")
      .then((res) => res.json())
      .then(setTags);
  };

  const handleDeleteTag = (tagId: string) => {
    fetch(`/api/entities/tags/${tagId}`, { method: "DELETE" })
      .then(() => {
        setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
      })
      .then(() => {
        toast({
          title: "Success ♻️",
          description: `#${tagId} has been deleted.`,
        });
      });
  };
  return (
    <>
      <Title>Tags</Title>

      <div className="flex gap-4">
        <div className="w-1/2">
          <ListTags tags={tags} handleDeleteTag={handleDeleteTag} />
        </div>

        <div className="w-1/2">
          <TagForm
            callback={fetchTags}
            tag={{ name: "Tag 1", description: "Mon tag ", slug: "tag-1" }}
          />
        </div>
      </div>
    </>
  );
}
