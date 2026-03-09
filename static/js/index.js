const buttons = Array.from(document.querySelectorAll('.tab-button'));
const panels = Array.from(document.querySelectorAll('.tab-panel'));
const burger = document.querySelector('.navbar-burger');
const navbarMenu = document.getElementById('project-navbar-menu');
const qualitativeItems = Array.from(document.querySelectorAll('.qualitative-item'));
const qualitativeTitle = document.getElementById('qualitative-title');
const qualitativeGroup = document.getElementById('qualitative-group');
const qualitativeDescription = document.getElementById('qualitative-description');
const qualitativePreview = document.getElementById('qualitative-preview');
const qualitativeGtScene = document.getElementById('qualitative-gt-scene');
const qualitativePredictionScene = document.getElementById('qualitative-prediction-scene');

if (burger && navbarMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    navbarMenu.classList.toggle('is-active');
  });
}

function activateTab(targetId) {
  buttons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.target === targetId);
  });

  panels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.id === targetId);
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    activateTab(targetId);
    history.replaceState(null, '', button.dataset.cleanUrl || `#${button.id}`);
  });
});

function activateTabFromHash() {
  if (window.location.hash) {
    const matchingButton = buttons.find((button) => `#${button.id}` === window.location.hash);
    if (matchingButton) {
      activateTab(matchingButton.dataset.target);
      if (matchingButton.dataset.cleanUrl) {
        history.replaceState(null, '', matchingButton.dataset.cleanUrl);
      }
    }
  }
}

activateTabFromHash();
window.addEventListener('hashchange', activateTabFromHash);

const accentClassNames = ['accent-ice', 'accent-sand', 'accent-rock', 'accent-moss'];

function activateQualitativeItem(item) {
  qualitativeItems.forEach((entry) => {
    entry.classList.toggle('is-active', entry === item);
  });

  if (!qualitativeTitle || !qualitativeGroup || !qualitativeDescription || !qualitativePreview) {
    return;
  }

  qualitativeTitle.textContent = item.dataset.title || '';
  qualitativeGroup.textContent = item.dataset.group || '';
  qualitativeDescription.textContent = item.dataset.description || '';

  if (qualitativeGtScene) {
    qualitativeGtScene.textContent = item.dataset.gtScene || item.dataset.title || '';
  }

  if (qualitativePredictionScene) {
    qualitativePredictionScene.textContent = item.dataset.predictionScene || item.dataset.title || '';
  }

  qualitativePreview.classList.remove(...accentClassNames);
  qualitativePreview.classList.add(`accent-${item.dataset.accent || 'ice'}`);
}

qualitativeItems.forEach((item) => {
  item.addEventListener('click', () => {
    activateQualitativeItem(item);
  });
});