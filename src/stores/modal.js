import { Modal } from 'bootstrap';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modalcontrol', () => {
  // 創造modal實體
  let productModal = null;
  const isProductModal = ref(null);
  const creatProductModal = () => {
    productModal = new Modal(isProductModal.value.isModal, {
      backdrop: 'static',
    });
  };

  // 商品資料狀態
  const newOrEdit = ref(true);
  const inComponentProduct = ref({
    imgUrl: '',
    imagesUrl: [''],
    title: '',
    category: '',
    unit: '',
    origin_price: '',
    price: '',
    aria: '',
    farm: '',
    description: '',
    content: '',
    is_enabled: 0,
    is_special: 0,
  });

  // 開啟modal
  const addProduct = (status, product) => {
    if (status === 'isNew') {
      newOrEdit.value = true;
      inComponentProduct.value = {
        imgUrl: '',
        imagesUrl: [''],
        title: '',
        category: '',
        unit: '',
        origin_price: 0,
        price: 0,
        aria: '',
        farm: '',
        description: '',
        content: '',
        is_enabled: 0,
        is_special: 0,
      };
    } else if (status === 'edit') {
      newOrEdit.value = false;
      inComponentProduct.value = JSON.parse(JSON.stringify(product));
    }
    productModal.show();
  };

  // 關閉modal
  const closeProductModal = () => {
    productModal.hide();
  };

  return {
    productModal,
    isProductModal,
    creatProductModal,
    addProduct,
    closeProductModal,
    newOrEdit,
    inComponentProduct,

  };
});
