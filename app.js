/* 화면 표시와 동작을 담당합니다. 일반적인 내용 변경은 content.js에서 합니다. */
(() => {
  "use strict";
  const content = window.LAB_CONTENT;
  if (!content || !Array.isArray(content.axes)) return;
  const $ = (id) => document.getElementById(id);
  const asset = (path) => (window.LAB_ASSETS && window.LAB_ASSETS[path]) || path;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let motionEnabled = content.playOnLoad !== false && !reduceMotion.matches;
  let detailEnabled = motionEnabled;
  let opener = null;
  const backgroundMedia = [];
  const detailMedia = [];
  const dialog = $("media-dialog");

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function makeMedia(item, detail = false) {
    const media = document.createElement(item.type === "video" ? "video" : "img");
    media.dataset.kind = item.type;
    media.dataset.source = item.src;
    if (detail) media.style.setProperty("--media-scale", String(item.scale || 1));
    if (item.poster) media.dataset.poster = item.poster;
    media.setAttribute("aria-label", item.alt || item.label || "Research media");
    if (item.type === "video") {
      media.muted = true;
      media.defaultMuted = true;
      media.loop = true;
      media.playsInline = true;
      media.setAttribute("muted", "");
      media.setAttribute("playsinline", "");
      media.preload = "metadata";
      media.controls = detail;
      media.src = asset(item.src);
      if (item.poster) media.poster = asset(item.poster);
      media.addEventListener("error", () => {
        if (!media.parentNode) return;
        media.dataset.failed = "true";
        if (item.poster) {
          const image = element("img");
          image.src = asset(item.poster);
          image.alt = item.alt || item.label || "Research media";
          media.replaceWith(image);
        }
      }, { once: true });
    } else {
      media.alt = item.alt || item.label || "Research image";
      media.decoding = "async";
      media.src = asset(item.type === "gif" && !motionEnabled && item.poster ? item.poster : item.src);
      media.addEventListener("error", () => {
        if (!media.parentNode) return;
        const fallback = element("span", "media-fallback", "이미지를 불러올 수 없습니다");
        media.parentNode.append(fallback);
      }, { once: true });
    }
    (detail ? detailMedia : backgroundMedia).push(media);
    return media;
  }

  function setMotion(media, enabled) {
    if (!media.isConnected || media.dataset.failed === "true") return;
    if (media.dataset.kind === "video") {
      if (enabled) {
        const promise = media.play();
        if (promise && promise.catch) promise.catch(() => {}); // 자동재생이 제한되면 확대 창의 재생 버튼을 사용할 수 있습니다.
      } else media.pause();
    } else if (media.dataset.kind === "gif" && media.dataset.poster) {
      const path = enabled ? media.dataset.source : media.dataset.poster;
      if (media.dataset.current !== path) {
        media.src = asset(path);
        media.dataset.current = path;
      }
    }
  }

  function backgroundIsActive() {
    return motionEnabled && !dialog.open && !document.hidden;
  }

  function applyBackgroundMotion() {
    const active = backgroundIsActive();
    backgroundMedia.forEach((media) => setMotion(media, active && media.dataset.inView !== "false"));
    $("motion-toggle").setAttribute("aria-pressed", String(motionEnabled));
    $("motion-label").textContent = motionEnabled ? "움직임 멈추기" : "움직임 재생";
  }

  function applyDetailMotion() {
    detailMedia.forEach((media) => setMotion(media, detailEnabled && dialog.open && !document.hidden));
    $("detail-motion").textContent = detailEnabled ? "움직임 멈추기" : "움직임 재생";
    $("detail-motion").setAttribute("aria-pressed", String(detailEnabled));
  }

  function openDetail(axis, tile, button) {
    opener = button;
    detailEnabled = motionEnabled;
    $("detail-axis").textContent = axis.title + " · " + axis.scale;
    $("detail-title").textContent = tile.title;
    $("detail-description").textContent = tile.description || axis.description;
    $("detail-media").replaceChildren();
    detailMedia.length = 0;
    $("detail-media").style.setProperty("--detail-columns", String(tile.media.length));
    tile.media.forEach((item) => {
      const figure = element("figure", "detail-figure");
      figure.append(makeMedia(item, true));
      $("detail-media").append(figure);
    });
    if (!dialog.open) dialog.showModal();
    $("detail-motion").hidden = !tile.media.some((item) => item.type === "gif" || item.type === "video");
    applyBackgroundMotion();
    applyDetailMotion();
  }

  function renderAxis(axis) {
    const article = element("article", "research-axis");
    article.id = axis.id;
    article.style.setProperty("--axis-color", axis.color);
    article.style.setProperty("--axis-tint", axis.tint);
    article.setAttribute("aria-labelledby", axis.id + "-title");

    const scale = element("div", "scale-row");
    scale.append(element("span", "scale-name", axis.scale), element("span", "scale-action", axis.action));
    article.append(scale);

    const heading = element("header", "axis-heading");
    const titleRow = element("div", "axis-title-row");
    const title = element("h2", "axis-title", axis.title);
    title.id = axis.id + "-title";
    titleRow.append(element("span", "axis-number", axis.number), title);
    const keywords = element("ul", "axis-keywords");
    axis.keywords.forEach((keyword) => keywords.append(element("li", "", keyword)));
    heading.append(titleRow, element("p", "axis-subtitle", axis.subtitle));
    if (axis.description) heading.append(element("p", "axis-description", axis.description));
    heading.append(keywords);
    article.append(heading);

    const gallery = element("div", "media-gallery");
    const customRows = String(axis.rowSizes || "").trim().split(/\s+/).filter(Boolean);
    gallery.style.gridTemplateRows = customRows.length === axis.tiles.length
      ? customRows.join(" ")
      : "repeat(" + axis.tiles.length + ", minmax(0, 1fr))";
    axis.tiles.forEach((tile) => {
      const group = element("div", "tile-group");
      const button = element("button", "media-tile");
      button.type = "button";
      button.setAttribute("aria-label", tile.title + " 크게 보기");
      button.setAttribute("aria-haspopup", "dialog");
      const images = element("span", "tile-images");
      images.style.gridTemplateColumns = tile.columns || "repeat(" + tile.media.length + ", minmax(0, 1fr))";
      tile.media.forEach((item) => {
        const frame = element("span", "media-frame");
        frame.style.setProperty("--media-scale", String(item.scale || 1));
        if (item.span) frame.style.gridColumn = "span " + item.span;
        frame.append(makeMedia(item));
        images.append(frame);
      });
      const caption = element("span", "tile-caption");
      const affordance = element("span", "tile-affordance", "+");
      affordance.setAttribute("aria-hidden", "true");
      caption.append(element("span", "tile-name", tile.title), affordance);
      button.append(images, caption);
      button.addEventListener("click", () => openDetail(axis, tile, button));
      group.append(button);
      gallery.append(group);
    });
    article.append(gallery);
    return article;
  }

  $("footer-note").textContent = content.footer;
  document.title = content.title + " · Hyuk Lee";
  content.axes.forEach((axis) => $("research-board").append(renderAxis(axis)));

  $("motion-toggle").addEventListener("click", () => {
    motionEnabled = !motionEnabled;
    applyBackgroundMotion();
  });
  $("detail-motion").addEventListener("click", () => {
    detailEnabled = !detailEnabled;
    applyDetailMotion();
  });
  $("close-detail").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener("close", () => {
    detailMedia.forEach((media) => setMotion(media, false));
    $("detail-media").replaceChildren();
    detailMedia.length = 0;
    applyBackgroundMotion();
    if (opener) opener.focus({ preventScroll: true });
  });
  document.addEventListener("visibilitychange", () => {
    applyBackgroundMotion();
    if (dialog.open) applyDetailMotion();
  });
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", (event) => {
    motionEnabled = !event.matches && content.playOnLoad !== false;
    detailEnabled = motionEnabled;
    applyBackgroundMotion();
    if (dialog.open) applyDetailMotion();
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.dataset.inView = String(entry.isIntersecting);
        setMotion(entry.target, backgroundIsActive() && entry.isIntersecting);
      });
    }, { rootMargin: "100px 0px" });
    backgroundMedia.forEach((media) => observer.observe(media));
  }
  applyBackgroundMotion();
})();
