import React, {useRef, useEffect, useState, Children, cloneElement, ReactNode, ReactElement, HTMLAttributes} from 'react';

interface Props {
    children: ReactNode;
    onEnter: (index: number) => void;
}

/**
 * Composant React qui détecte un clic sur une div enfant
 * et exécute une fonction lorsqu'on appuie sur Entrée.
 *
 * @param props
 */
function DivSelectionWithEnter(props:Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && activeIndex !== null) {
            props.onEnter(activeIndex);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            if (container) {
                container.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [activeIndex]);

    // Injection de onClick avec typage explicite
    const childrenWithClick = Children.map(props.children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        // On suppose que chaque enfant est un élément HTML générique
        return cloneElement(
            child as ReactElement<HTMLAttributes<HTMLElement>>,
            {
                onClick: () => setActiveIndex(index),
            }
        );
    });

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            className="outline-none"
        >
            {childrenWithClick}
        </div>
    );
}

export default DivSelectionWithEnter;
