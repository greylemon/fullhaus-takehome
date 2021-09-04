import { shopContentAxios } from '../../common/shop_content/shopContentAPI'
// import data from '../../../../../mock/data.json'

// TODO
export const patioAPI = {
  async fetchProducts() {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({ data })
    //   }, 2000)
    // })
    return shopContentAxios.get('get-products').then(
      (response) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(response)
          }, 2000)
        })
    )
  },
}
