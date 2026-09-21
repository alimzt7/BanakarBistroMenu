import type { MenuCategory, MenuItem, ProductVariant } from "../../lib/menu";
import { createClient } from "./server";

function mapProduct(product: any): MenuItem {
  return {
    id: product.id,
    productId: product.id,
    displayId: product.display_code ?? "",
    isAvailable: product.is_available,
    isFeatured: product.is_featured,
    isArchived: product.is_archived,
    slug: product.slug,
    nameFa: product.name_fa,
    nameEn: product.name_en ?? "",
    description: product.description,
    price: product.price,
    category: product.category as Exclude<MenuCategory, "همه">,
    image: product.image_url ?? "",
    tag: product.tag,
    time: product.preparation_time ?? "",
    ingredients: product.ingredients ?? [],
    note: product.note,
    variants: (product.product_variants ?? []).map(
      (variant: any): ProductVariant => ({
        id: variant.id,
        nameFa: variant.name_fa,
        nameEn: variant.name_en ?? "",
        price: variant.price,
      }),
    ),
  };
}

export async function getProducts(options?: {
  includeArchived?: boolean;
}): Promise<MenuItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select("*, product_variants(*)")
    .order("created_at", { ascending: true });

  if (!options?.includeArchived) {
    query = query.eq("is_archived", false);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapProduct);
}

export async function getProductBySlug(
  slug: string,
): Promise<MenuItem | undefined> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, product_variants(*)")
    .eq("slug", slug)
    .eq("is_archived", false)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapProduct(data) : undefined;
}

export async function getProductById(
  id: string,
): Promise<MenuItem | undefined> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, product_variants(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapProduct(data) : undefined;
}
