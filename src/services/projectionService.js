const STORAGE_KEY = 'Proyection_future'

export function getProjections(){
     try {
    const raws = localStorage.getItem(STORAGE_KEY);
        return raws ? JSON.parse(raws) : [];
    } catch {
        return [];
    }
}

export function saveProyections(list){
    localStorage.setItem(STORAGE_KEY, JSON.parse(list))
}

export function createProjections(data){
    const local = getProjections();

    const pro = {
        id: crypto.randomUUID(),
        ...data
    }
    const finaly = [pro, ...local]
    saveProyections(finaly)
    return pro;
}