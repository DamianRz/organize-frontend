import { useEffect } from 'react';

// Hook that alerts clicks outside of the passed ref


export const useOutsideAlerter = (ref: any, showMenu: any) => {


    useEffect(() => {


        // Alert if clicked on outside of element
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                showMenu(false);
            }
        }


        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };


    }, [ref]);
}
