import { getMenu } from "@/lib/nhost/getMenu";
import AdminMenuEditor from "@/components/admin/AdminMenuEditor";
import PublishBar from "@/components/admin/PublishBar";

export default async function AdminMenuPage() {
  const menu = await getMenu("draft");

  const itemsByCategory = {
    sushi: menu.sushi.flatMap((sub) => sub.items).sort((a, b) => a.sort_order - b.sort_order),
    food: menu.food.flatMap((sub) => sub.items).sort((a, b) => a.sort_order - b.sort_order),
    drinks: menu.drinks.flatMap((sub) => sub.items).sort((a, b) => a.sort_order - b.sort_order),
  };

  return (
    <>
      <section className="admin-section">
        <h2>Ēdienkarte</h2>
        <p className="admin-section-sub">
          Rediģējiet vārdu, aprakstu, cenu vai kategoriju. Izmaiņas ir redzamas tikai melnrakstā, kamēr nenospiežat
          "Publicēt izmaiņas".
        </p>
        <AdminMenuEditor itemsByCategory={itemsByCategory} />
      </section>

      <PublishBar />
    </>
  );
}
