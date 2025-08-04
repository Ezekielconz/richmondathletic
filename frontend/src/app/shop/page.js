import ProductCard from '@/components/ProductCard';
import { fetchStrapi, getMediaURL } from '@/lib/strapi';
import styles from '@/styles/shopPage.module.css';

export const dynamic = 'force-dynamic';       // avoid build-time 404

export const metadata = { title: 'Shop · Richmond Athletic FC' };

async function getProducts() {
  const json = await fetchStrapi('/products', {
    params: { populate: 'image', sort: ['sortOrder'] },
    next:   { revalidate: 60 * 60 * 2, tags: ['products'] },
  });

  return json.data.map((item) => {
    const { name, price, variant } = item.attributes;
    const image = getMediaURL(item.attributes.image);
    return { id: item.id, name, price, variant, image };
  });
}

export default async function ShopPage() {
  let products = [];
  try { products = await getProducts(); }
  catch (e) { console.error('ShopPage →', e); }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1>Club Merchandise</h1>
        <p>
          Order official Richmond Athletic gear directly through the club.
          <br />
          Questions? Email&nbsp;
          <a href="mailto:stu.reid11@gmail.com">Stu Reid</a>.
        </p>
      </header>

      {products.length ? (
        <section className={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </section>
      ) : (
        <p className={styles.empty}>Products will be available soon—check back!</p>
      )}
    </main>
  );
}
