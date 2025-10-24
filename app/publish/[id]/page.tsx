import { notFound } from "next/navigation";
import { pageRegistry } from "@/app/components/report-pages/registry";

// Placeholder publish route. In the future, fetch the saved document by `id`,
// build the view-model, and render the pure view component for stable SSR/SEO.
// Data contract (future): { values: Record<string,string>, pageId: string }

export default async function PublishPage({ params }: { params: { id: string } }) {
  const { id } = params;
  // TODO: fetch data for `id` from storage
  // const data = await fetchDoc(id)
  const data = null;
  if (!data) return notFound();

  // Example wiring (future):
  // const entry = pageRegistry[data.pageId as keyof typeof pageRegistry];
  // const View = await entry.view();
  // const vm = buildViewModelForPage(data.pageId, data.values);
  // return <View {...vm} />

  return notFound();
}


