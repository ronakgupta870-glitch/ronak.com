import React, { useState, useMemo } from "react";

/**
 * Props:
 * - items: [{id, name, description, price, category, image}]
 * - categories: optional array of categories (strings)
 */
export default function MenuPage({ items = [], categories = [] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const derivedCategories = useMemo(() => {
    const fromItems = Array.from(new Set(items.map(i => i.category))).filter(Boolean);
    return ["all", ...new Set([...fromItems, ...categories])];
  }, [items, categories]);

  const filtered = items.filter(it => {
    const q = query.trim().toLowerCase();
    const matchesQ = q === "" || it.name.toLowerCase().includes(q) || (it.description || "").toLowerCase().includes(q);
    const matchesCat = activeCategory === "all" || it.category === activeCategory;
    return matchesQ && matchesCat;
  });

  return (
    <div style={{maxWidth:1100,margin:"1rem auto",padding:"0 1rem",fontFamily: "system-ui, -apple-system, Roboto, Arial"}}>
      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <h1 style={{margin:0}}>Our Menu</h1>
      </header>

      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:12}}>
        <input aria-label="Search" placeholder="Search dishes..." value={query} onChange={e=>setQuery(e.target.value)} style={{flex:1,minWidth:160,padding:"8px 12px",borderRadius:8,border:"1px solid #e6e6e6"}} />
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {derivedCategories.map(cat => (
            <button key={cat} onClick={()=>setActiveCategory(cat)} style={{
              padding:"6px 10px",borderRadius:999,border:"1px solid #eee",background:cat===activeCategory?"#ff6b35":"#fff",color:cat===activeCategory?"#fff":"#222"
            }}>{cat}</button>
          ))}
        </div>
      </div>

      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
        {filtered.map(it => (
          <article key={it.id} style={{background:"#fff",borderRadius:10,overflow:"hidden",boxShadow:"0 6px 18px rgba(0,0,0,.06)"}}>
            <img src={it.image || "https://via.placeholder.com/320x180"} alt={it.name} style={{width:"100%",height:140,objectFit:"cover"}} />
            <div style={{padding:12,display:"flex",flexDirection:"column",gap:6}}>
              <h3 style={{margin:0}}>{it.name}</h3>
              <p style={{margin:0,color:"#666"}}>{it.description}</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
                <strong style={{color:"#ff6b35"}}>{it.price}</strong>
                <button style={{background:"#ff6b35",border:0,color:"#fff",padding:"6px 10px",borderRadius:6}}>Order</button>
              </div>
            </div>
          </article>
        ))}
        {filtered.length === 0 && <p style={{gridColumn:"1/-1",color:"#666"}}>No items match your search.</p>}
      </section>
    </div>
  );
}