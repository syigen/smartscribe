import React from 'react';
import './App.css';
import SmartScribe from "./component/textarea";

function App() {
    return (
        <div className="App">
            <SmartScribe
                placeholder="Type here..."
                onType={(text) => console.log(text)}
                getSuggestion={(text) => {
                    if (text.endsWith(' ')) {
                        return 'Hello World';
                    }
                    return '';
                }}
            />
        </div>
    );
}

export default App;
