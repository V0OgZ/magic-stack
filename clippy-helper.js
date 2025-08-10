// Clippy Helper - reusable assistant bubble for touch/mouse UIs
// Usage:
// <div id="clippy">📎</div>
// <div class="clippy-bubble" id="clippyBubble"><span id="clippyText"></span></div>
// const clippy = new ClippyHelper();

export class ClippyHelper {
  constructor(options = {}) {
    this.messages = options.messages || [
      "Salut! Touche une case pour commencer! 👆",
      "Pince pour zoomer, glisse pour te déplacer!",
      "Tu peux tout faire sans coder!",
      "Utilise SHIFT/FORK pour jouer avec le temps!",
    ];
    this.currentMessage = 0;
    this.autoTips = options.autoTips ?? true;
    this.autoTipsMs = options.autoTipsMs ?? 20000;
    this._bindDom(options);
  }

  _bindDom({ clippyId = 'clippy', bubbleId = 'clippyBubble', textId = 'clippyText' } = {}) {
    this.clippyEl = document.getElementById(clippyId);
    this.bubbleEl = document.getElementById(bubbleId);
    this.textEl = document.getElementById(textId);

    if (this.clippyEl) {
      this.clippyEl.addEventListener('click', () => this.showMessage());
    }

    // Welcome message
    setTimeout(() => this.showMessage(), 800);

    // Periodic tips
    if (this.autoTips) {
      setInterval(() => {
        if (Math.random() < 0.35) this.showRandomTip();
      }, this.autoTipsMs);
    }
  }

  showMessage(text) {
    if (!this.bubbleEl || !this.textEl) return;
    if (text) {
      this.textEl.textContent = text;
    } else {
      this.textEl.textContent = this.messages[this.currentMessage];
      this.currentMessage = (this.currentMessage + 1) % this.messages.length;
    }
    this.bubbleEl.style.display = 'block';
    clearTimeout(this._hideTimer);
    this._hideTimer = setTimeout(() => {
      this.bubbleEl.style.display = 'none';
    }, 3500);
  }

  showRandomTip() {
    const randomMsg = this.messages[Math.floor(Math.random() * this.messages.length)];
    this.showMessage(randomMsg);
  }

  celebrate() {
    if (!this.clippyEl) return;
    const prev = this.clippyEl.textContent;
    this.clippyEl.style.transform = 'scale(1.2)';
    this.clippyEl.textContent = '🎉';
    setTimeout(() => {
      this.clippyEl.style.transform = '';
      this.clippyEl.textContent = prev || '📎';
    }, 1200);
  }
}


