import React, {useState, useRef, useEffect} from 'react';

interface SmartScribeProps {
    placeholder?: string;
    onType?: (text: string) => void;
    getSuggestion?: (text: string) => string;
}

const SmartScribe: React.FC<SmartScribeProps> = ({placeholder, onType, getSuggestion = () => ""}) => {
    const [content, setContent] = useState('');
    const contentEditableRef = useRef<HTMLDivElement | null>(null);
    const suggestionRef = useRef<HTMLSpanElement | null>(null);

    const handleInput = () => {
        if (contentEditableRef.current) {
            const text = contentEditableRef.current.textContent || '';
            setContent(text);
            if (onType) {
                onType(text);
            }
        }
    };

    const handleKeyUp = () => {
        if (contentEditableRef.current && suggestionRef.current) {
            const selection = document.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                const divRect = contentEditableRef.current.getBoundingClientRect();
                suggestionRef.current.style.left = `${rect.right - divRect.left}px`;
                suggestionRef.current.style.top = `${rect.top - divRect.top + window.scrollY}px`;
            }
        }
    };

    useEffect(() => {
        if (contentEditableRef.current && placeholder) {
            contentEditableRef.current.setAttribute('data-placeholder', placeholder);
        }
    }, [placeholder]);

    const suggestionText = getSuggestion(content);

    return (
        <>
            <div
                ref={contentEditableRef}
                contentEditable
                onInput={handleInput}
                onKeyUp={handleKeyUp}
                style={{
                    width: '50%',
                    minHeight: '100px',
                    border: '1px solid #ccc',
                    padding: '8px',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    textAlign: 'left',
                    position: 'relative'
                }}
            />
            {suggestionText && (
                <span
                    ref={suggestionRef}
                    style={{
                        position: 'absolute',
                        pointerEvents: 'none',
                        color: '#ccc'
                    }}
                >
                    {suggestionText}
                </span>
            )}
        </>
    );
};

export default SmartScribe;
