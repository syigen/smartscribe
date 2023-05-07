import React, { useState, useRef, useEffect } from 'react';

interface SmartScribeProps {
}

const SmartScribe = ({}: SmartScribeProps) => {
    const [content, setContent] = useState('');
    const contentEditableRef = useRef<HTMLDivElement | null>(null);
    const suggestionRef = useRef<HTMLSpanElement | null>(null);

    const handleInput = () => {
        if (contentEditableRef.current) {
            setContent(contentEditableRef.current.textContent || '');
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

    const getSuggestion = (content: string) => {
        return "suggestion";
    };

    const suggestion = getSuggestion(content);

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
            {suggestion && (
                <span
                    ref={suggestionRef}
                    style={{
                        position: 'absolute',
                        pointerEvents: 'none',
                        color: '#ccc'
                    }}
                >
                    {suggestion}
                </span>
            )}
        </>
    );
};

export default SmartScribe;
