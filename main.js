Vue.component("product", {
    props: {
      premium: Boolean,
      required: true
    },
    template: `
      <div class="product">

      <div class="product-image">
          <img :src="image" />
      </div>

      <div class="product-info">
          <h1>{{ title }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
          
          <p style="color:green" v-if="premium">User is premium!</p>
          <p style="color:red" v-else>User is not premium!</p>

          <ul>
              <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <p>Shipping Cost: {{ shipping }}

          <div class="color-box"
              v-for="(variant, index) in variants"
              :key="variant.variantId"
              :style="{ backgroundColor: variant.variantColor }"
              @mouseover="updateProduct(index)"
          ></div>

          <button v-on:click="addToCart" 
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }"
                  >Add to cart</button>

          <div>
           <h2>Reviews</h2>
           <p v-if="!reviews.length">There are no reviews yet.</p>
           <ul>
             <li v-for="review in reviews">
              <p>{{ review.name }}</p>
              <p>Rating: {{ review.rating }}</p>
              <p>{{ review.review }}</p>
             </li>
            </ul>
          </div>

          <product-review @review-submitted="addReview"></product-review>

        </div>

      </div>
    `,
    data() {
      return {
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
          {
            variantId: 2234,
            variantColor: 'green',
            variantImage: './images/vmSocks-green-onWhite.jpg',
            variantQuantity: 10
          },
          {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: './images/vmSocks-blue-onWhite.jpg',
            variantQuantity: 0
          }
        ],
        reviews: []
      }
    },
    methods: {
      addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
      },
      updateProduct(index) {
        this.selectedVariant = index
        console.log(index)
      },
      removeFromCart() {
        this.cart -= 1
      },
      addReview (productReview) {
        this.reviews.push(productReview)
      }
    },
    computed: {
      title () {
        return this.brand + ' ' + this.product
      },
      image () {
        return this.variants[this.selectedVariant].variantImage
      },
      inStock () {
        return this.variants[this.selectedVariant].variantQuantity
      },
      shipping() {
        if (this.premium) {
          return "Free"
        } else {
          return 2.99
        }
      }
    }
  })

  Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>

      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>
    </form>
    `,
    data () {
      return {
        name: null,
        review: null,
        rating: null
      }
    },
    methods: {
      onSubmit () {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
      }
    }
  })

  var app = new Vue({
    el: '#app',
    data: {
      premium: false,
      cart: []
    },
    methods: {
      updateCart (id) {
        this.cart.push(id)
      }
    }
  })