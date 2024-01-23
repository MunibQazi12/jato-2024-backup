import { useEffect } from 'react';

function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        ref?.current &&
        event?.target instanceof HTMLElement &&
        !ref.current.contains(event.target)
      ) {
        callback();
      }
    }

    function escKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keyup', escKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keyup', escKey);
    };
  }, [ref, callback]);
}
export default useClickOutside;