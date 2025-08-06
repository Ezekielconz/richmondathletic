import ProductCard                 from '@/components/ProductCard';
import { fetchStrapi, getMediaURL } from '@/lib/strapi';
import styles                       from '@/styles/shopPage.module.css';

export const dynamic = 'force-dynamic';

async function getProducts() {
  const json = await fetchStrapi('/products', {
    params: {
      populate: 'image',
      sort: 'createdAt:asc',      // ← previously sortOrder
    },
    next: { revalidate: 60 * 60 * 4, tags: ['products'] },
  });

  return (json.data || []).map((item) => ({
    ...item.attributes,
    image: getMediaURL(item.attributes.image),
  }));
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
      <h1 className={styles.heading}>Club Shop</h1>

      {products.length ? (
        <div className={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className={styles.notice}>Products coming soon—check back later!</p>
      )}
    </main>
  );
}
