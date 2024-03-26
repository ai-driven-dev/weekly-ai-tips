"use client";

import TagEntity from "@/src/features/tagManagement/types/TagEntity";
import { useEffect, useState } from "react";

/**
 * This page is a React Component listing all tags from API.
 *
 * Each tag has a id, name, a description and a slug using the {@link TagEntity} type.
 *
 * Tags are fetch using regular fetch function.
 *
 * A button is available next to a tag to delete it from an API based on the tag ID.
 *
 * @packageDocumentation
 */
export default function ListTags() {
  const [tags, setTags] = useState<TagEntity[]>([]);

  useEffect(() => {
    fetch("/api/entities/tags")
      .then((res) => res.json())
      .then(setTags);
  }, []);

  const handleDeleteTag = (tagId: string) => {
    fetch(`/api/entities/tags/${tagId}`, { method: "DELETE" }).then(() => {
      setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
    });
  };

  return (
    <div>
      <h1>Tags</h1>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <h2>{tag.name}</h2>
            <p>{tag.description}</p>
            {/* <button onClick={() => tag.id && handleDeleteTag(tag.id)}>
              Delete
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
