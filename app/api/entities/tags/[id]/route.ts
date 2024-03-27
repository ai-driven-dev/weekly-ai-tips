import { deleteTag } from "@/src/features/tagManagement/api/tagManager";

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const isDeleted = await deleteTag(id);

  if (isDeleted) {
    return new Response(null, { status: 204 });
  }

  return new Response(null, { status: 404 });
}
