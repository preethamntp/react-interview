// import { useEffect, useRef } from "react";

// function useTimeout(cb, delay) {



// export default useTimeout

import { useEffect, useRef } from "react";

function useTimeout(cb, delay, input) {
    const cbRef = useRef(null);
    cbRef.current = cb;
    const inputRef = useRef(input);
    useEffect(() => {
        inputRef.current = input;
    }, [input]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            cbRef.current();
        }, delay)
        return () => clearTimeout(timerId)
    }, [delay, input])
}
export default useTimeout;
