"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./admin.module.css";

type StoredProduct = {
  id: string;
  category: string;
  name_ro: string;
  name_ru: string;
  description_ro: string;
  description_ru: string;
  price: number;
  image_url: string;
  tag_ro: string;
  tag_ru: string;
  image_fit: "cover" | "contain";
  active: boolean;
  order: number;
};

const categories = [
  { id: "kebab", label: "Kebab" },
  { id: "burger", label: "Burger" },
  { id: "kebab-menu", label: "Kebab Menu" },
  { id: "burger-menu", label: "Burger Menu" },
  { id: "promotii", label: "Promoții" },
  { id: "croki-menu", label: "Croki Menu" },
  { id: "salate", label: "Salate" },
  { id: "bauturi", label: "Băuturi" },
];

const emptyProduct: StoredProduct = {
  id: "", category: "kebab", name_ro: "", name_ru: "", description_ro: "", description_ru: "",
  price: 0, image_url: "", tag_ro: "", tag_ru: "", image_fit: "cover", active: true, order: 0,
};

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<StoredProduct | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/menu");
      if (res.status === 401) return false;
      if (res.ok) { const data = await res.json(); setProducts(data.products); return true; }
      return false;
    } catch { return false; }
  }, []);

  useEffect(() => {
    let active = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void checkAuth().then((ok) => { if (active) setAuthed(ok); });
    return () => { active = false; };
  }, [checkAuth]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) { setPassword(""); const ok = await checkAuth(); setAuthed(ok); }
      else { setLoginError("Parolă incorectă"); }
    } catch { setLoginError("Eroare de conexiune"); }
    setSaving(false);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setProducts([]);
  }

  async function refreshProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/menu");
      if (res.ok) { const data = await res.json(); setProducts(data.products); }
    } catch {}
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setMessage("");
    try {
      const isEdit = products.some((p) => p.id === editing.id);
      const res = await fetch("/api/admin/menu", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (res.ok) { setMessage("Salvat!"); setEditing(null); await refreshProducts(); }
      else { setMessage(data.error === "duplicate_id" ? "ID există deja" : "Eroare la salvare"); }
    } catch { setMessage("Eroare de conexiune"); }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm(`Ștergi produsul "${id}"?`)) return;
    setMessage("");
    try {
      const res = await fetch(`/api/admin/menu?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) { setMessage("Șters!"); await refreshProducts(); }
      else { setMessage("Eroare la ștergere"); }
    } catch { setMessage("Eroare de conexiune"); }
  }

  if (authed === null) return <main className={styles.page}><p>Se încarcă...</p></main>;

  if (!authed) return (
    <main className={styles.page}>
      <div className={styles.loginCard}>
        <h1>Admin Daily Kebab</h1>
        <form onSubmit={handleLogin}>
          <input type="password" placeholder="Parolă" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required />
          <button type="submit" disabled={saving}>Intră</button>
        </form>
        {loginError && <p className={styles.error}>{loginError}</p>}
      </div>
    </main>
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Admin — Meniu</h1>
        <div className={styles.headerActions}>
          <button onClick={() => setEditing({ ...emptyProduct })}>+ Produs nou</button>
          <button onClick={handleLogout}>Ieșire</button>
        </div>
      </header>

      {message && <div className={styles.toast}>{message}</div>}

      {editing && (
        <form className={styles.editForm} onSubmit={handleSave}>
          <h2>{products.some((p) => p.id === editing.id) ? "Editează" : "Produs nou"}</h2>
          <div className={styles.formGrid}>
            <label><span>ID</span><input value={editing.id} onChange={(e) => setEditing({ ...editing, id: e.target.value })} disabled={products.some((p) => p.id === editing.id)} required /></label>
            <label><span>Categorie</span>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </label>
            <label><span>Nume RO</span><input value={editing.name_ro} onChange={(e) => setEditing({ ...editing, name_ro: e.target.value })} required /></label>
            <label><span>Nume RU</span><input value={editing.name_ru} onChange={(e) => setEditing({ ...editing, name_ru: e.target.value })} required /></label>
            <label><span>Preț (MDL)</span><input type="number" value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: e.target.value === "" ? 0 : Number(e.target.value) })} required min="1" /></label>
            <label><span>Ordine</span><input type="number" value={editing.order || ""} onChange={(e) => setEditing({ ...editing, order: e.target.value === "" ? 0 : Number(e.target.value) })} /></label>
            <label className={styles.full}><span>Descriere RO</span><textarea value={editing.description_ro} onChange={(e) => setEditing({ ...editing, description_ro: e.target.value })} rows={2} /></label>
            <label className={styles.full}><span>Descriere RU</span><textarea value={editing.description_ru} onChange={(e) => setEditing({ ...editing, description_ru: e.target.value })} rows={2} /></label>
            <label className={styles.full}><span>Imagine (URL)</span><input type="text" style={{ width: "100%" }} value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} placeholder="https://i.imgur.com/..." autoComplete="off" onPaste={(e) => { const text = e.clipboardData.getData("text"); e.preventDefault(); setEditing({ ...editing, image_url: text }); }} /></label>
            <label><span>Tag RO</span><input value={editing.tag_ro} onChange={(e) => setEditing({ ...editing, tag_ro: e.target.value })} /></label>
            <label><span>Tag RU</span><input value={editing.tag_ru} onChange={(e) => setEditing({ ...editing, tag_ru: e.target.value })} /></label>
            <label><span>Image fit</span>
              <select value={editing.image_fit} onChange={(e) => setEditing({ ...editing, image_fit: e.target.value as "cover" | "contain" })}>
                <option value="cover">cover</option>
                <option value="contain">contain</option>
              </select>
            </label>
            <label className={styles.checkbox}><input type="checkbox" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} /> <span>Activ</span></label>
          </div>
          <div className={styles.formActions}>
            <button type="submit" disabled={saving}>{saving ? "Se salvează..." : "Salvează"}</button>
            <button type="button" onClick={() => setEditing(null)}>Anulează</button>
          </div>
        </form>
      )}

      <table className={styles.table}>
        <thead>
          <tr><th>#</th><th>ID</th><th>Categorie</th><th>Nume RO</th><th>Preț</th><th>Activ</th><th>Acțiuni</th></tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id} className={p.active ? "" : styles.inactive}>
              <td>{i + 1}</td>
              <td>{p.id}</td>
              <td>{categories.find((c) => c.id === p.category)?.label ?? p.category}</td>
              <td>{p.name_ro}</td>
              <td>{p.price} MDL</td>
              <td>{p.active ? "✓" : "—"}</td>
              <td className={styles.actions}>
                <button onClick={() => setEditing({ ...p })}>Editează</button>
                <button onClick={() => handleDelete(p.id)} className={styles.deleteBtn}>Șterge</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Se încarcă...</p>}
    </main>
  );
}
