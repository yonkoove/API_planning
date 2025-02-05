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
        participants: '10 participants',
        location: 'Salle 101',
        image: 'briefing.jpg'
    },
    {
        time: '12:00',
        title: 'Pause déjeuner',
        participants: 'Tous',
        location: 'Cafétéria',
        image: 'Déjeuner.jpg'
    },
    {
        time: '15:00',
        title: 'Réunion sur les segments critiques',
        participants: '5 personnes',
        location: 'Salle de conférence',
        image: 'Rencontre.jpg'
    },
];

// Gestion du carrousel d'activités
class ActivitiesCarousel {
    constructor(activities) {
        this.activities = activities;
        this.track = document.getElementById('activities-track');
        this.currentIndex = 0;

        this.init();
        this.startAutoScroll();
    }

    createActivities() {
        this.activities.forEach(activity => {
            const card = document.createElement('div');
            card.className = 'activity-card';

            // Image
            const image = document.createElement('img');
            image.src = activity.image;
            image.alt = activity.title;
            image.className = 'activity-image';

            // Contenu texte
            const content = document.createElement('div');
            content.className = 'activity-content';
            content.innerHTML = `
                <h3>${activity.title}</h3>
                <p class="time">${activity.time}</p>
                <p class="participants">${activity.participants}</p>
                <p class="location">${activity.location}</p>
            `;

            card.appendChild(image);
            card.appendChild(content);
            this.track.appendChild(card);
        });
    }

    startAutoScroll() {
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.activities.length;
            this.track.scrollLeft = this.currentIndex * 380; // Espacement entre les cartes
        }, 4000); // Le défilement automatique se fait toutes les 4 secondes
    }

    init() {
        this.createActivities();
    }
}

// Initialisation
function init() {
    updateDateTime();
    new ActivitiesCarousel(activities);
    
    // Mise à jour de l'heure toutes les secondes
    setInterval(updateDateTime, 1000);
}

// Démarrage de l'application
document.addEventListener('DOMContentLoaded', init);
