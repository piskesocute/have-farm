<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { useCartApi } from '../composables/useCartApi';

const { cartData, getCartData, updateCartData } = useCartApi();

// const cartData = ref({
//   success: true,
//   data: {
//     carts: [
//       {
//         coupon: {
//           code: '',
//           due_date: 0,
//           id: '',
//           is_enabled: 0,
//           percent: 0,
//           title: '',
//         },
//         final_total: 0,
//         id: '',
//         product: {
//           category: '',
//           content: '',
//           description: '',
//           id: '',
//           imageUrl: '',
//           imagesUrl: [''],
//           is_enabled: 1,
//           num: 1,
//           origin_price: 0,
//           price: 0,
//           title: '',
//           unit: '',
//         },
//         product_id: '',
//         qty: 1,
//         total: 3600,
//       },
//     ],
//     total: 3600,
//     final_total: 3600,
//   },
//   messages: [],
// });

// const getCartData = async () => {
//   axios
//     .get(
//       `${import.meta.env.VITE_APP_URL}api/${
//         import.meta.env.VITE_APP_PATH
//       }/cart`,
//     )
//     .then((res) => {
//       cartData.value = res.data.data;
//     });
// };

const deleteCartData = async (id) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_APP_URL}api/${
        import.meta.env.VITE_APP_PATH
      }/cart/${id}`,
    );
    await getCartData();
  } catch (error) {
    console.log(error);
  }
};

const updateItemQty = (id, qty, count) => {
  if (qty === 1 && count === -1) return;
  const theNewQty = qty + count;
  updateCartData(id, theNewQty);
};

const isClean = ref(true);

const isCartClean = watch(cartData, (nexIdx) => {
  if (nexIdx.carts.length > 0) {
    isClean.value = false;
  } else {
    isClean.value = true;
  }
});

onMounted(async () => {
  await getCartData();
});
</script>
<template>
  <BreadCrumb />

  <div class="step-box d-flex justify-content-center align-items-center my-32">
    <div class="step active d-flex justify-content-center align-items-center">
      <i class="bi bi-cart-check fs-24 cart-icon"></i>
    </div>
    <div class="step-line mx-3"></div>
    <div class="step d-flex justify-content-center align-items-center">
      <i class="bi bi-card-list fs-24 cart-icon"></i>
    </div>
    <div class="step-line mx-3"></div>
    <div class="step d-flex justify-content-center align-items-center">
      <i class="bi bi-bag-check-fill fs-24 cart-icon"></i>
    </div>
  </div>

  <div class="container-md mb-16">
    <hr />
    <div
      class="bg-maingray text-center py-48 mb-32 rounded rounded-16"
      v-if="isClean"
    >
      <div class="d-flex justify-content-center align-items-center">
        <img src="../assets/images/cart-clean.png" alt="" class="img-fluid" />
      </div>
      <h4 class="fw-bold mt-32">??????! ?????????????????????...</h4>
      <p class="fw-bold mt-16">???????????????????????????!</p>

      <router-link
        :to="{ name: '????????????' }"
        class="btn fs-20 lh-sm fw-bold py-16 px-48 rounded-16 goshop-btn"
        >??????????????????</router-link
      >
    </div>
    <div v-else>
      <ul class="list-unstyled row justify-content-center align-items-center">
        <li
          v-for="(item, index) in cartData.carts"
          :key="index + 13215"
          class="row justify-content-center align-items-center"
        >
          <div class="col-2 col-md-1 d-flex justify-content-center">
            <a
              class="cart-delete-btn d-block text-center w-100"
              href="#"
              @click.prevent="deleteCartData(item.id)"
            >
              <i class="bi bi-trash fs-28"></i>
            </a>
          </div>
          <div class="col-4 col-md-2">
            <img :src="item.product.imgUrl" class="cart-img my-16" alt="" />
          </div>
          <div class="col-6 col-md-4">
            <p class="m-0 cart-item-title fs-20">
              {{ item.product.title }}
            </p>

            <p class="m-0 text-secondary">
              {{ item.product.content }}
            </p>
            <p class="m-0 fs-18 text-end d-md-none">
              ?????? ${{ item.product.price }}
            </p>
          </div>
          <div class="col-2 d-md-none"></div>
          <div class="col-6 col-md-3 my-3">
            <div
              class="
                d-flex
                justify-content-center
                align-items-center
                border
                rounded-1
              "
            >
              <button
                type="button"
                class="
                  btn btn-outline-mainred
                  border-0
                  rounded-0 rounded-start-4
                "
                @click="updateItemQty(item.id, item.qty, -1)"
                :disabled="item.qty === 1"
                :class="{ 'btn-disable': item.qty === 1 }"
              >
                <i class="bi bi-dash-lg fs-20"></i>
              </button>
              <input
                type="number"
                min="1"
                readonly
                class="
                  form-control
                  cart-input
                  border-top-0 border-bottom-0
                  rounded-0
                  text-center
                  fs-20
                  lh-base
                "
                v-model="item.qty"
              />
              <button
                type="button"
                class="btn btn-outline-mainred border-0 rounded-0 rounded-end-4"
                @click="updateItemQty(item.id, item.qty, 1)"
                :disabled="item.qty === item.product.qty"
                :class="{ 'btn-disable': item.qty === item.product.qty }"
              >
                <i class="bi bi-plus-lg fs-20"></i>
              </button>
            </div>
          </div>
          <div class="col-4 col-md-2">
            <div class="w-100">
              <div
                class="
                  d-none d-md-flex
                  justify-content-between
                  align-items-center
                "
              >
                <p class="mb-1 fs-18">?????? $</p>
                <p class="mb-1 fs-18">{{ item.product.price }}</p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <p class="m-0 fs-18 text-mainorg fw-bold">?????? $</p>
                <p class="m-0 fs-18 text-mainorg fw-bold">{{ item.total }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <hr />
      <div class="w-100 d-flex justify-content-end align-items-center">
        <router-link
          class="btn fs-20 lh-sm fw-bold py-12 px-48 rounded-8 goshop-btn"
          :to="{ name: '??????' }"
          >????????????</router-link
        >
      </div>
    </div>
  </div>
  <div class="container-md mt-64">
    <hr />
    <h5 class="mb-32">????????????</h5>
    <div class="bg-maingray p-16 rounded rounded-16 mb-32">
      <ol class="mb-16">
        <p>
          ???????????? ???????????????????????????????????????????????????????????????????????????????????????
        </p>
        <li>
          <p>
            ??????????????????Yahoo??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
        </li>
        <li>
          <p>
            ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
        </li>
        <li>
          <p>
            ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
        </li>
        <li>
          <p>
            ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            / ??????????????????
            ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
        </li>
        <li>
          <p>
            ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
        </li>
      </ol>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  // outline: 1px solid;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}

.step {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fde47f;
  .cart-icon {
    color: #460303;
  }
  &.active {
    // outline: 2px solid #fde47f;
    animation: ripple 1s ease-out infinite;
    background-color: #460303;
    .cart-icon {
      color: #fde47f;
    }
  }
}

.btn-disable {
  background-color: #ced4da;
}

.goshop-btn {
  background-color: #460303;
  color: #fde47f;
  transition: 0.2s;
  &:hover {
    background-color: #fde47f;
    color: #460303;
    transition: 0.2s;
  }
}

.cart-img {
  width: 160px;
  height: 120px;
  object-fit: cover;
  @include xl {
    width: 100%;
    height: 100px;
  }
  @include lg {
    width: 100%;
    height: 80px;
  }
  @include md {
    width: 100%;
    height: 120px;
  }
}
.cart-input:focus {
  background-color: none;
  border-color: #ced4da;
  outline: 0;
  box-shadow: 0 0 0 0 rgba(253, 228, 127, 0.877);
}
.step-line {
  width: 48px;
  outline: 0.1px solid #460303;
}

.cart-delete-btn {
  color: #a5a5a5;
  transition: 0.3s;
  &:hover {
    color: #460303;
    transition: 0.3s;
  }
}
.cart-item-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 #460303;
  }
  100% {
    box-shadow: 0 0 0 0.5rem #fde47f00;
  }
}
</style>
