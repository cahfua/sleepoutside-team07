class Alert {
  constructor() {
    this.init();
  }

  async init() {
    const alerts = await this.loadAlerts();
    this.renderAlerts(alerts);
  }

  async loadAlerts() {
    try {
      const response = await fetch("../json/alerts.json");
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      return [];
    }
  }

  renderAlerts(alerts) {
    const mainElement = document.querySelector("main");
    if (alerts && alerts.length > 0 && mainElement) {
      const alertListSection = document.createElement("section");
      alertListSection.classList.add("alert-list");

      alerts.forEach((alertData) => {
        const alertElement = document.createElement("p");
        alertElement.textContent = alertData.message;
        alertElement.style.backgroundColor = alertData.background;
        alertElement.style.color = alertData.color;
        alertListSection.appendChild(alertElement);
      });

      mainElement.prepend(alertListSection);
    }
  }
}

export default Alert;
