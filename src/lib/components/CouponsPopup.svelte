<script>
  import { applyCoupons } from '$lib/coupons.js';

  let show = $state(true);

  export function togglePopup() {
    show = !show;
  }
  
  const logoUrl = import.meta.env.PROD ? chrome.runtime.getURL('images/icon.png') : import.meta.env.VITE_ICON_URL;
  const popupTitle = import.meta.env.PROD ? chrome.i18n.getMessage("couponsTitle") || "Coupons Available!" : "Coupons Available!";
  const applyButtonText = import.meta.env.PROD ? chrome.i18n.getMessage("applyCoupons") || "Apply Coupons" : "Apply Coupons";
</script>

{#if show}
  <div class="popup slide-in-left">
    <div class="top">
      <img src={logoUrl} alt="Logo" width="24" height="24" />
      <span class="title">{popupTitle}</span>

      <button class="close-button" onclick={() => show = false} aria-label="Close popup">
        <svg width="20px" height="20px" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#808080" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <div class="content">
      <p class="description">Save money with available coupons for your purchase!</p>
      <button class="apply-button" onclick={applyCoupons}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {applyButtonText}
      </button>
    </div>
  </div>
{/if}

<style>
  .popup {
    position: fixed;
    top: 12px;
    right: 12px;
    background-color: white;
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    z-index: 2147483647;
    width: 280px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .top {
    display: flex;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #e5e5e5;
  }

  .title {
    margin-left: 8px;
    font-weight: 600;
    font-size: 16px;
  }

  .close-button {
    cursor: pointer;
    margin-left: auto;
    background: none;
    border: none;
    padding: 0;
  }

  .content {
    padding: 16px 12px 12px;
  }

  .description {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #555;
    line-height: 1.4;
  }

  .apply-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 10px 16px;
    background-color: #ff9900;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .apply-button:hover {
    background-color: #e88900;
  }

  .apply-button:active {
    background-color: #cc7700;
  }
</style>