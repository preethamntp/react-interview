import { useEffect } from 'react';
import { useRef } from 'react'

const hasDependenciesChanged = (currentDeps, prevDeps) => {
    if (!currentDeps) return true;
    if (currentDeps.length !== prevDeps.length) return true;

    return !currentDeps.every((dep, idx) => Object.is(dep, prevDeps[idx]))
}


const useCustomMemo = (callback, dependencies) => {
    const cachedDependencies = useRef(null);
    const cachedResult = useRef(null);

    if (!cachedDependencies.current || hasDependenciesChanged(dependencies, cachedDependencies.current)) {
        cachedDependencies.current = dependencies;
        cachedResult.current = callback()
    }

    useEffect(() => {

        return () => {
            cachedDependencies.current = null;
            cachedResult.current = null;
        }
    }, [])

    return cachedResult.current
}

export default useCustomMemo

