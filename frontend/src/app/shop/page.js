// src/app/shop/page.js
import ProductCard                 from '@/components/ProductCard';
import { fetchStrapi, getMediaURL } from '@/lib/strapi';
import styles                       from '@/styles/shopPage.module.css';

export const dynamic = 'force-dynamic';

async function getProducts() {
  const res = await fetchStrapi('/products', {
    params: { populate: '*', sort: ['createdAt:asc'] },
    next: { revalidate: 60 * 60 * 4, tags: ['products'] },
  });

  return (res.data || []).map((item) => {
    const attrs = item.attributes ?? item;
    const media =
      attrs.image?.data ??
      attrs.Image?.data ??
      attrs.image ??
      attrs.Image;

    return {
      name:    attrs.name    ?? attrs.Name    ?? '',
      price:   attrs.price   ?? attrs.Price   ?? 0,
      variant: attrs.variant ?? attrs.Variant ?? '',
      slug:    attrs.slug    ?? attrs.Slug    ?? String(item.id),
      image:   getMediaURL(media),
    };
  });
}

export default async function ShopPage() {
  let products = [];

  try {
    products = await getProducts();
  } catch (err) {
    console.error('ShopPage →', err);
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.heading}>
          Richmond FC Club Shop
        </h1>
        <p className={styles.subheading}>
          Contact Stu Reid to order – stu.reid11@gmail.com
        </p>
      </header>

      {products.length ? (
        <div className={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.slug} {...p} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>
          Products coming soon—check back later!
        </p>
      )}
    </main>
  );
}
