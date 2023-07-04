import { useState, useRef, useEffect, ChangeEvent, MouseEvent } from 'react';

const NumberInput = (): JSX.Element => {
  const [value, setValue] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartY = useRef<number>(0);
  const dragStartValue = useRef<number>(0);

  useEffect(() => {
    const handleMouseUp = (): void => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent<HTMLInputElement>): void => {
      if (isDragging) {
        const deltaY = e.clientY - dragStartY.current;
        const step = 1; // Increase or decrease step size

        // Calculate the new value based on the drag distance
        const newValue = Math.round(dragStartValue.current + deltaY / step);

        // Update the value
        setValue(newValue);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove as any);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove as any);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: MouseEvent<HTMLInputElement>): void => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartValue.current = value;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      onMouseDown={handleMouseDown}
    />
  );
};

export default NumberInput;
