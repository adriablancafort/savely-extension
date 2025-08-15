<script>
  import PriceCard from '$lib/components/PriceComparisonCard.svelte';
  import { setValue } from '$lib/storage.js';
  import { drag } from '$lib/drag.js';

  let { data, initShow } = $props();

  let show = $state(initShow);

  export function togglePopup() {
    show = !show;
    setValue('pricecomparisonshow', show);
  }
  
  const logoUrl = import.meta.env.PROD ? chrome.runtime.getURL('images/icon.png') : import.meta.env.VITE_ICON_URL;
  const popupTitle = import.meta.env.PROD ? chrome.i18n.getMessage("popupTitle") : "Better prices found!";
</script>

{#if show}
  <div class="popup slide-in-up" use:drag={{ key: 'pricecomparisonpopup' }}>
    <div class="top">
      <img src={logoUrl} alt="Logo" width="24" height="24" />
      <span class="title">{popupTitle}</span>

      <button class="close-button" onclick={togglePopup} aria-label="Close popup">
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
{:else}
  <button class="alert slide-in-right" use:drag={{ key: 'pricecomparisonalert', axis: 'y' }} onclick={togglePopup} aria-label="Open popup">
    <div class="icon">
      <img src={logoUrl} alt="Logo" width="34" height="34" />
      <span class="badge">{data.prices.length}</span>
    </div>
  </button>
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
    cursor: pointer;
  }

  .prices::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 3px;
    cursor: pointer;
  }

  .prices::-webkit-scrollbar-thumb:hover {
    background-color: #9ca3af;
  }

  .alert {
    position: fixed;
    top: 50%;
    right: -15px;
    background: white;
    border-radius: 99px 0 0 99px;
    padding: 6px 24px 6px 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    z-index: 2147483647;
    transition: right 0.2s ease;
  }

  .alert:hover {
    right: -5px;
  }

  .icon {
    position: relative;
    display: flex;
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: red;
    color: white;
    font-size: 11px;
    font-weight: 600;
    border-radius: 99px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>