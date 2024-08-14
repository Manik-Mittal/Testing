import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Poll.css';

const Poll = () => {
    const { id } = useParams();

    const [options, setOptions] = useState({});
    const [pollOptions, setPollOptions] = useState({});
    const [voted, setVoted] = useState(false);

    const fetchOptions = async () => {
        try {
            const productResponse = await fetch('https://skypeshop.onrender.com/getproductforpoll', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            const productData = await productResponse.json();
            setOptions(productData);

            const pollResponse = await fetch('https://skypeshop.onrender.com/getpolloptions', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            const pollData = await pollResponse.json();
            setPollOptions(pollData);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCount = async (cnt, id, optNo) => {
        if (!voted) {
            const newOptions = { ...pollOptions };
            newOptions[optNo] += 1;
            setPollOptions(newOptions);
            setVoted(true);

            try {
                await fetch('https://skypeshop.onrender.com/updatepolloptions', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, optNo }),
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            alert('You have already voted for this option');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchOptions();
    }, []);

    const data = {
        labels: Object.values(options),
        datasets: [
            {
                label: 'Votes',
                data: Object.values(pollOptions),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const optionsConfig = {
        maintainAspectRatio: false, // Ensure the chart respects container dimensions
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Options',
                },
                ticks: {
                    autoSkip: false,
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Votes',
                },
            },
        },
    };

    const chartContainerStyle = {
        width: '90%',
        height: '300px',
        margin: '30px auto 0', // Adjust top margin to shift the chart down
    };

    const headingStyle = {
        marginBottom: '10px', // Decrease bottom margin to move heading closer to the chart
    };

    const optionsContainerStyle = {
        marginTop: '10px', // Decrease top margin to move options up closer to the chart
    };

    const buttonStyle = {
        border: '1px solid #ccc',
        padding: '10px',
        cursor: 'pointer',

    };

    const buttonHoverStyle = {
        backgroundColor: '',
    };

    return (
        <div className="poll" style={{ padding: '20px' }}>
            <h1 style={headingStyle}>Live Polling</h1>
            <div className="chart-container" style={chartContainerStyle}>
                <Bar data={data} options={optionsConfig} />
            </div>
            <div className="options" style={optionsContainerStyle}>
                {Object.entries(options).map(([key, value], index) => (
                    <div key={key} className={`op${index + 1}`} style={{ alignItems: 'center', gap: '10px' }}>
                        <p>{pollOptions[index + 1]}</p>
                        <button
                            style={buttonStyle}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                            onClick={() => handleCount(pollOptions[index + 1], id, index + 1)}
                        >
                            {value}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Poll;
