var app = new Vue({
    el: '#app',
    data: {
      product: 'Socks',
      brand: 'Vue Mastery',
      inStock: false,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: './images/vmSocks-green-onWhite.jpg'
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: './images/vmSocks-blue-onWhite.jpg'
        }
      ],
      cart: 0
    },
    selectedVariant: 0,
    methods: {
      addToCart() {
        this.cart += 1
      },
      updateProduct(index) {
        this.selectedVariant = index
        console.log(index)
      },
      removeFromCart() {
        this.cart -= 1
      }
    },
    computed: {
      title () {
        return this.brand + ' ' + this.product
      },
      image () {
        return this.variants[this.selectedVariant].variantImage
      }
    }
  })