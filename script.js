const PageModel = {
  async getPage() {
      const response = await fetch('data.json');
      const data = await response.json();
      return data.page;
  }
};

const PageView = {
  titleEl: document.getElementById('page-title'),
  descriptionEl: document.getElementById('page-description'),
  videoEl: document.getElementById('page-video'),
  levelsContainer: document.getElementById('levels-container'),

  render(page) {
    this.titleEl.textContent = page.title;
    this.descriptionEl.textContent = page.description;
    this.videoEl.src = page.video;

    page.levels.forEach((level, index) => {
      const btn = document.createElement('button');
      btn.classList.add('level-btn');
      btn.textContent = level.name;
      btn.setAttribute('aria-label', `בחר ${level.name}`);
      btn.addEventListener('click', () => this.handleLevelClick(level));
      this.levelsContainer.appendChild(btn);
    });
  },

  handleLevelClick(level) {
    console.log(`בחרת ב-${level.name}`);
  }
};

const PageController = {
  async init() {
    const page = await PageModel.getPage();
    PageView.render(page);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PageController.init();
});