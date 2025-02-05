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
        time: '15:00',
        title: 'Réunion sur les segments critiques',
        description: '',
        image: 'Rencontre.jpg'
    },
];

// Gestion du carrousel d'activités
class ActivitiesCarousel {
    constructor(activities) {
        this.activities = activities;
        this.currentIndex = 0;
        this.track = document.getElementById('activities-track');
        this.prevButton = document.getElementById('prev-button');
        this.nextButton = document.getElementById('next-button');
        this.scrollInterval = null; // Pour le défilement automatique

        this.init();
        this.setupControls();
        this.startAutoScroll();
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
        this.track.scrollLeft = this.currentIndex * 330; // Ajuste en fonction de la largeur des cartes
    }

    createActivities() {
        this.activities.forEach(activity => {
            const card = document.createElement('div');
            card.className = 'activity-card';
            card.style.backgroundImage = `url(${activity.image})`; // Définir l'image d'arrière-plan
            const overlay = document.createElement('div');
            overlay.className = 'activity-overlay';
            overlay.innerHTML = `<h3>${activity.title}</h3><p class="time">${activity.time}</p><p>${activity.description}</p>`;
            card.appendChild(overlay);
            this.track.appendChild(card);
        });
    }

    startAutoScroll() {
        // Intervalle pour faire défiler automatiquement les cartes toutes les 4 secondes
        this.scrollInterval = setInterval(() => {
            this.next();
        }, 4000); // 4 secondes
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
