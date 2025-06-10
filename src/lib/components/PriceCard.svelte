<script>
  let { price } = $props();
  
  const openLink = () => window.open(price.url, '_blank');
</script>

<button class="price-card" onclick={openLink}>
  <img src={price.retailer_icon_url} alt="Icon" width="24" height="24" />
  <span class="title">{price.title}</span>
  <div class="price-container">
    <span class="savings-badge">-{price.savings}</span>
    <span class="price">{price.price}</span>
  </div>
</button>

<style>
  .price-card {
    cursor: pointer;
    padding: 8px 16px 8px 12px;
    display: flex;
    align-items: center;
    text-align: left;
  }

  .title {
    margin-left: 8px;
    margin-right: 12px;
    font-size: 14px;
    color: #444444 !important;
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
    text-underline-offset: 2px;
  }

  .price-container {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .price {
    font-size: 15px;
    font-weight: 600;
  }

  .savings-badge {
    color: white;
    background-color: red;
    padding: 1px 6px;
    border-radius: 99px;
    margin-bottom: 2px;
    font-size: 11px;
    font-weight: 600;
  }
</style>
