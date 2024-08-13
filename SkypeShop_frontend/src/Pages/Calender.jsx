import React, { useEffect, useRef } from 'react';

const CalendarAppointment = ({ urlfrombackend }) => {
    const scriptLoaded = useRef(false);
    const scriptRef = useRef(null);

    useEffect(() => {
        if (scriptLoaded.current) return; // If script is already loaded, exit

        const loadScript = () => {
            // Check if the script is already in the document
            const existingScript = document.querySelector('script[src="https://calendar.google.com/calendar/scheduling-button-script.js"]');
            if (existingScript) {
                scriptRef.current = existingScript;
                scriptLoaded.current = true;
                return;
            }

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
            scriptRef.current = script;
        };

        const loadCSS = () => {
            // Check if the CSS is already in the document
            const existingLink = document.querySelector('link[href="https://calendar.google.com/calendar/scheduling-button-script.css"]');
            if (existingLink) return;

            const link = document.createElement('link');
            link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        };

        loadCSS();
        loadScript();

        return () => {
            // Cleanup the script if necessary
            if (scriptRef.current) {
                document.body.removeChild(scriptRef.current);
                scriptRef.current = null;
                scriptLoaded.current = false; // Reset the flag for potential reloading
            }

            // Remove the CSS link if it's still present
            const link = document.querySelector('link[href="https://calendar.google.com/calendar/scheduling-button-script.css"]');
            if (link) document.head.removeChild(link);
        };
    }, [urlfrombackend]);

    return (
        <div>
            <div id="calendarButtonContainer"></div>
        </div>
    );
};

export default CalendarAppointment;
