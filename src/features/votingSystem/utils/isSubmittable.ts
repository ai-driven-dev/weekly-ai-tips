export function isSubmittable(tipStatus: string): boolean {
  return tipStatus === 'ready' || tipStatus === 'draft';
}
