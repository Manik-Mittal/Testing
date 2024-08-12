import React, { useEffect } from 'react';

const CalendarAppointment = ({ url }) => {
    let urll = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0oZFPukHO70_KfXy2JhWUcXTzE42BEJR0qR-8H7O73KMZ1VmmSDoVyRL95xGfpGYhvBfVF9g_X?gv=true';
    useEffect(() => {


        // Load the Google Calendar scheduling script
        const loadScript = () => {
            const script = document.createElement('script');
            script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
            script.async = true;
            script.onload = () => {
                if (window.calendar && window.calendar.schedulingButton) {
                    window.calendar.schedulingButton.load({
                        url: urll,
                        color: '#039BE5',
                        label: 'Book an appointment',
                        target: document.getElementById('calendarButtonContainer'),
                    });
                } else {
                    console.error('Google Calendar scheduling button not available.');
                }
            };
            script.onerror = () => {
                console.error('Failed to load Google Calendar scheduling script.');
            };
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
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
        const cleanupScript = loadScript();

        return () => {
            cleanupScript();
        };
    }, []);

    return (
        <div>
            <div id="calendarButtonContainer"></div>
        </div>
    );
};

export default CalendarAppointment;
