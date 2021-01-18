import React, { useState } from 'react';
import './App.css';
import { FormInput } from './components/FormInput';

export function App() {
    const [gamePin, setGamePin] = useState('');
    const [amount, setAmount] = useState('');
    const [showNotifi, setShowNotifi] = useState(false);
    const [notification, setNotification] = useState(`Success! Sent ${amount} bots to Kahoot game: ${gamePin}`);
    
    function gamePinChange(val: string) {
        if (val.length <= 7) setGamePin(val)
    }

    function amountChange(val: string) {
        if (val.length <= 2) {
            if (val === '' || (parseInt(val) <= 50 && parseInt(val) >= 0)) setAmount(val)
        } 
    }

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.stopPropagation();
        e.preventDefault();

        if (!gamePin || gamePin.length < 7) return alert('You have not entered a valid game pin')
        if (!amount || parseInt(amount) === 0) return alert('You have not entered a valid amount')

        await fetch(`http://50b0632cce27.ngrok.io/api/${gamePin}/${amount}`, { method: 'POST' })
            .then((res) => {
                console.log(res);

                if (res.status === 200) {
                    setNotification(`Success! Sent ${amount} bots to Kahoot game: ${gamePin}`);

                    setAmount('');
                    setGamePin('');
                } else if (res.status === 403) {
                    setNotification(`As you have already sent bots to this game pin (${gamePin}), you cannot send any more`)
                }

            }).catch((e) => {
                setNotification(`An unexpected error has occurred`)
            });
        setShowNotifi(true);
        setTimeout(() => setShowNotifi(false), 3 * 1000); // 3s
    }

    return (
        <div className='outer-container'>
            <div className='centered-container'>
                <h1 className='title'>Cuhoot!</h1>
                <h6 className='descriptor'>Populate your kahoots</h6>
                <form className='bot-form' onSubmit={submit}>
                    <FormInput 
                    placeholder='Example: 2799394'            
                    value={gamePin} 
                    inputType='normal'
                    onPaste={(val) => gamePinChange(val)}
                    onChange={(val) => gamePinChange(val)}>
                        Game pin
                    </FormInput>
                    <FormInput 
                    placeholder='Number from 1 - 50'
                    value={amount}
                    inputType='number'
                    min='0'
                    max='50'
                    onChange={(val) => amountChange(val)}>
                        Amount
                    </FormInput>
                    <h1 className={`success ${showNotifi ? 'show' : 'hide'}`}>{notification}</h1>
                    <button className='action-button'>Nuke</button>
                </form>
            </div>
        </div>
    )
}