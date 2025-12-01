export function openVideoModal(url) {
    const modal = document.getElementById("video-modal");
    const videoFrame = document.getElementById("video-frame");
    const embedUrl = url.replace("watch?v=", "embed/");
    videoFrame.src = embedUrl;
    modal.classList.remove("hidden");
}

export function closeVideoModal() {
    const modal = document.getElementById("video-modal");
    const videoFrame = document.getElementById("video-frame");
    videoFrame.src = "";
    modal.classList.add("hidden");
}

export function initPlayerEvents() {
    const modal = document.getElementById("video-modal");
    const modalClose = document.getElementById("modal-close");

    modalClose.addEventListener("click", closeVideoModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeVideoModal();
    });
    document.addEventListener('open-video-modal', (e) => {
        openVideoModal(e.detail.videoUrl);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeVideoModal();
        }
    });
}
