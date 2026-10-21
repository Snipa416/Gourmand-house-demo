/* Only display a verified, fresh count returned by the stock service. */
(function () {
  window.startStockCounter = function ({ endpoint, capacity, element, onAvailability }) {
    onAvailability(false);
    if (!endpoint) {
      element.textContent = capacity + '-cookie maximum';
      return;
    }
    let refreshing = false;
    async function refresh() {
      if (refreshing || document.hidden) return;
      refreshing = true;
      try {
        const response = await fetch(endpoint, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
        if (!response.ok) throw new Error('Stock unavailable');
        const data = await response.json();
        const age = Date.now() - Date.parse(data.updatedAt);
        if (data.capacity !== capacity || !Number.isInteger(data.remaining) ||
            data.remaining < 0 || data.remaining > capacity || !Number.isFinite(age) ||
            age < -60000 || age > 120000) throw new Error('Invalid stock response');
        element.textContent = data.remaining === 0 ? 'This drop is sold out' :
          data.remaining + ' of ' + capacity + ' cookies left';
        element.title = 'Confirmed paid orders · Updated ' + new Date(data.updatedAt).toLocaleTimeString();
        onAvailability(data.remaining > 0);
      } catch {
        element.textContent = 'Remaining stock temporarily unavailable';
        element.removeAttribute('title');
        onAvailability(false);
      } finally { refreshing = false; }
    }
    refresh();
    setInterval(refresh, 20000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  };
})();

