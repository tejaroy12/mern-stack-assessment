//frontend/src/api/FetchProducts.js

const fetchProducts = async (search = '', category = 'All') => {
  try {
    const res = search && search.trim()
      ? await fetch(`http://localhost:5000/search?q=${encodeURIComponent(search)}`)
      : await fetch('http://localhost:5000/products');

    if (!res.ok) {
      console.error('API error', res.status);
      return [];
    }

    let data = await res.json();

    // Client-side category filtering
    if (category && category !== 'All') {
      data = data.filter(p => p.category === category);
    }
    return data;
  } catch (err) {
    console.error('Fetch error', err);
    return [];
  }
};

export const fetchFilteredProducts = async (searchTerm, categoryFilter) => {
  return await fetchProducts(searchTerm, categoryFilter);
};

export const fetchAllProducts = async () => {
  return await fetchProducts();
};
