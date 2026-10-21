/* Only display a verified, fresh count returned by the stock service. */
(function () {
  window.startStockCounter = function ({ endpoint, capacity, reserved = 0, element, onAvailability }) {
    onAvailability(false, false);
    const total = Math.max(0, capacity - reserved);
    if (!endpoint) {
      element.textContent = total + '-cookie maximum';
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
        const left = Math.max(0, data.remaining - reserved);
        element.textContent = left === 0 ? 'This drop is sold out' :
          left + ' of ' + total + ' cookies left';
        element.title = 'Confirmed paid orders · Updated ' + new Date(data.updatedAt).toLocaleTimeString();
        onAvailability(left > 0, left === 0);
      } catch {
        element.textContent = 'Remaining stock temporarily unavailable';
        element.removeAttribute('title');
        onAvailability(false, false);
      } finally { refreshing = false; }
    }
    refresh();
    setInterval(refresh, 20000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  };
})();
