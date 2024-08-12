import React, { useEffect, useRef } from 'react';

const CalendarAppointment = ({ urlfrombackend }) => {
    const scriptLoaded = useRef(false);

    useEffect(() => {
        if (scriptLoaded.current) return; // If script is already loaded, exit

        const loadScript = () => {
            const script = document.createElement('script');
            script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
            script.async = true;
            script.onload = () => {
                if (window.calendar && window.calendar.schedulingButton) {
                    window.calendar.schedulingButton.load({
                        url: urlfrombackend,
                        color: '#039BE5',
                        label: 'Book an appointment',
                        target: document.getElementById('calendarButtonContainer'),
                    });
                    scriptLoaded.current = true; // Mark script as loaded
                } else {
                    console.error('Google Calendar scheduling button not available.');
                }
            };
            script.onerror = () => {
                console.error('Failed to load Google Calendar scheduling script.');
            };
            document.body.appendChild(script);
        };

        // Load the CSS for Google Calendar scheduling button
        const loadCSS = () => {
            const link = document.createElement('link');
            link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
            link.rel = 'stylesheet';
            document.head.appendChild(link);

            return () => {
                document.head.removeChild(link);
            };
        };

        loadCSS();
        loadScript();

        return () => {
            // Cleanup the script if necessary
            const script = document.querySelector('script[src="https://calendar.google.com/calendar/scheduling-button-script.js"]');
            if (script) document.body.removeChild(script);
        };
    }, [urlfrombackend]);

    return (
        <div>
            <div id="calendarButtonContainer"></div>
        </div>
    );
};

export default CalendarAppointment;