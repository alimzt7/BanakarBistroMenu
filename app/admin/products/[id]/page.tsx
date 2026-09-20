import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductEditForm } from "../../../../components/admin/product-edit-form";
import { getProductById } from "../../../../lib/supabase/products";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--paper)] px-5 py-10 text-[var(--ink)]">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/products"
          className="text-sm text-ink/60 hover:text-copper"
        >
          بازگشت به محصولات
        </Link>

        <p className="eyebrow mt-10 text-copper">ویرایش محصول</p>

        <h1 className="display mt-4 text-5xl">{product.nameFa}</h1>

        <ProductEditForm product={product} />
      </div>
    </main>
  );
}
