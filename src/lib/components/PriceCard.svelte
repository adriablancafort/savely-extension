<script>
    let { price, currentPrice } = $props();
    
    const priceNum = parseFloat(price.price.replace(/[€,]/g, ''));
    const savings = Math.round(currentPrice - priceNum);
</script>

<a href={price.url} target="_blank">
    <div class="price-card">
        <img src={price.retailer_icon_url} alt="Icon" width="24" height="24" />
        <span class="title">{price.title}</span>
        <div class="price-section">
            {#if savings > 0}
                <span class="savings-badge">-{savings}€</span>
            {/if}
            <span class="price">{price.price}</span>
        </div>
    </div>
</a>

<style>
  .price-card {
    list-style: none;
    cursor: pointer;
    padding: 8px 16px 8px 12px;
    display: flex;
    align-items: center;
  }

  .title {
    margin-left: 8px;
    margin-right: 12px;
    font-size: 15px;
    color: #555555 !important;
    line-height: 1.3;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price-card:hover .title {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }

  .price {
    font-size: 16px;
  }

  .price-section {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .savings-badge {
    padding: 1px 5px;
    border-radius: 4px;
    background-color: red;
    color: white;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 3px;
  }
</style>