// Mise à jour de l'heure et de la date
function updateDateTime() {
    const now = new Date();
    
    // Format français
    const timeFrStr = now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });
    const dateFrStr = now.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Format anglais
    const timeEnStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    const dateEnStr = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Mise à jour côté français
    document.getElementById('current-time').textContent = timeFrStr;
    document.getElementById('current-date').textContent = dateFrStr;

    // Mise à jour côté anglais
    document.getElementById('current-time-right').textContent = timeEnStr;
    document.getElementById('current-date-right').textContent = dateEnStr;
}

// Programme des activités (exemple)
const activities = [
    {
        time: '11:00',
        title: 'Réunion de la DPI',
        description: '',
        image: 'briefing.jpg'
    },
    {
        time: '12:00',
        title: 'Pause déjeuner',
        description: '',
        image: 'Déjeuner.jpg'
    },
    {
        time: '14:00',
        title: 'Réunion sur les segments critiques',
        description: '',
        image: 'Rencontre.jpg'
    },
];

// Actualités défilantes
const news = [
    "Nouveau projet d'investissement dans le secteur agricole",
    "Signature d'un accord de partenariat avec la BAD",
    "Mission économique prévue le mois prochain",
    "Ouverture d'un nouveau bureau régional"
];

// Événements à venir
const events = [
    {
        date: '15 Février 2024',
        title: 'Forum des Investisseurs',
        description: 'Palais des Congrès'
    },
    {
        date: '22 Février 2024',
        title: 'Séminaire sur les opportunités d\'investissement',
        description: 'Hôtel Hilton'
    },
    {
        date: '1 Mars 2024',
        title: 'Mission économique',
        description: 'Délégation internationale'
    }
];

// Gestion du carrousel d'activités
class ActivitiesCarousel {
    constructor(activities) {
        this.activities = activities;
        this.currentIndex = 0;
        this.track = document.getElementById('activities-track');
        this.prevButton = document.getElementById('prev-button');
        this.nextButton = document.getElementById('next-button');

        this.init();
        this.setupControls();
    }

    setupControls() {
        this.prevButton.addEventListener('click', () => this.prev());
        this.nextButton.addEventListener('click', () => this.next());
    }

    prev() {
        this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.activities.length - 1;
        this.updateCarousel();
    }

    next() {
        this.currentIndex = (this.currentIndex < this.activities.length - 1) ? this.currentIndex + 1 : 0;
        this.updateCarousel();
    }

    updateCarousel() {
        this.track.scrollLeft = this.currentIndex * 300; // Adjust based on card width
    }

    createActivities() {
        this.activities.forEach(activity => {
            const card = document.createElement('div');
            card.className = 'activity-card';
            card.style.backgroundImage = `url(${activity.image})`; // Set the background image
            const overlay = document.createElement('div');
            overlay.className = 'activity-overlay';
            overlay.innerHTML = `<h3>${activity.title}</h3><p>${activity.time}</p><p>${activity.description}</p>`;
            card.appendChild(overlay);
            this.track.appendChild(card);
        });
    }

    init() {
        this.createActivities();
    }
}

// Affichage des événements
let currentEventIndex = 0;
const EVENT_TRANSITION_DELAY = 10000; // 10 secondes

function displayEvents() {
    const eventsContainer = document.getElementById('events-content');
    eventsContainer.innerHTML = '';
    
    events.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-item';
        if (index === currentEventIndex) {
            eventElement.classList.add('active');
        }
        
        eventElement.innerHTML = `
            <div class="event-date">${event.date}</div>
            <div class="event-title">${event.title}</div>
            <div class="event-description">${event.description}</div>
        `;
        
        eventsContainer.appendChild(eventElement);
    });
}

function rotateEvents() {
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentEventIndex) {
            item.classList.add('active', 'animate');
        } else {
            item.classList.remove('animate');
        }
    });
    
    currentEventIndex = (currentEventIndex + 1) % events.length;
}

// Fetch live weather data for Yaoundé
const fetchWeather = () => {
    const url = 'https://www.metaweather.com/api/location/search/?query=Yaoundé';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const woeid = data[0].woeid; // Get the WOEID for Yaoundé
            return fetch(`https://www.metaweather.com/api/location/${woeid}/`);
        })
        .then(response => response.json())
        .then(data => {
            const temperature = data.consolidated_weather[0].the_temp;
            const description = data.consolidated_weather[0].weather_state_name;
            document.getElementById('weather-info').innerHTML = `Temperature: ${temperature.toFixed(1)}°C, Condition: ${description}`;
        })
        .catch(error => console.error('Error fetching weather data:', error));
};

// Initialisation
function init() {
    updateDateTime();
    new ActivitiesCarousel(activities);
    displayEvents();
    fetchWeather();
    
    // Mise à jour de l'heure toutes les secondes
    setInterval(updateDateTime, 1000);
    
    // Rotation des événements toutes les 10 secondes
    setInterval(rotateEvents, EVENT_TRANSITION_DELAY);
}

// Démarrage de l'application
document.addEventListener('DOMContentLoaded', init);
