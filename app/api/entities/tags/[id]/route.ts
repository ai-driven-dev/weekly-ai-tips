import { deleteTag } from '@/src/features/tagManagement/api/deleteTag';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const isDeleted = await deleteTag(id);

  if (isDeleted) {
    return new Response(null, { status: 204 });
  }

  return new Response(null, { status: 404 });
}
