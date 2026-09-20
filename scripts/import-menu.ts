import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { menuItems } from "../lib/menu";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
  throw new Error("Supabase environment variables are missing.");
}

const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function importMenu() {
  for (const item of menuItems) {
    const { data: product, error: productError } = await supabase
      .from("products")
      .upsert(
        {
          slug: item.slug,
          name_fa: item.nameFa,
          name_en: item.nameEn,
          description: item.description,
          price: item.price,
          category: item.category,
          image_url: item.image,
          tag: item.tag,
          preparation_time: item.time,
          ingredients: item.ingredients,
          note: item.note,
          is_available: true,
          is_featured: item.tag === "پیشنهاد ویژه",
          is_archived: false,
        },
        {
          onConflict: "slug",
        },
      )
      .select("id")
      .single();

    if (productError) {
      throw new Error(
        `Product error for ${item.slug}: ${productError.message}`,
      );
    }

    if (item.variants?.length) {
      const { error: deleteError } = await supabase
        .from("product_variants")
        .delete()
        .eq("product_id", product.id);

      if (deleteError) {
        throw new Error(
          `Variant delete error for ${item.slug}: ${deleteError.message}`,
        );
      }

      const variants = item.variants.map((variant) => ({
        product_id: product.id,
        name_fa: variant.nameFa,
        name_en: variant.nameEn,
        price: variant.price,
      }));

      const { error: variantError } = await supabase
        .from("product_variants")
        .insert(variants);

      if (variantError) {
        throw new Error(
          `Variant error for ${item.slug}: ${variantError.message}`,
        );
      }
    }

    console.log(`Imported: ${item.nameFa}`);
  }

  console.log(`Finished. ${menuItems.length} products imported.`);
}

importMenu().catch((error) => {
  console.error(error);
  process.exit(1);
});
