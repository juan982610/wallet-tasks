const STORAGE_KEY = 'Proyection_future'

export function getProyections(){
     try {
    const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}