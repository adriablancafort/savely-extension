<script>
  import PriceCard from '$lib/components/PriceCOmparisonCard.svelte';
  import { drag } from '$lib/drag.js';

  let { data } = $props();

  let show = $state(true);

  export function togglePopup() {
    show = !show;
  }
  
  const logoUrl = import.meta.env.PROD ? chrome.runtime.getURL('images/icon.png') : import.meta.env.VITE_ICON_URL;
  const popupTitle = import.meta.env.PROD ? chrome.i18n.getMessage("popupTitle") : "Better prices found!";
</script>

{#if show && data.prices.length > 0}
  <div class="popup slide-in" use:drag>
    <div class="top">
      <img src={logoUrl} alt="Logo" width="24" height="24" />
      <span class="title">{popupTitle}</span>

      <button class="close-button" onclick={() => show = false} aria-label="Close popup">
        <svg width="20px" height="20px" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#808080" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <div class="prices">
      {#each data.prices as price}
        <PriceCard {price} />
      {/each}
    </div>
  </div>
{/if}

<style>
  .popup {
    position: fixed;
    bottom: 12px;
    right: 12px;
    cursor: move;
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
  }

  .prices {
    padding-top: 6px;
    margin-bottom: 10px;
    max-height: 157px;
    overflow-y: auto;
  }

  .prices::-webkit-scrollbar {
    width: 6px;
  }

  .prices::-webkit-scrollbar-track {
    background: transparent;
  }

  .prices::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 3px;
    cursor: pointer;
  }

  .prices::-webkit-scrollbar-thumb:hover {
    background-color: #9ca3af;
    cursor: pointer;
  }
</style>