import React, { useState, useEffect } from 'react';
import './Appointment.css';
import img1 from '../../../public/step1.png';
import Sidebar from '../Sidebar/Sidebar';

// CSS for the modal
const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    content: {
        position: 'relative',
        width: '80%',
        maxWidth: '800px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        padding: '20px',
    },
    close: {
        position: 'absolute',
        top: '10px',
        right: '15px',
        fontSize: '24px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#333',
    },
    carousel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '500px',
        overflow: 'hidden',
        position: 'relative',
    },
    carouselImage: {
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'block',
    },
    navButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 1,
    },
    navButtonPrev: {
        left: '10px',
    },
    navButtonNext: {
        right: '10px',
    },
};

const carouselImages = [
    { src: '/public/step2.png', alt: 'Step 1' },
    { src: '/step2.png', alt: 'Step 2' },
    { src: '/step3.png', alt: 'Step 3' },
    { src: '/step4.png', alt: 'Step 4' }
];
// Modal component
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay} onClick={onClose}>
            <div style={modalStyles.content} onClick={(e) => e.stopPropagation()}>
                <button
                    style={modalStyles.close}
                    onClick={onClose} // Ensure this calls the closeModal function
                    aria-label="Close"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

// Carousel component
const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div style={modalStyles.carousel}>
            <button
                style={{ ...modalStyles.navButton, ...modalStyles.navButtonPrev }}
                onClick={prevSlide}
            >
                &#10094;
            </button>
            <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                style={modalStyles.carouselImage}
            />
            <button
                style={{ ...modalStyles.navButton, ...modalStyles.navButtonNext }}
                onClick={nextSlide}
            >
                &#10095;
            </button>
        </div>
    );
};


const Appointment = () => {
    const [urlDetails, setUrlDetails] = useState({
        email: "",
        url: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasFetchedImages, setHasFetchedImages] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const parseUrl = (text) => {
        const urlMatch = text.match(/url:\s*'([^']+)'/);
        return urlMatch ? urlMatch[1] : null;
    };

    const getuser = async () => {
        try {
            const response = await fetch('https://skypeshop.onrender.com/getadmin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
            });

            if (!response.ok) {
                throw new Error('Unable to fetch data');
            }

            const data = await response.json();
            console.log(data);
            setUrlDetails({ ...urlDetails, email: data });
            setHasFetchedImages(true);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log("AddProduct component mounted");
        if (!localStorage.getItem('auth-token')) {
            alert('Please login or signup first');
            window.location = "/";
        }
        getuser();
    }, []);

    const urlHandler = (e) => {
        console.log(e.target.value);
        setUrlDetails({ ...urlDetails, url: e.target.value });
    };

    const postlive = async () => {
        const parsedUrl = parseUrl(urlDetails.url);
        console.log(parsedUrl);

        // If parsedUrl exists, create a new object with the updated URL
        const updatedUrlDetails = parsedUrl
            ? { ...urlDetails, url: parsedUrl }
            : urlDetails;

        try {
            console.log(updatedUrlDetails);

            await fetch('http://localhost:5000/createappointmentbooking', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify(updatedUrlDetails) // Use the updated state here
            }).then((response) => {
                if (!response.ok) {
                    alert('Wait for server being activated');
                    response.json({ msg: "unable to post" });
                }
                return response.json();
            }).then((data) => {
                alert('Appointment Posted');
            }).catch((err) => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            alert('Please login or signup first')
            window.location = "/";
        }
    }, []);

    return (
        <div className="main-container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className='addproduct'>
                <div className="container">
                    <div className="prodbutton">
                        <a href='https://calendar.google.com/'><button>Create Appointment schedule</button></a>
                    </div>
                    <div className="title">
                        <p>Paste Website embedded code below
                            <span style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue' }} onClick={openModal}>
                                View
                            </span>
                        </p>
                        <input type='text' name='url' placeholder='Paste your link here ' onChange={urlHandler}></input>
                    </div>
                    <div className="prodbutton">
                        <button onClick={postlive}>Post Schedule</button>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {hasFetchedImages && <Carousel images={carouselImages} />}
            </Modal>
        </div>
    );
};

export default Appointment;
