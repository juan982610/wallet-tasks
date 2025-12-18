import { useState, useMemo } from "react";
import {
    getProjections,
    createProjections,
    deleteProjection,
    updateProjection,
} from "../services/projectionService";

export function useProjections() {
    const [projections, setProjections] = useState(() => getProjections());
    const [filter, setFilter] = useState("");

    // sortOrder state: { field: 'projectedValue' | 'date', direction: 'asc' | 'desc' }
    const [sortOrder, setSortOrder] = useState({ field: null, direction: 'asc' });

    function addProjection(data) {
        const newProj = createProjections(data);
        setProjections(prev => [newProj, ...prev]);
    }

    function editProjection(id, patch) {
        const updatedList = updateProjection(id, patch);
        setProjections(updatedList);
    }

    function removeProjection(id) {
        const updatedList = deleteProjection(id);
        setProjections(updatedList);
    }

    function handleSort(field) {
        setSortOrder(prev => {
            if (prev.field === field) {
                // Toggle direction
                return { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            // New field, default to asc
            return { field, direction: 'asc' };
        });
    }

    const filteredAndSortedProjections = useMemo(() => {
        let result = [...projections];

        // 1. Filter by Note
        if (filter.trim()) {
            const lowerFilter = filter.toLowerCase();
            result = result.filter(p =>
                p.note && p.note.toLowerCase().includes(lowerFilter)
            );
        }

        // 2. Sort
        if (sortOrder.field) {
            result.sort((a, b) => {
                let valA = a[sortOrder.field];
                let valB = b[sortOrder.field];

                if (sortOrder.field === 'projectedValue' || sortOrder.field === 'enteredValue') {
                    valA = parseFloat(valA) || 0;
                    valB = parseFloat(valB) || 0;
                } else if (sortOrder.field === 'date') {
                    valA = new Date(valA).getTime();
                    valB = new Date(valB).getTime();
                }

                if (valA < valB) return sortOrder.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sortOrder.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [projections, filter, sortOrder]);

    const stats = useMemo(() => {
        const totalProjected = projections.reduce((acc, curr) => acc + (parseFloat(curr.projectedValue) || 0), 0);
        const totalEntered = projections.reduce((acc, curr) => acc + (parseFloat(curr.enteredValue) || 0), 0);
        const totalRemaining = totalProjected - totalEntered;

        return {
            totalProjected,
            totalEntered,
            totalRemaining
        };
    }, [projections]);

    return {
        projections: filteredAndSortedProjections,
        addProjection,
        editProjection,
        removeProjection,
        filter,
        setFilter,
        sortOrder,
        handleSort,
        stats
    };
}
