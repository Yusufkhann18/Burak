// Shared helpers for the existing EJS admin pages.
window.adminPages = {
  message(element, text, error = false) {
    element.textContent = text;
    element.hidden = false;
    element.classList.toggle("is-error", error);
  },
  async post(url, body) {
    const multipart = body instanceof FormData;
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: { Accept: "application/json", ...(multipart ? {} : { "Content-Type": "application/json" }) },
      body: multipart ? body : JSON.stringify(body),
    });
    const json = await response.json().catch(() => null);
    // The existing auth middleware can return an HTML login message with HTTP 200.
    if (!response.ok || !json?.data?._id) {
      throw new Error(json?.message || "Saqlanmadi. Hisobga kirganingizni tekshiring va qayta urinib ko‘ring.");
    }
    return json.data;
  },
  bindStatus(select, url, makeBody, field, feedback, onSaved) {
    let saved = select.value;
    select.addEventListener("change", async () => {
      if (select.value === "DELETE" && !window.confirm("O‘chirilgan holatiga o‘tkazilsinmi?")) {
        select.value = saved;
        return;
      }
      select.disabled = true;
      this.message(feedback, "Saqlanmoqda…");
      try {
        const result = await this.post(url, makeBody(select.value));
        saved = result[field];
        select.value = saved;
        onSaved(result);
        this.message(feedback, "O‘zgarish saqlandi.");
      } catch (error) {
        select.value = saved;
        this.message(feedback, error.message, true);
      } finally {
        select.disabled = false;
      }
    });
  },
};
